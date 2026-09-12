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
- **Prețuri și livrabile:** `data/packages.ts`. Pachetele, sumarul final, numărul de Reels și variantele revistei reutilizează aceleași date.
- **Culori, fonturi, spațiere:** `app/globals.css`, respectiv `app/layout.tsx`.
- **SEO:** `app/layout.tsx`; datele structurate se află în `app/page.tsx`. Modificați `site.url` când conectați domeniul final. Numele impactomedia.ro nu înseamnă că acest domeniu a fost conectat.

## Formular

Formularul validează datele și pregătește un mesaj către **+40 748 030 566**. Vizitatorul apasă apoi **Continuă în WhatsApp** și trimite mesajul în aplicație. Nu afișăm o confirmare falsă de trimitere și nu stocăm local datele introduse.

Pentru trimitere directă, configurați `site.formEndpoint` cu un endpoint HTTPS care acceptă JSON prin POST și răspunde cu un cod 2xx numai după acceptarea cererii. Endpoint-ul trebuie să implementeze validare pe server, protecție anti-spam și livrarea mesajului. Exportul static nu include un serviciu de email.

## Imagini

Fotografii de referință din Pexels, licențiate conform https://www.pexels.com/license/. Sursele și fotografii sunt documentați în `data/image-sources.json`. Nu reprezintă clienți sau campanii ale agenției. Imaginile sunt comprimate WebP înainte de build, utilizate prin `next/image`, cu dimensiuni rezervate și încărcare lazy sub primul ecran. Exportul static nu utilizează optimizare la cerere pe server.

## Publicare

`.openai/hosting.json` leagă proiectul de site-ul privat și declară exportul `out/`. Pagina poate fi găzduită și pe orice server static. Datele din formular nu necesită o bază de date.
