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
    <section id="oferta" className="bg-[#f4f7fb]">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <p className="eyebrow">Oferta</p>
        <h2 className="mt-2 max-w-3xl text-3xl lg:text-[2rem]">Kostka, elewacja, taras, ogrodzenie</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Mycie ciśnieniowe kostki, elewacji, tarasów i ogrodzeń. Do tego malowanie elewacji.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const photo = photos[service.id];

            return (
              <li key={service.id}>
                <a href={`/?usluga=${service.id}#kontakt`} className="group block min-w-0">
                  <div className="card-lift overflow-hidden rounded-[1.4rem] bg-white">
                    {photo ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={1200}
                        height={900}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#f4f0ff] via-white to-[#e7f6fd]">
                        <ServiceMark id={service.id} />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl">{service.title}</h3>
                    <p className="mt-2 max-w-md text-muted">{service.summary}</p>
                    <span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#1e3a8a] underline-offset-4 group-hover:underline">
                      Poproś o wycenę
                    </span>
                  </div>
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
  const label = id === "taras" ? "Taras" : "Ogrodzenie";

  return (
    <span className="flex flex-col items-center gap-3 text-sm font-semibold text-[#1e3a8a]">
      <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden>
        <rect width="64" height="64" rx="20" fill="#ffffff" />
        {id === "taras" ? (
          <path
            d="M12 40h40M16 40v8M48 40v8M14 32h36l-4-10H18l-4 10Z"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M16 16v32M48 16v32M16 24h32M16 40h32"
            fill="none"
            stroke="#4C1D95"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        )}
      </svg>
      {label}
    </span>
  );
}
