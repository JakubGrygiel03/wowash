export type RealizationPhoto = {
  src: string;
  alt: string;
};

export type Realization = {
  id: string;
  title: string;
  place: string;
  description: string;
  /** Preselects the quote form. Empty when the job is not one of the five services. */
  serviceId: string;
  image: string;
  imageAlt: string;
  /** Extra frames after the cover. Same job, still his photos. */
  gallery: readonly RealizationPhoto[];
  /** True when the photo is still a stand-in, or the whole card is a sample slot. */
  placeholder: boolean;
  /** Sample slot in the array. Not a finished job. */
  exampleSlot: boolean;
};

export const realizations: readonly Realization[] = [
  {
    id: "goslawice",
    title: "Kompleksowe odświeżenie elewacji",
    place: "Gosławice, Konin",
    description:
      "Mycie elewacji — usunięcie zabrudzeń, zacieków i osadów — oraz malowanie elewacji. Zamiast szarych zabrudzeń świeży wygląd budynku.",
    serviceId: "malowanie",
    image: "/realizacje/goslawice-front.jpg",
    imageAlt: "Dom w Gosławicach po myciu i malowaniu elewacji, od strony wejścia.",
    gallery: [
      {
        src: "/realizacje/goslawice-mycie.jpg",
        alt: "Mycie elewacji w Gosławicach. Część ściany jest już czysta, obok widać jeszcze osady.",
      },
      {
        src: "/realizacje/goslawice-szczyt.jpg",
        alt: "Świeżo pomalowana elewacja domu w Gosławicach, ściana szczytowa.",
      },
      {
        src: "/realizacje/goslawice-naroznik.jpg",
        alt: "Narożnik domu w Gosławicach po malowaniu elewacji.",
      },
    ],
    placeholder: false,
    exampleSlot: false,
  },
  {
    id: "kostka",
    title: "Mycie kostki brukowej",
    // The paving posts on the profile have no town, so this stays blank.
    place: "",
    description: "Mycie ciśnieniowe kostki brukowej.",
    serviceId: "kostka",
    image: "/realizacje/kostka-sciezka.jpg",
    imageAlt:
      "Mycie ścieżki z kostki: jasny pas jest już umyty, dalsza część jeszcze zabrudzona.",
    gallery: [
      {
        src: "/realizacje/kostka-plyta.jpg",
        alt: "Mycie kostki urządzeniem powierzchniowym. Obok siebie widać umytą i zabrudzoną część.",
      },
    ],
    placeholder: false,
    exampleSlot: false,
  },
];
