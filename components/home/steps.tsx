import { quoteSteps } from "@/lib/site";

export function Steps() {
  return (
    <section className="bg-white">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <p className="eyebrow">Wycena</p>
        <h2 className="mt-2 max-w-2xl text-[1.7rem] font-extrabold leading-tight tracking-tight lg:text-[2rem]">
          Najpierw zdjęcia, potem termin
        </h2>
        <ol className="card-shadow mt-6 grid overflow-hidden rounded-[1.5rem] border border-line bg-white md:grid-cols-3">
          {quoteSteps.map((step, index) => (
            <li
              key={step.title}
              className="border-b border-line px-5 py-5 last:border-b-0 md:border-r md:border-b-0 md:px-5 md:py-6 md:last:border-r-0"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-[#2563eb]">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-[#071428]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
