import { login } from "@/app/actions/admin";
import { adminPassword } from "@/lib/admin-session";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ blad?: string }>;
}) {
  const params = await searchParams;
  const configured = Boolean(adminPassword());
  const error =
    params.blad === "haslo"
      ? "Hasło się nie zgadza."
      : params.blad === "konfiguracja"
        ? "Na publikacji ustaw zmienną ADMIN_PASSWORD."
        : "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-16">
      <p className="eyebrow">WoWash</p>
      <h1 className="mt-3 text-4xl">Panel realizacji</h1>
      <p className="mt-3 text-muted">
        Tu dodajesz zdjęcia i opis. Na stronie pojawi się nowa karta realizacji.
      </p>
      <form action={login} className="card-shadow mt-8 space-y-4 rounded-[1.75rem] border border-line bg-white p-6">
        <div>
          <label htmlFor="password" className="text-sm font-semibold">
            Hasło
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 min-h-11 w-full rounded-xl border border-line px-3"
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm font-medium text-red-800">
            {error}
          </p>
        ) : null}
        {!configured ? (
          <p className="text-sm text-muted">Na publikacji ustaw zmienną ADMIN_PASSWORD.</p>
        ) : process.env.NODE_ENV !== "production" && !process.env.ADMIN_PASSWORD ? (
          <p className="text-sm text-muted">Podgląd lokalny: hasło wowash-podglad.</p>
        ) : null}
        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#4C1D95] to-[#2563EB] px-5 font-semibold text-white"
        >
          Wejdź
        </button>
      </form>
    </main>
  );
}
