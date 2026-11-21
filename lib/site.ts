export const site = {
  name: "WoWash",
  publicName: "WoWash — Mycie ciśnieniowe",
  tagline: "Czystość, którą widać",
  positioning: "Zmieniamy wygląd budynków na lepsze.",
  about:
    "Profesjonalne mycie ciśnieniowe. Kostka, elewacja, taras, ogrodzenie. Także malowanie elewacji.",
  phoneDisplay: "518 553 391",
  phoneE164: "+48518553391",
  phoneHref: "tel:+48518553391",
  whatsappHref: "https://wa.me/48518553391",
  email: "wowashkontakt@gmail.com",
  instagram: "https://www.instagram.com/wowashmyciecisnieniowe",
  tiktok: "https://www.tiktok.com/@wowashmyciecisnieniowe",
  tiktokHandle: "wowashmyciecisnieniowe",
  facebookName: "WoWash-Mycie ciśnieniowe",
  facebookHref: "https://www.facebook.com/profile.php?id=61578450043862",
  city: "Konin",
  postalCode: "62-500",
  area: "Konin + 50 km oraz całe województwo wielkopolskie",
  availability: "Można napisać i zadzwonić całą dobę.",
  availabilityNote:
    "Numer i poczta są dostępne całą dobę. To nie oznacza, że ekipa pracuje na posesji 24 godziny na dobę.",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Konin",
  mapsEmbed: "https://maps.google.com/maps?q=Konin&z=11&hl=pl&output=embed",
  towns: [
    "Września",
    "Brzeźno",
    "Rychwał",
    "Słupca",
    "Żychlin",
    "Tuliszków",
    "Turek",
    "Golina",
    "Konin",
    "Koło",
  ],
} as const;

export const nav = [
  { href: "#oferta", label: "Oferta" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#opinie", label: "Opinie" },
  { href: "#obszar", label: "Obszar" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const quoteSteps = [
  {
    title: "Kontakt",
    text: "Zadzwoń, napisz na WhatsApp albo wypełnij formularz.",
  },
  {
    title: "Zdjęcia powierzchni",
    text: "Kostka, elewacja, taras albo ogrodzenie — to wystarczy do pierwszej oceny.",
  },
  {
    title: "Termin",
    text: "Ustalamy go pod pogodę. Gdy warunki się zmienią, przyjazd przekładamy.",
  },
] as const;

export const trustPoints = [
  {
    title: "Darmowa wycena",
    text: "Bez opłaty za sprawdzenie zakresu.",
  },
  {
    title: "Dojazd w okolicy",
    text: "Konin + 50 km i Wielkopolska.",
  },
  {
    title: "Wycena ze zdjęć",
    text: "Na start wystarczy kilka ujęć powierzchni.",
  },
] as const;
