import { faq } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" className="bg-[#e8f1f8]">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <p className="eyebrow">Pytania</p>
        <h2 className="mt-2 text-[1.7rem] font-extrabold leading-tight tracking-tight lg:text-[2rem]">
          Zanim zadzwonisz
        </h2>
        <div className="card-shadow mt-8 overflow-hidden rounded-[1.75rem] border border-line bg-white">
          {faq.map((item) => (
            <details key={item.id} className="group border-b border-line last:border-b-0">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold sm:px-7 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef4fa] text-lg text-[#1e3a8a] group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef4fa] text-lg text-[#1e3a8a] group-open:inline-flex"
                >
                  –
                </span>
              </summary>
              <p className="max-w-3xl px-5 pb-5 text-sm leading-6 text-muted sm:px-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
