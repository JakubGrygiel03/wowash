import { HeroGallery } from "@/components/home/hero-gallery";
import { site, trustPoints } from "@/lib/site";

export function Hero() {
  return (
    <section className="section-mist relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,20,40,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(7,20,40,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-6 pt-5 max-[380px]:px-[max(1rem,env(safe-area-inset-left))] max-[380px]:pr-[max(1rem,env(safe-area-inset-right))] lg:h-[calc(100svh-6.5rem)] lg:px-6 lg:pb-5 lg:pt-5">
        <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="min-w-0">
            <p className="brand-mark rise">{site.name}</p>
            <p className="eyebrow rise rise-2 mt-2">Mycie ciśnieniowe · {site.city}</p>
          </div>
          <h1 className="rise rise-3 text-[2.35rem] leading-[1.06] tracking-tight text-[#071428] max-[380px]:max-w-[14ch] max-[380px]:text-[1.9rem] max-[380px]:leading-[1.12] lg:pb-0.5 lg:text-right lg:text-[2.85rem] lg:whitespace-nowrap">
            {site.tagline}
          </h1>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 items-center gap-5 lg:mt-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-8">
          <HeroGallery />

          <div className="rise rise-4 min-w-0 self-center rounded-[1.3rem] border border-white/70 bg-white/80 p-5 shadow-[0_18px_40px_-28px_rgba(7,20,40,0.45)] backdrop-blur-sm max-[380px]:p-4 lg:p-6">
            <p className="text-[1.3rem] font-extrabold leading-snug tracking-tight text-[#071428] max-[380px]:text-[1.15rem] lg:text-[1.4rem]">
              {site.positioning}
            </p>
            <p className="mt-3 text-base leading-7 text-muted max-[380px]:text-sm max-[380px]:leading-6">{site.about}</p>
            <p className="mt-2 text-base text-muted max-[380px]:text-sm">{site.area}.</p>
            <a
              href="#kontakt"
              className="cta-solid btn-glow mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 font-semibold text-white lg:w-auto"
            >
              Poproś o wycenę
            </a>
          </div>
        </div>

        <ul className="mt-5 grid gap-2.5 md:grid-cols-3 lg:mt-auto lg:gap-3 lg:pt-4">
          {trustPoints.map((point, index) => (
            <li
              key={point.title}
              className="rounded-2xl border border-white/80 bg-white/90 px-3.5 py-2.5 shadow-[0_12px_28px_-22px_rgba(7,20,40,0.45)] backdrop-blur-sm"
            >
              <p className="text-[0.65rem] font-bold tracking-[0.16em] text-[#2563eb]">0{index + 1}</p>
              <p className="mt-0.5 text-sm font-semibold text-[#071428]">{point.title}</p>
              <p className="mt-0.5 text-xs leading-5 text-muted">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
