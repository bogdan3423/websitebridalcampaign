import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
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
    await page.locator("#galerie").scrollIntoViewIfNeeded();
    await expect(page.locator(".gallery-image img").first()).toHaveJSProperty(
      "complete",
      true,
    );
    await page.locator("#pachete").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/bridal-${width}-pricing.png` });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `/tmp/bridal-${width}-hero.png` });
    expect(errors).toEqual([]);
  });
}
test("galerie: deschidere, săgeți și Escape", async ({ page }) => {
  await page.goto("/");
  await page.locator(".gallery-image").first().click();
  await expect(page.locator(".lightbox")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-top")).toContainText("02 / 08");
  await page.getByRole("button", { name: "Fotografia precedentă" }).click();
  await expect(page.locator(".lightbox-top")).toContainText("01 / 08");
  await page.keyboard.press("Escape");
  await expect(page.locator(".lightbox")).not.toBeVisible();
  await expect(page.locator(".gallery-image").first()).toBeFocused();
});
test("meniul mobil și alegerea pachetului", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await expect(
    page.getByRole("dialog", { name: "Meniu de navigare" }),
  ).toBeVisible();
  await page
    .locator(".mobile-menu")
    .getByRole("link", { name: "Pachete" })
    .click();
  await expect(page.locator(".mobile-menu")).not.toBeVisible();
  await page.getByRole("link", { name: "Aleg Plus" }).click();
  await expect(page.getByLabel("Pachet de interes")).toHaveValue("plus");
});
test("formularul validează și pregătește mesajul corect", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.locator(".form-status")).toHaveCount(0);
  await page.getByLabel("Nume", { exact: false }).fill("Test local");
  await page.getByLabel("Salon", { exact: false }).fill("Salon de test");
  await page.getByLabel("Telefon", { exact: false }).fill("numar invalid");
  expect(
    await page
      .getByLabel("Telefon", { exact: false })
      .evaluate((input: HTMLInputElement) => input.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Telefon", { exact: false }).fill("0748030566");
  await page.getByLabel("Pachet de interes").selectOption("premium");
  await page
    .getByLabel("Mesaj", { exact: true })
    .fill("Verificare locală, nu trimite.");
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Cererea ta este pregătită.",
  );
  const href = await page
    .getByRole("link", { name: "Continuă în WhatsApp" })
    .getAttribute("href");
  expect(href).toContain("https://wa.me/40748030566?text=");
  expect(decodeURIComponent(href!)).toContain("Pachet: premium");
  expect(decodeURIComponent(href!)).toContain("Salon de test");
});
test("accesibilitate și metadate", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  await expect(page).toHaveTitle(/Marketing pentru saloane/);
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
