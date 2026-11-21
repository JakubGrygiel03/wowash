import { QuoteForm } from "@/components/contact/quote-form";
import type { ServiceId } from "@/lib/services";
import { site } from "@/lib/site";

export function ContactSection({ initialService }: { initialService: ServiceId | "" }) {
  return (
    <section id="kontakt" className="section-mist">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8 lg:px-6 lg:py-14">
        <div className="min-w-0 rounded-[1.35rem] border border-white/80 bg-white/85 p-5 shadow-[0_18px_40px_-28px_rgba(7,20,40,0.4)] backdrop-blur-sm sm:p-7">
          <p className="eyebrow">Kontakt</p>
          <h2 className="mt-2 text-[1.7rem] font-extrabold leading-tight tracking-tight lg:text-[2rem]">
            Wycena bez opłaty
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted lg:text-base">{site.availability}</p>
          <p className="mt-2 text-sm text-muted">{site.availabilityNote}</p>

          <a
            href={site.phoneHref}
            className="mt-5 hidden text-3xl font-extrabold tracking-tight underline-offset-4 hover:underline md:inline-flex"
          >
            {site.phoneDisplay}
          </a>

          <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <li className="hidden md:block">
              <a
                href={site.whatsappHref}
                className="inline-flex min-h-10 items-center font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
              >
                Napisz na WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-10 items-center break-all font-semibold text-[#0f172a] underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </li>
            <li className="min-h-10 text-muted">
              Baza: {site.city}, {site.postalCode}
            </li>
          </ul>
        </div>
        <QuoteForm initialService={initialService} />
      </div>
    </section>
  );
}
