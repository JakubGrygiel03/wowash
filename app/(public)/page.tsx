import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact";
import { Area } from "@/components/home/area";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Realizations } from "@/components/home/realizations";
import { Reviews } from "@/components/home/reviews";
import { Services } from "@/components/home/services";
import { Steps } from "@/components/home/steps";
import { pageMetadata, siteDescription, siteTitle } from "@/lib/seo";
import { readRealizations } from "@/lib/realizations-store";
import { isServiceId } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ usluga?: string }>;
}) {
  const params = await searchParams;
  const initialService = params.usluga && isServiceId(params.usluga) ? params.usluga : "";
  const items = await readRealizations();

  return (
    <>
      <Hero />
      <Services />
      <Realizations items={items} />
      <Reviews />
      <Steps />
      <Area />
      <Faq />
      <ContactSection initialService={initialService} />
    </>
  );
}
