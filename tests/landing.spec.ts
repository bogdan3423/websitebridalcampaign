import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("mesajul și parcursul comercial sunt clare", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-detail img")).toHaveAttribute("src", /IRI_5172/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Transformăm colecția ta bridal");
  await expect(page.getByRole("link", { name: "Discutăm 10 minute", exact: true }).first()).toHaveAttribute("href", "#contact");
  await expect(page.getByRole("link", { name: "Vezi cum lucrăm" })).toHaveAttribute("href", "#proces");
  await expect(page.getByRole("heading", { name: /Sezonul nunților/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Tu alegi rochiile. Noi construim imaginea./ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Nu facem doar Reels./ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Conținutul nu rămâne/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Iar imaginile nu dispar/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Când rochia devine imagine." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fiecare salon are o colecție diferită." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Tu alegi rochiile. Noi construim campania./ })).toBeVisible();

  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/3[.]300|4[.]000|5[.]500|Alege pachetul|Compară toate detaliile/i);
  expect(body).not.toMatch(/Standard —|Plus —|Premium —|10 reels|15 reels|20 reels|30 zile/i);
  expect(body).not.toMatch(/garantăm programări|vei vinde mai multe|aducem [0-9]+ mirese/i);
});

test("navigarea indică numai secțiuni existente", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator("header a[href^='#'], footer a[href^='#']").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  for (const href of hrefs) {
    if (!href || href === "#") continue;
    await expect(page.locator(href)).toHaveCount(1);
  }
  await expect(page.locator("header.navbar")).not.toContainText("Pachete");
  await expect(page.locator("footer")).not.toContainText("Pachete");
});

test("navigarea reapare la scroll în sus", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header.navbar");
  await expect(header).toHaveAttribute("data-surface", "hero");
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-hidden", "true");
  await page.evaluate(() => window.scrollTo({ top: 1300, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-hidden", "false");
  await expect(header).toHaveAttribute("data-surface", "paper");
});

for (const width of [375, 390, 430, 768, 1024, 1440]) {
  test(`pagina rămâne fluidă la ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#video")).toBeVisible();
    await expect(page.locator("#proces")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await page.screenshot({ path: `/tmp/bridal-campaign-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("meniul mobil și legăturile principale funcționează", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  const menu = page.getByRole("dialog", { name: "Meniu de navigare" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Servicii" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Video" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Galerie" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Cum lucrăm" })).toBeVisible();
  await menu.getByRole("link", { name: "Video" }).click();
  await expect(menu).not.toBeVisible();
  await expect(page.locator("#video")).toBeInViewport();
});

test("storytelling-ul păstrează scroll-ul nativ și reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("#photo").scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 700);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("#photo .story-step").first()).toHaveCSS("transition-duration", "0s");
});

test("storytelling-ul are animații discrete pe mobil", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const photo = page.locator("#photo");
  await expect(photo).toHaveAttribute("data-story-ready", "true");
  const steps = photo.locator(".story-step");
  await steps.nth(1).evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(steps.nth(1)).toHaveAttribute("data-active", "true");
  await expect(steps.nth(1)).toHaveCSS("opacity", "1");
  await expect(steps.nth(1)).not.toHaveCSS("transition-duration", "0s");

  const feedOpacity = await page.locator("#social-media .social-feed-post").evaluateAll(
    (posts) => posts.map((post) => getComputedStyle(post).opacity),
  );
  expect(feedOpacity).toEqual(Array(9).fill("1"));
});

test("hero-ul mobil alternează fotografiile folosite pe desktop", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const images = page.locator(".hero-visual img");
  await expect(images).toHaveCount(2);
  await expect(images.nth(0)).toHaveAttribute("src", /IRI_4834/);
  await expect(images.nth(1)).toHaveAttribute("src", /IRI_5172/);
  await expect(images.nth(0)).toHaveCSS("filter", /grayscale\(1\)/);
  await expect(page.locator(".hero-primary-darklayer")).toHaveCSS("background-color", "rgba(15, 12, 11, 0.48)");
  await expect(images.nth(0)).toHaveCSS("animation-name", "hero-mobile-primary");
  await expect(images.nth(1)).toHaveCSS("animation-name", "hero-mobile-secondary");
  const titleSize = await page.locator("#hero-title").evaluate((title) =>
    Number.parseFloat(getComputedStyle(title).fontSize),
  );
  expect(titleSize).toBeLessThan(47);
});

test("secțiunile mari de servicii intră integral din stânga", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const chapters = page.locator(".story-chapter");
  await expect(chapters).toHaveCount(4);
  for (const chapter of await chapters.all()) {
    await expect(chapter).toHaveAttribute("data-section-reveal-ready", "true");
  }

  const photo = page.locator("#photo");
  await expect(photo).toHaveAttribute("data-section-visible", "false");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("data-section-visible", "true");
  await expect(photo.locator(":scope > .section-shell")).toHaveCSS("opacity", "1");
});

test("formularul scurt pregătește mesajul pentru WhatsApp", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Nume", { exact: false }).fill("Test local");
  await page.getByRole("textbox", { name: "Salon *", exact: true }).fill("Salon de test");
  await page.getByLabel("Telefon", { exact: false }).fill("0748030566");
  await page.getByLabel("Instagram / website").fill("@salondetest");
  await page.getByLabel("Mesaj (opțional)").fill("Vrem să promovăm colecția nouă.");
  await page.getByRole("button", { name: "Vreau să discutăm" }).click();
  await expect(page.getByRole("status")).toContainText("Mesajul este pregătit.");
  const href = await page.getByRole("link", { name: "Continuă în WhatsApp" }).getAttribute("href");
  expect(href).toContain("https://wa.me/40748030566?text=");
  expect(decodeURIComponent(href!)).toContain("Salon de test");
  expect(decodeURIComponent(href!)).not.toContain("Pachet:");
});

test("galeria și exemplele interactive rămân funcționale", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Deschide fotografia 1 din galerie" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Galerie foto din portofoliu" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-toolbar")).toContainText("02 / 06");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();

  await page.getByRole("tab", { name: "Catalog", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Exemplu de catalog");
});

test("pagina respectă regulile principale de accesibilitate", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  await expect(page).toHaveTitle(/Campanii de conținut/);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => node.target) }))).toEqual([]);
});
