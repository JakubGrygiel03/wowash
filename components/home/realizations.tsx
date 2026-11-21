import { PhotoStage } from "@/components/home/photo-stage";
import type { Realization } from "@/lib/realizations";
import { isServiceId, serviceTitle } from "@/lib/services";

export function Realizations({ items }: { items: readonly Realization[] }) {
  return (
    <section id="realizacje" className="section-mist">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <p className="eyebrow">Realizacje</p>
        <h2 className="mt-2 max-w-3xl text-[1.7rem] leading-tight lg:text-[2rem]">
          Efekt widać na ścianie i na kostce
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted lg:text-base">
          Gosławice: mycie i malowanie elewacji. Osobno mycie kostki. Zdjęcia można przewijać.
        </p>

        {items.length === 0 ? (
          <p className="mt-6 text-muted">Realizacje pojawią się tutaj, gdy dodasz je w panelu.</p>
        ) : (
          <div className="mt-6 grid gap-10 lg:mt-8 lg:gap-14">
            {items.map((item) => (
              <Work key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Work({ item }: { item: Realization }) {
  const frames = item.image ? [{ src: item.image, alt: item.imageAlt }, ...item.gallery] : [];
  const service = isServiceId(item.serviceId) ? item.serviceId : "";
  const quote = service ? `/?usluga=${service}#kontakt` : "/#kontakt";
  const quoteLabel = service ? serviceTitle(service) : "wycenę";

  return (
    <article className="min-w-0">
      {frames.length > 0 ? (
        <div className="overflow-hidden rounded-[1.35rem] bg-[#eef3f8] ring-1 ring-black/5">
          <PhotoStage frames={frames} />
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {item.place ? <p className="text-sm font-semibold text-[#4c1d95]">{item.place}</p> : null}
          <h3 className="mt-1 text-xl lg:text-[1.35rem]">{item.title}</h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">{item.description}</p>
          {item.placeholder ? (
            <p className="mt-2 text-sm font-semibold text-[#1e3a8a]">Zdjęcie do podmiany</p>
          ) : null}
        </div>
        <a
          href={quote}
          className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
        >
          Poproś o wycenę: {quoteLabel}
        </a>
      </div>
    </article>
  );
}
