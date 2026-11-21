import { site } from "@/lib/site";

export function Area() {
  return (
    <section id="obszar" className="bg-white">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-6 lg:py-12">
        <div className="min-w-0">
          <p className="eyebrow">Obszar</p>
          <h2 className="mt-2 text-[1.7rem] font-extrabold leading-tight tracking-tight lg:text-[2rem]">
            {site.city} i Wielkopolska
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Baza: {site.city}, {site.postalCode}. {site.area}.
          </p>
          <p className="mt-2 text-sm text-muted">Ulicy nie publikujemy. Dojazd ustalamy przy wycenie.</p>
          <p className="mt-5 text-sm leading-7 text-[#0f172a]">
            {site.towns.join(" · ")}
          </p>
        </div>
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-[#eef3f8] shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]">
            <iframe
              title="Mapa miasta Konin"
              src={site.mapsEmbed}
              className="h-72 w-full bg-white lg:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={site.mapsLink}
            className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Otwórz mapę Konina
          </a>
        </div>
      </div>
    </section>
  );
}
