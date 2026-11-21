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
    summary: "Mycie ciśnieniowe kostki brukowej.",
  },
  {
    id: "elewacja",
    title: "Mycie elewacji",
    summary: "Zabrudzenia, zacieki i osady z powierzchni ścian.",
  },
  {
    id: "taras",
    title: "Mycie tarasów",
    summary: "Mycie ciśnieniowe tarasów.",
  },
  {
    id: "ogrodzenie",
    title: "Mycie ogrodzeń",
    summary: "Mycie ciśnieniowe ogrodzeń.",
  },
  {
    id: "malowanie",
    title: "Malowanie elewacji",
    summary: "Malowanie elewacji, także razem z myciem.",
  },
];

export function serviceTitle(id: ServiceId): string {
  return services.find((service) => service.id === id)?.title ?? id;
}

export function isServiceId(value: string): value is ServiceId {
  return serviceIds.some((id) => id === value);
}
