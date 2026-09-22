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
  "Campanii de conținut bridal | The Bridal Concept";
const description =
  "Transformăm colecțiile bridal în campanii complete: fotografie editorială, marketing video, social media și materiale editoriale pentru salon.";
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
