import { site } from "@/lib/site";

export function Area() {
  return (
    <section id="obszar" className="bg-white">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-6 lg:py-14">
        <div className="min-w-0">
          <p className="eyebrow">Obszar</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight lg:text-[2rem]">
            {site.city} i Wielkopolska
          </h2>
          <p className="mt-4 text-lg text-muted">
            Baza: {site.city}, {site.postalCode}. {site.area}.
          </p>
          <p className="mt-3 text-muted">Ulicy nie publikujemy. Dojazd ustalamy przy wycenie.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {site.towns.map((town) => (
              <li
                key={town}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium"
              >
                {town}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <div className="card-shadow overflow-hidden rounded-[1.75rem] border border-line bg-white">
            <iframe
              title="Mapa miasta Konin"
              src={site.mapsEmbed}
              className="h-80 w-full bg-white"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={site.mapsLink}
            className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
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
