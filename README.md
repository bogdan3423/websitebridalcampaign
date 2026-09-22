# impactomedia.ro — Bridal Growth Campaigns

Landing page editorial în română. Next.js App Router, TypeScript, Tailwind CSS 4, componente React și imagini locale WebP. Export static pentru găzduire simplă. Nu folosește trackere sau cookie-uri de marketing.

## Pornire

```bash
npm install
npm run dev
```

## Verificare

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test:e2e
```

Build-ul public este în `out/`. Pentru testele end-to-end porniți mai întâi serverul (`npm run dev` pe portul 3000); acestea nu trimit mesaje reale.

## Ce modifici

- **Fotografii:** `data/gallery.ts` (inclusiv hero și selecția feed). Fișierele sunt în `public/images/`. Înlocuiți fotografiile provizorii înainte de a prezenta galeria ca portofoliu real.
- **Nume, logo, WhatsApp, telefon, Instagram, email:** `data/site.ts`. Pentru logo, setați `logo: '/images/logo.svg'`; componenta este `components/Brand.tsx`. Emailul și Instagramul lipsesc intenționat până la furnizarea adreselor reale.
- **Servicii și parcursul campaniei:** componentele din `components/`, ordonate în `app/page.tsx`.
- **Culori, fonturi, spațiere:** `app/globals.css`, respectiv `app/layout.tsx`.
- **SEO:** `app/layout.tsx`; datele structurate se află în `app/page.tsx`. Modificați `site.url` când conectați domeniul final. Numele impactomedia.ro nu înseamnă că acest domeniu a fost conectat.

## Formular

Formularul validează datele și le trimite prin AJAX către FormSubmit, care livrează solicitările la **contact@impactomedia.ro**. Integrarea include un câmp honeypot anti-spam, stări clare de trimitere/succes/eroare și păstrează WhatsApp ca metodă alternativă de contact. Formularul nu stochează local datele introduse.

La prima folosire, FormSubmit trimite un email de activare la adresa destinatară. Linkul din acel email trebuie confirmat o singură dată înainte ca mesajele să fie livrate normal.

## Imagini

Fotografii de referință din Pexels, licențiate conform https://www.pexels.com/license/. Sursele și fotografii sunt documentați în `data/image-sources.json`. Nu reprezintă clienți sau campanii ale agenției. Scriptul `scripts/optimize-images.mjs` generează automat cinci variante WebP pentru fiecare fotografie înainte de dev/build. Imaginile sunt comprimate WebP înainte de build, utilizate prin `next/image`, cu dimensiuni rezervate și încărcare lazy sub primul ecran. Exportul static nu utilizează optimizare la cerere pe server.

## Publicare

`.openai/hosting.json` leagă proiectul de site-ul privat și declară exportul `out/`. Pagina poate fi găzduită și pe orice server static. Datele din formular nu necesită o bază de date.
# websitebridalcampaign
