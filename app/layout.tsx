import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";
const serif = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});
const sans = Manrope({
  variable: "--font-functional",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const title =
  "Promovare pentru saloane de rochii de mireasă | Cluj-Napoca";
const description =
  "Promovare completă pentru saloane de rochii de mireasă: videoclipuri scurte cu actor, fotografii profesionale cu model, catalog tipărit și postări pregătite pentru publicare.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "ro_RO",
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary", title, description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        {children}
      </body>
    </html>
  );
}
