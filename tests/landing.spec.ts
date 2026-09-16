import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("navigarea reapare la scroll în sus și rămâne accesibilă", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const header = page.locator("header.navbar");
  await expect(header).toHaveAttribute("data-surface", "hero");
  const scroll = async (y: number) => {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  };
  await scroll(1200);
  await expect(header).toHaveAttribute("data-hidden", "true");
  await scroll(1100);
  await expect(header).toHaveAttribute("data-hidden", "false");
  await expect(header).toHaveAttribute("data-surface", "paper");
  await expect(header).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await page.screenshot({ path: "/tmp/bridal-sticky-header.png" });
  await scroll(1103);
  await expect(header).toHaveAttribute("data-hidden", "false");
  await scroll(1250);
  await expect(header).toHaveAttribute("data-hidden", "true");
  await header.locator(".nav-cta").focus();
  await expect(header).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await header.locator(".nav-cta").evaluate((link: HTMLElement) => link.blur());
  const heroEnd = await page.locator(".hero-images").evaluate((hero) => hero.getBoundingClientRect().bottom + window.scrollY);
  await scroll(heroEnd - 20);
  await expect(header).toHaveAttribute("data-surface", "hero");
  await expect(header).toHaveCSS("position", "absolute");
  expect(await header.evaluate((nav) => nav.getBoundingClientRect().bottom)).toBeLessThan(0);
  await scroll(200);
  await expect(header).toHaveAttribute("data-surface", "hero");
  expect(await header.evaluate((nav) => nav.getBoundingClientRect().bottom)).toBeLessThan(0);
  await scroll(0);
  await expect(header).toHaveAttribute("data-hidden", "false");
  await expect(header).toHaveAttribute("data-surface", "hero");
});
test("meniul mobil funcționează din bara reapărută", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const header = page.locator("header.navbar");
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-hidden", "true");
  await page.evaluate(() => window.scrollTo({ top: 1100, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-hidden", "false");
  await expect(header).toHaveAttribute("data-surface", "paper");
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await expect(page.getByRole("dialog", { name: "Meniu de navigare" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Meniu de navigare" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Deschide meniul" })).toBeFocused();
});
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
    await page.locator(".portfolio-intro").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/bridal-${width}-portfolio.png` });
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
  await expect(page.locator(".lightbox-photo img")).toBeVisible();
  await page.screenshot({ path: "/tmp/bridal-gallery-desktop.png" });
  await page.getByRole("button", { name: "Mărește fotografia", exact: true }).click();
  await expect(page.locator(".lightbox-stage")).toHaveClass(/is-zoomed/);
  const stage = await page.locator(".lightbox-stage").boundingBox();
  await page.mouse.move(stage!.x + stage!.width / 2, stage!.y + stage!.height / 2);
  await page.mouse.down();
  await page.mouse.move(stage!.x + stage!.width / 2, stage!.y + stage!.height - 1, { steps: 8 });
  await page.mouse.up();
  const contained = await page.locator(".lightbox-stage").evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element.querySelector(".lightbox-photo")!).transform);
    return Math.abs(matrix.m42) <= element.clientHeight / 2;
  });
  expect(contained).toBe(true);
  await page.getByRole("button", { name: "Vezi fotografia 5", exact: true }).click();
  await expect(page.locator(".lightbox-toolbar")).toContainText("05 / 06");
  await expect(page.locator(".lightbox-stage")).not.toHaveClass(/is-zoomed/);
  const galleryAudit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(galleryAudit.violations.map((v) => v.id)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByText("Compară toate detaliile").click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("table")).toContainText("12–16 pagini");
});
test("galeria mobilă: pinch, swipe și închidere", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Deschide fotografia 1 din galerie" }).click();
  await page.locator(".portfolio-lightbox img").evaluateAll((images) => Promise.all(images.map((image) => (image as HTMLImageElement).decode())));
  await page.screenshot({ path: "/tmp/bridal-gallery-mobile.png" });
  const session = await page.context().newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 120, y: 320, id: 1 }, { x: 230, y: 320, id: 2 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 60, y: 320, id: 1 }, { x: 300, y: 320, id: 2 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(page.locator(".lightbox-stage")).toHaveClass(/is-zoomed/);
  await page.getByRole("button", { name: "Restabilește fotografia", exact: true }).click();
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 300, y: 320, id: 1 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 90, y: 320, id: 1 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(page.locator(".lightbox-toolbar")).toContainText("02 / 06");
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 300, y: 320, id: 1 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 90, y: 320, id: 1 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
  await expect(page.locator(".lightbox-toolbar")).toContainText("02 / 06");
  await page.getByRole("button", { name: "Închide galeria", exact: true }).click();
  await expect(page.getByRole("button", { name: "Deschide fotografia 1 din galerie" })).toBeFocused();
});
