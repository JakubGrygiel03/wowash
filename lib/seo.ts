import type { Metadata } from "next";

import { googleReviews, reviewsSummary } from "@/lib/reviews";
import { site } from "@/lib/site";

export const siteDescription =
  "Mycie kostki, elewacji, tarasów i ogrodzeń oraz malowanie elewacji. Konin + 50 km i województwo wielkopolskie. Darmowa wycena ze zdjęć. Tel. 518 553 391.";

export const siteTitle = "WoWash — mycie ciśnieniowe w Koninie i Wielkopolsce";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: options.absoluteTitle ? { absolute: options.title } : options.title,
    description: options.description,
    alternates: { canonical: options.path },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: options.path,
      siteName: site.name,
      title: options.title,
      description: options.description,
      images: [
        {
          url: "/logo-mark.png",
          width: 498,
          height: 386,
          alt: "WoWash",
        },
      ],
    },
  };
}

export function localBusinessJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.publicName,
    url,
    image: `${url}/logo-mark.png`,
    logo: `${url}/logo-mark.png`,
    telephone: site.phoneE164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressCountry: "PL",
    },
    areaServed: [
      { "@type": "City", name: "Konin" },
      { "@type": "AdministrativeArea", name: "województwo wielkopolskie" },
    ],
    hasMap: site.mapsLink,
    sameAs: [site.instagram, site.tiktok, site.facebookHref],
    description: site.about,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewsSummary.ratingNumeric,
      reviewCount: reviewsSummary.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: googleReviews.map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.rating,
        bestRating: 5,
      },
      reviewBody: item.text,
    })),
  };
}
