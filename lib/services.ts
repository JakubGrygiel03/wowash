export const serviceIds = [
  "kostka",
  "elewacja",
  "taras",
  "ogrodzenie",
  "malowanie",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export type Service = {
  id: ServiceId;
  title: string;
  summary: string;
  /** Future price label. Leave unset — the UI must not render it. */
  priceLabel?: string;
};

export const services: readonly Service[] = [
  {
    id: "kostka",
    title: "Mycie kostki brukowej",
    summary: "Usuwamy brud, mech i osady z podjazdu oraz ścieżek.",
  },
  {
    id: "elewacja",
    title: "Mycie elewacji",
    summary: "Zacieki, osady i zabrudzenia ze ścian budynku.",
  },
  {
    id: "taras",
    title: "Mycie tarasów",
    summary: "Odświeżamy powierzchnię tarasu przed sezonem.",
  },
  {
    id: "ogrodzenie",
    title: "Mycie ogrodzeń",
    summary: "Czyścimy ogrodzenia z osadów i zielonego nalotu.",
  },
  {
    id: "malowanie",
    title: "Malowanie elewacji",
    summary: "Malowanie po myciu albo osobno — według wyceny.",
  },
];

export function serviceTitle(id: ServiceId): string {
  return services.find((service) => service.id === id)?.title ?? id;
}

export function isServiceId(value: string): value is ServiceId {
  return serviceIds.some((id) => id === value);
}
