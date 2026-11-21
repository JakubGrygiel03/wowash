import { redirect } from "next/navigation";

import { deleteRealization, logout, saveRealization } from "@/app/actions/admin";
import { isAdmin } from "@/lib/admin-session";
import { readRealizations } from "@/lib/realizations-store";
import type { Realization } from "@/lib/realizations";
import { services } from "@/lib/services";

export const dynamic = "force-dynamic";

const notes: Record<string, string> = {
  zapis: "Zapisane. Odśwież stronę główną, jeśli karta jeszcze stoi w miejscu.",
  pola: "Tytuł i opis są potrzebne.",
  limit: "Najwyżej 8 zdjęć przy jednej realizacji.",
  plik: "Tylko obrazy, do 8 MB każdy.",
  dysk: "Nie udało się zapisać pliku na dysku.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ zapis?: string; blad?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/logowanie");
  const params = await searchParams;
  const items = await readRealizations();
  const note = params.zapis ? notes.zapis : params.blad ? notes[params.blad] ?? notes.zapis_dysk : "";

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">WoWash</p>
          <h1 className="mt-2 text-4xl">Realizacje</h1>
        </div>
        <div className="flex gap-4">
          <a href="/" className="inline-flex min-h-11 items-center font-semibold text-[#1e3a8a]">
            Zobacz stronę
          </a>
          <form action={logout}>
            <button type="submit" className="inline-flex min-h-11 items-center font-semibold">
              Wyloguj
            </button>
          </form>
        </div>
      </div>
      <p className="mt-3 max-w-xl text-muted">
        Tytuł, miejscowość bez ulicy, opis i zdjęcia. Zapis trzyma się na tym komputerze, w pliku obok projektu.
      </p>
      {note ? (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium">
          {note}
        </p>
      ) : null}

      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <RealizationForm key={item.id} item={item} />
        ))}
        <RealizationForm />
      </div>
    </main>
  );
}

function RealizationForm({ item }: { item?: Realization }) {
  const frames = item?.image
    ? [{ src: item.image, alt: item.imageAlt }, ...item.gallery]
    : [];

  return (
    <form action={saveRealization} className="card-shadow space-y-4 rounded-[1.75rem] border border-line bg-white p-5 sm:p-6">
      <h2 className="text-2xl">{item ? item.title : "Nowa realizacja"}</h2>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field id={`${item?.id ?? "nowa"}-title`} name="title" label="Tytuł" defaultValue={item?.title} required />
      <Field
        id={`${item?.id ?? "nowa"}-place`}
        name="place"
        label="Miejscowość"
        defaultValue={item?.place}
        hint="Bez ulicy. Zostaw puste, gdy post jej nie podaje."
      />
      <div>
        <label htmlFor={`${item?.id ?? "nowa"}-service`} className="text-sm font-semibold">
          Usługa w formularzu wyceny
        </label>
        <select
          id={`${item?.id ?? "nowa"}-service`}
          name="serviceId"
          defaultValue={item?.serviceId ?? ""}
          className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3"
        >
          <option value="">Bez wstępnego wyboru</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${item?.id ?? "nowa"}-description`} className="text-sm font-semibold">
          Opis
        </label>
        <textarea
          id={`${item?.id ?? "nowa"}-description`}
          name="description"
          required
          rows={4}
          defaultValue={item?.description}
          className="mt-1 w-full rounded-xl border border-line px-3 py-2"
        />
      </div>
      <Field
        id={`${item?.id ?? "nowa"}-alt`}
        name="imageAlt"
        label="Opis zdjęcia"
        defaultValue={item?.imageAlt}
        hint="Krótko, co widać. Czytniki ekranu tego używają."
      />
      {frames.length > 0 ? (
        <fieldset>
          <legend className="text-sm font-semibold">Zdjęcia</legend>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {frames.map((frame) => (
              <li key={frame.src} className="overflow-hidden rounded-2xl border border-line">
                <img src={frame.src} alt={frame.alt} className="aspect-square w-full object-cover" />
                <label className="flex min-h-11 items-center gap-2 px-3 text-sm">
                  <input type="checkbox" name="remove" value={frame.src} />
                  Usuń
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}
      <div>
        <label htmlFor={`${item?.id ?? "nowa"}-photos`} className="text-sm font-semibold">
          Dodaj zdjęcia
        </label>
        <input
          id={`${item?.id ?? "nowa"}-photos`}
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="mt-1 block w-full text-sm file:mr-3 file:inline-flex file:min-h-11 file:items-center file:rounded-full file:border-0 file:bg-surface file:px-4 file:font-semibold"
        />
        <p className="mt-1 text-sm text-muted">Najwyżej 8 zdjęć razem, do 8 MB każdy. Pierwsze zostaje okładką.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#4C1D95] to-[#2563EB] px-5 font-semibold text-white"
        >
          {item ? "Zapisz zmiany" : "Dodaj realizację"}
        </button>
      </div>
      {item ? (
        <button
          type="submit"
          formAction={deleteRealization}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-red-800"
        >
          Usuń tę realizację
        </button>
      ) : null}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  defaultValue,
  required,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        required={required}
        defaultValue={defaultValue}
        className="mt-1 min-h-11 w-full rounded-xl border border-line px-3"
      />
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
