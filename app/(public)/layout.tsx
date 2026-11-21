import type { ReactNode } from "react";

import { ContactStrip } from "@/components/layout/contact-strip";
import { MobileBar } from "@/components/layout/mobile-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#tresc" className="skip-link">
        Przejdź do treści
      </a>
      <div className="flex min-h-screen flex-col">
        <ContactStrip />
        <SiteHeader />
        <main id="tresc" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
      <MobileBar />
    </>
  );
}
