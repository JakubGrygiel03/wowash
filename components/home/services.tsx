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
                  {photo ? (
                    <div className="card-lift relative overflow-hidden rounded-[1.35rem]">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={1200}
                        height={900}
                        className="aspect-[16/10] w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071428]/85 via-[#071428]/25 to-transparent p-4 pt-16">
                        <h3 className="text-lg font-semibold text-white lg:text-xl">{service.title}</h3>
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-lg font-semibold text-[#071428] lg:text-xl">{service.title}</h3>
                  )}
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
