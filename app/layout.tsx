import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

import { localBusinessJsonLd, siteDescription, siteTitle, getSiteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteTitle,
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
  applicationName: site.publicName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.name,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/logo-mark.png", width: 498, height: 386, alt: "WoWash" }],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/logo-mark.png", type: "image/png" }],
    apple: [{ url: "/logo-mark.png" }],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f7fb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${plusJakarta.variable} ${outfit.variable}`}>
      <body className={`${plusJakarta.className} min-h-full antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
