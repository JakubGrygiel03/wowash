import { z } from "zod";

import { serviceIds, serviceTitle, type ServiceId } from "@/lib/services";
import { site } from "@/lib/site";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię.").max(80, "Imię jest zbyt długie."),
  phone: z
    .string()
    .trim()
    .min(1, "Podaj numer telefonu.")
    .max(30, "Numer telefonu jest zbyt długi.")
    .refine((value) => value.replace(/\D/g, "").length >= 9, "Podaj numer telefonu."),
  email: z.email("Podaj poprawny adres e-mail."),
  city: z
    .string()
    .trim()
    .min(2, "Podaj miejscowość.")
    .max(80, "Nazwa miejscowości jest zbyt długa."),
  service: z.enum(serviceIds, { message: "Wybierz rodzaj usługi." }),
  message: z
    .string()
    .trim()
    .min(10, "Napisz krótko, co trzeba wycenić.")
    .max(2000, "Wiadomość jest zbyt długa."),
});

export type QuoteValues = z.infer<typeof quoteSchema>;

export const quotePhotoRules = {
  maxCount: 8,
  maxBytes: 8 * 1024 * 1024,
} as const;

const imageExtension = /\.(avif|bmp|gif|heic|heif|jpe?g|png|svg|webp)$/i;

export function quotePhotoError(
  files: readonly { name: string; type: string; size: number }[],
): string | null {
  if (files.length === 0) return null;
  if (files.length > quotePhotoRules.maxCount) {
    return `Możesz dodać najwyżej ${quotePhotoRules.maxCount} zdjęć.`;
  }

  for (const file of files) {
    const typedImage = file.type.startsWith("image/");
    const extensionImage = imageExtension.test(file.name);
    if ((file.type && !typedImage) || (!file.type && !extensionImage)) {
      return "Dodaj tylko pliki graficzne, na przykład JPG, PNG lub WEBP.";
    }
    if (file.size > quotePhotoRules.maxBytes) {
      return "Jedno zdjęcie może mieć najwyżej 8 MB.";
    }
  }

  return null;
}

export function quoteMailto(values: QuoteValues): string {
  const body = [
    `Imię: ${values.name}`,
    `Telefon: ${values.phone}`,
    `E-mail: ${values.email}`,
    `Miejscowość: ${values.city}`,
    `Rodzaj usługi: ${serviceTitle(values.service as ServiceId)}`,
    "",
    values.message,
    "",
    "Zdjęcia powierzchni nie są w tej wiadomości. Na podglądzie strony ich nie dołączamy.",
  ].join("\n");

  // %20 survives mail clients better than the "+" from URLSearchParams.
  const subject = encodeURIComponent("Wycena — WoWash");
  const encodedBody = encodeURIComponent(body);
  return `mailto:${site.email}?subject=${subject}&body=${encodedBody}`;
}
