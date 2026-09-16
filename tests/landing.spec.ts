import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("paralaxa rămâne discretă și respectă mișcarea redusă", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 300);
  });
  const shifts = () => page.locator(".hero-photo").evaluateAll((photos) =>
    photos.map((photo) => new DOMMatrix(getComputedStyle(photo).transform).m41),
  );
  await expect.poll(async () => (await shifts())[0]).toBeLessThan(-25);
  const [left, right] = await shifts();
  expect(right).toBeGreaterThan(25);
  expect(Math.abs(left)).toBeLessThanOrEqual(96);
  expect(right).toBeLessThanOrEqual(96);
  const vertical = await page.locator(".hero-photo").evaluateAll((photos) =>
    photos.map((photo) => new DOMMatrix(getComputedStyle(photo).transform).m42),
  );
  expect(vertical).toEqual([0, 0]);
  for (const selector of [".hero-visual", ".hero-detail"]) {
    const covered = await page.locator(selector).evaluate((frame) => {
      const outer = frame.getBoundingClientRect();
      const inner = frame.querySelector(".hero-photo")!.getBoundingClientRect();
      return inner.left <= outer.left && inner.right >= outer.right
        && inner.top <= outer.top && inner.bottom >= outer.bottom;
    });
    expect(covered).toBe(true);
  }
  await page.screenshot({ path: "/tmp/bridal-parallax.png" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-photo").first()).toHaveCSS("transform", "none");
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(page.locator(".hero-photo").last()).toHaveCSS("transform", "none");
});
for (const width of [375, 430, 768, 1024, 1440]) {
  test(`pagina responsive la ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await expect(page.locator(".package")).toHaveCount(3);
    for (const price of ["3.300", "4.000", "5.500"])
      await expect(
        page.locator(".package-price").filter({ hasText: price }),
      ).toBeVisible();
    await page.locator("#pachete").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/bridal-${width}-pricing.png` });
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/bridal-${width}-contact.png` });
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/bridal-${width}-footer.png` });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `/tmp/bridal-${width}-hero.png` });
    expect(errors).toEqual([]);
  });
}
test("meniul mobil și alegerea pachetului", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await expect(
    page.getByRole("dialog", { name: "Meniu de navigare" }),
  ).toBeVisible();
  await expect(page.locator(".mobile-menu").getByRole("link", { name: "Contact", exact: true })).toBeVisible();
  await page.screenshot({ path: "/tmp/bridal-mobile-menu.png" });
  await page
    .locator(".mobile-menu")
    .getByRole("link", { name: "Pachete" })
    .click();
  await expect(page.locator(".mobile-menu")).not.toBeVisible();
  await page.getByRole("link", { name: "Alege Complet" }).click();
  await expect(page.getByLabel("Pachet de interes")).toHaveValue("complet");
  await page.screenshot({ path: "/tmp/bridal-contact-mobile.png" });
});
test("formularul validează și pregătește mesajul corect", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pregătește mesajul" }).click();
  await expect(page.locator(".form-status")).toHaveCount(0);
  await page.getByLabel("Nume", { exact: false }).fill("Test local");
  await expect(page.getByLabel("Nume", { exact: false })).toBeFocused();
  await page.locator(".contact-content").screenshot({ path: "/tmp/bridal-contact-focus.png" });
  await page.getByLabel("Salon", { exact: false }).fill("Salon de test");
  await page.getByLabel("Telefon", { exact: false }).fill("numar invalid");
  expect(
    await page
      .getByLabel("Telefon", { exact: false })
      .evaluate((input: HTMLInputElement) => input.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Telefon", { exact: false }).fill("0748030566");
  await page.getByLabel("Pachet de interes").selectOption("extins");
  await page
    .getByLabel("Mesaj (opțional)", { exact: true })
    .fill("Verificare locală, nu trimite.");
  await page.getByRole("button", { name: "Pregătește mesajul" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Cererea ta este pregătită.",
  );
  const href = await page
    .getByRole("link", { name: "Continuă în WhatsApp" })
    .getAttribute("href");
  expect(href).toContain("https://wa.me/40748030566?text=");
  expect(decodeURIComponent(href!)).toContain("Pachet: Extins");
  expect(decodeURIComponent(href!)).toContain("Salon de test");
});
test("accesibilitate și metadate", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  await expect(page).toHaveTitle(/Promovare pentru saloane/);
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/\b(Reels|Stories|Hero|BTS|CTA|content|marketing|bridal|feed|lookbook)\b/i);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});

test("exemplele se navighează cu tastatura și păstrează contextul", async ({ page }) => {
  await page.goto("/");
  const posts = page.getByRole("tab", { name: "Postări", exact: true });
  await posts.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Catalog", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Exemplu de catalog · 1 / 3");
  await page.getByRole("button", { name: "Paginile următoare" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Exemplu de catalog · 2 / 3");
  await page.screenshot({ path: "/tmp/bridal-catalog.png" });
  await page.getByRole("tab", { name: "Plan de filmare" }).click();
  await page.getByRole("button", { name: /05–10 sec/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Textura și finisajele");
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations.map((v) => v.id)).toEqual([]);
});
test("galeria și comparația completă", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Deschide fotografia 1 din galerie" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Galerie foto din portofoliu" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-toolbar")).toContainText("02 / 06");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByText("Compară toate detaliile").click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("table")).toContainText("12–16 pagini");
});
