"use server";

import { quoteMailto, quoteSchema, type QuoteValues } from "@/lib/validations/quote";

export type QuoteActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof QuoteValues, string[]>>;
  mailto?: string;
};

export async function submitQuote(
  _previous: QuoteActionState,
  formData: FormData,
): Promise<QuoteActionState> {
  // Photos are validated in the browser and are not part of this preview payload.
  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    service: formData.get("service"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Sprawdź pola formularza i spróbuj ponownie.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    ok: true,
    message:
      "Podgląd zapisał treść wyceny. Zdjęcia dołączysz przy publikacji — teraz ich nie wysłaliśmy.",
    mailto: quoteMailto(parsed.data),
  };
}
