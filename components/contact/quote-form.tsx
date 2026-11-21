"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { submitQuote, type QuoteActionState } from "@/app/actions/quote";
import { services, type ServiceId } from "@/lib/services";
import { cn } from "@/lib/utils";
import { quotePhotoError, type QuoteValues } from "@/lib/validations/quote";

const initialState: QuoteActionState = { ok: false, message: "" };

const controlClass =
  "mt-1 min-h-11 w-full max-w-full rounded-xl border bg-white px-3 text-base text-foreground";

type ControlProps = {
  id: string;
  className: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export function QuoteForm({ initialService }: { initialService: ServiceId | "" }) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const photosRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const photosHintId = useId();

  useEffect(() => {
    if (!state.message) return;
    feedbackRef.current?.focus();
  }, [state]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const files = Array.from(photosRef.current?.files ?? []);
    const error = quotePhotoError(files);
    setFileError(error);
    if (error) event.preventDefault();
  }

  function onPhotosChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setFileNames(files.map((file) => file.name));
    setFileError(quotePhotoError(files));
  }

  const feedback = state.message ? (
    <div
      ref={feedbackRef}
      tabIndex={-1}
      role={state.ok ? "status" : "alert"}
      className={cn(
        "scroll-mt-28 rounded-2xl border p-4",
        state.ok ? "border-[#2563EB] bg-[#f8fafc]" : "border-red-700 bg-white",
      )}
    >
      <p className="font-semibold">{state.message}</p>
      {state.ok && state.mailto ? (
        <>
          <p className="mt-2 text-sm text-muted">
            Serwer nie wysłał tej wiadomości. Otwórz e-mail, jeśli chcesz ją nadać. Zdjęć w tej
            treści nie ma.
          </p>
          <a
            href={state.mailto}
            className="mt-2 inline-flex min-h-11 items-center font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
          >
            Otwórz e-mail z treścią wyceny
          </a>
        </>
      ) : null}
    </div>
  ) : null;

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="card-shadow min-w-0 space-y-4 rounded-[1.75rem] border border-line bg-white p-5 sm:p-7"
    >
      <div>
        <h3 className="text-xl font-semibold">Dane do wyceny</h3>
        <p className="mt-2 text-sm text-muted">
          To podgląd bez płatnej wysyłki. Po sprawdzeniu pól pokażemy treść i link do e-maila.
          Zdjęć na tym etapie nie dołączamy.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Imię" required error={fieldError(state, "name")}>
          {(props) => (
            <input {...props} name="name" type="text" autoComplete="name" maxLength={80} />
          )}
        </Field>
        <Field id="phone" label="Telefon" required error={fieldError(state, "phone")}>
          {(props) => (
            <input
              {...props}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" label="E-mail" required error={fieldError(state, "email")}>
          {(props) => (
            <input {...props} name="email" type="email" autoComplete="email" maxLength={120} />
          )}
        </Field>
        <Field id="city" label="Miejscowość" required error={fieldError(state, "city")}>
          {(props) => (
            <input
              {...props}
              name="city"
              type="text"
              autoComplete="address-level2"
              maxLength={80}
            />
          )}
        </Field>
      </div>

      <Field id="service" label="Rodzaj usługi" required error={fieldError(state, "service")}>
        {(props) => (
          <select {...props} name="service" defaultValue={initialService}>
            <option value="">Wybierz rodzaj usługi</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="message" label="Wiadomość" required error={fieldError(state, "message")}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={5}
            maxLength={2000}
            className={cn(props.className, "min-h-32 py-2")}
            placeholder="Napisz, co trzeba wycenić — na przykład elewację domu."
          />
        )}
      </Field>

      <div>
        <label htmlFor="photos" className="block text-sm font-semibold">
          Zdjęcia
          <span className="font-normal text-muted"> (opcjonalnie)</span>
        </label>
        {/* No name attribute: the browser keeps the files and this preview does not upload them. */}
        <input
          ref={photosRef}
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={onPhotosChange}
          aria-invalid={fileError ? true : undefined}
          aria-describedby={fileError ? `${photosHintId} photos-error` : photosHintId}
          className={cn(
            "mt-1 block w-full max-w-full text-base file:mr-3 file:inline-flex file:min-h-11 file:items-center file:rounded-full file:border-0 file:bg-surface file:px-4 file:font-semibold",
            fileError ? "text-red-800" : "text-foreground",
          )}
        />
        <p id={photosHintId} className="mt-1 text-sm text-muted">
          Tylko obrazy, najwyżej 8 plików, do 8 MB każdy. Na podglądzie sprawdzamy typ i rozmiar.
          Dołączenie zdjęć podepniemy przy publikacji — teraz ich nie wysyłamy.
        </p>
        {fileNames.length > 0 ? (
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {fileNames.map((name, index) => (
              <li key={`${name}-${index}`} className="truncate">
                Wybrane lokalnie: {name}
              </li>
            ))}
          </ul>
        ) : null}
        {fileError ? (
          <p id="photos-error" className="mt-1 text-sm font-medium text-red-800">
            {fileError}
          </p>
        ) : null}
      </div>

      {feedback}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#4C1D95] to-[#2563EB] px-5 font-semibold text-white disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sprawdzanie…" : "Pokaż podgląd wyceny"}
      </button>
    </form>
  );
}

function fieldError(state: QuoteActionState, key: keyof QuoteValues): string | undefined {
  return state.fieldErrors?.[key]?.[0];
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
        {required ? <span className="sr-only"> (wymagane)</span> : null}
      </label>
      {children({
        id,
        className: cn(controlClass, error ? "border-red-700" : "border-line"),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="mt-1 text-sm font-medium text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
