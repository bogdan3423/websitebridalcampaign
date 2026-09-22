import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
const title = "Marketing pentru saloane de rochii de mireasă | The Bridal Concept";
const description =
  "Campanii de content pentru saloane de rochii de mireasă: fotografie editorială, Reels, social media și bridal lookbook. Cluj-Napoca și proiecte în România.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  applicationName: site.name,
  category: "marketing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: "/",
    locale: "ro_RO",
    type: "website",
    siteName: site.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "The Bridal Concept — content și marketing pentru saloane bridal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
