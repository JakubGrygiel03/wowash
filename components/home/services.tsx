import { services, type ServiceId } from "@/lib/services";

const photos: Partial<Record<ServiceId, { src: string; alt: string }>> = {
  kostka: {
    src: "/realizacje/kostka-plyta.jpg",
    alt: "Mycie kostki brukowej. Umyta część jest jaśniejsza od zabrudzonej.",
  },
  elewacja: {
    src: "/realizacje/goslawice-mycie.jpg",
    alt: "Mycie elewacji. Na ścianie widać granicę między czystą a zabrudzoną częścią.",
  },
  malowanie: {
    src: "/realizacje/goslawice-szczyt.jpg",
    alt: "Elewacja po malowaniu, jasna ściana szczytowa.",
  },
};

export function Services() {
  return (
    <section id="oferta" className="bg-white">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="max-w-2xl">
          <p className="eyebrow">Oferta</p>
          <h2 className="mt-2 text-[1.7rem] leading-tight lg:text-[2rem]">
            Kostka, elewacja, taras, ogrodzenie
          </h2>
          <p className="mt-3 text-muted">
            Mycie ciśnieniowe kostki, elewacji, tarasów i ogrodzeń. Do tego malowanie elewacji.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 lg:grid-cols-6">
          {services.map((service, index) => {
            const photo = photos[service.id];
            const span = index < 2 ? "lg:col-span-3" : "lg:col-span-2";

            return (
              <li key={service.id} className={span}>
                <a href={`/?usluga=${service.id}#kontakt`} className="group block min-w-0">
                  <div className="card-lift relative overflow-hidden rounded-[1.35rem] bg-[#0b1f3a]">
                    {photo ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={1200}
                        height={900}
                        className="aspect-[16/10] w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#122846] via-[#0b1f3a] to-[#164e63] px-4 text-center">
                        <ServiceMark id={service.id} />
                        <span className="text-xs font-semibold tracking-wide text-[#7dd3fc] uppercase">
                          Zdjęcie do podmiany
                        </span>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071428]/85 via-[#071428]/25 to-transparent p-4 pt-16">
                      <h3 className="text-lg font-semibold text-white lg:text-xl">{service.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted">{service.summary}</p>
                  <span className="mt-2 inline-flex min-h-10 items-center text-sm font-semibold text-[#1e3a8a] underline-offset-4 group-hover:underline">
                    Poproś o wycenę
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ServiceMark({ id }: { id: ServiceId }) {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden>
      <rect width="64" height="64" rx="18" fill="rgba(255,255,255,0.08)" />
      {id === "taras" ? (
        <path
          d="M12 40h40M16 40v8M48 40v8M14 32h36l-4-10H18l-4 10Z"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M16 16v32M48 16v32M16 24h32M16 40h32"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
