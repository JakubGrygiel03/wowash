import { site, trustPoints } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(ellipse_at_top_left,rgba(76,29,149,0.06),transparent_48%),radial-gradient(ellipse_at_88%_0%,rgba(56,189,248,0.12),transparent_42%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-6 pt-5 lg:px-6 lg:pb-12 lg:pt-8">
        <p className="eyebrow">Mycie ciśnieniowe · {site.city}</p>
        <h1 className="mt-2 max-w-none text-[2.15rem] font-extrabold leading-[1.12] tracking-tight lg:text-[2.65rem] lg:leading-[1.08]">
          {site.tagline}
        </h1>

        <div className="mt-5 grid items-start gap-5 lg:mt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
          <figure className="min-w-0">
            <div className="card-shadow relative overflow-hidden rounded-[1.35rem] bg-[#eef3f8] ring-1 ring-black/5">
              <img
                src="/realizacje/goslawice-porownanie.jpg"
                alt="Elewacja w Gosławicach: zacieki przed myciem i ta sama ściana po malowaniu."
                width={1440}
                height={1440}
                className="hero-photo aspect-[16/10] w-full object-cover lg:aspect-[16/8] lg:max-h-[22rem]"
              />
              <span className="compare-wipe" aria-hidden />
              <span className="compare-label left-3">Przed</span>
              <span className="compare-label right-3">Po</span>
            </div>
            <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold">Gosławice, Konin</span>
              <span className="text-right text-muted">Mycie i malowanie elewacji</span>
            </figcaption>
          </figure>

          <div className="min-w-0">
            <p className="text-[1.35rem] font-extrabold leading-snug tracking-tight lg:text-2xl">
              {site.positioning}
            </p>
            <p className="mt-3 text-base leading-7 text-muted">{site.about}</p>
            <p className="mt-2 text-base text-muted">{site.area}.</p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={site.phoneHref}
                className="btn-glow hidden min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#4C1D95] to-[#2563EB] px-5 font-semibold text-white md:inline-flex"
              >
                Zadzwoń {site.phoneDisplay}
              </a>
              <a
                href="#kontakt"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c7d2fe] bg-white px-5 font-semibold text-[#1e3a8a]"
              >
                Poproś o wycenę
              </a>
              <a
                href={site.whatsappHref}
                className="hidden min-h-11 items-center font-semibold text-[#1e3a8a] underline-offset-4 hover:underline md:inline-flex"
              >
                Napisz na WhatsApp
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-6 grid border-t border-line lg:mt-8 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <li
              key={point.title}
              className="border-b border-line py-3 last:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-1 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <p className="font-semibold">{point.title}</p>
              <p className="mt-0.5 text-sm text-muted">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
