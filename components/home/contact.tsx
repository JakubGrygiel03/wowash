import { QuoteForm } from "@/components/contact/quote-form";
import type { ServiceId } from "@/lib/services";
import { site } from "@/lib/site";

export function ContactSection({ initialService }: { initialService: ServiceId | "" }) {
  return (
    <section id="kontakt" className="bg-white">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-6 lg:py-14">
        <div className="card-shadow min-w-0 rounded-[1.75rem] border border-line bg-white p-6 sm:p-8">
          <p className="eyebrow">Kontakt</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight lg:text-[2rem]">Wycena bez opłaty</h2>
          <p className="mt-4 text-muted">{site.availability}</p>
          <p className="mt-2 text-sm text-muted">{site.availabilityNote}</p>
          <a
            href={site.phoneHref}
            className="mt-6 inline-flex min-h-11 items-center text-3xl font-extrabold tracking-tight underline-offset-4 hover:underline"
          >
            {site.phoneDisplay}
          </a>
          <ul className="mt-6 space-y-3">
            <li>
              <a
                href={site.whatsappHref}
                className="inline-flex min-h-11 items-center font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
              >
                Napisz na WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center break-all font-semibold underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </li>
            <li className="text-muted">
              Baza: {site.city}, {site.postalCode}
            </li>
          </ul>
        </div>
        <QuoteForm initialService={initialService} />
      </div>
    </section>
  );
}
