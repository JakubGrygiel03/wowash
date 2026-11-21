import { quoteSteps } from "@/lib/site";

export function Steps() {
  return (
    <section className="bg-[#f4f7fb]">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <p className="eyebrow">Wycena</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight lg:text-[2rem]">
          Najpierw zdjęcia, potem termin
        </h2>
        <ol className="mt-5 grid gap-3 lg:grid-cols-3">
          {quoteSteps.map((step, index) => (
            <li key={step.title} className="card-shadow rounded-2xl border border-line bg-white p-4">
              <p className="text-sm font-bold tracking-[0.16em] text-[#2563EB]">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
