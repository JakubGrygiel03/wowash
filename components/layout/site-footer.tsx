import { nav, site } from "@/lib/site";

const socials = [
  { href: site.instagram, label: "Instagram", icon: "instagram" as const },
  { href: site.tiktok, label: "TikTok", icon: "tiktok" as const },
  { href: site.facebookHref, label: "Facebook", icon: "facebook" as const },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-[#f3f7fb]">
      <div className="brand-line h-px" />
      <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <img src="/logo-mark.png" alt="" width={498} height={386} className="h-9 w-auto" />
              <div>
                <p className="text-sm font-semibold leading-tight text-[#071428]">{site.name}</p>
                <p className="text-xs text-muted">
                  {site.city}, {site.postalCode}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <a href={site.phoneHref} className="block text-lg font-extrabold tracking-tight text-[#071428]">
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block break-all text-sm text-muted underline-offset-4 hover:text-[#071428] hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:text-right">
            <p className="text-xs font-bold tracking-[0.14em] text-[#2563eb] uppercase">Na stronie</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-10 items-center text-sm font-semibold text-[#071428]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs font-bold tracking-[0.14em] text-[#2563eb] uppercase">Social</p>
            <ul className="mt-3 flex gap-2 lg:justify-end">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="social-link inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-[#071428]"
                    aria-label={item.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialIcon name={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: "instagram" | "tiktok" | "facebook" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
      {name === "instagram" ? (
        <path
          fill="currentColor"
          d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
        />
      ) : null}
      {name === "tiktok" ? (
        <path
          fill="currentColor"
          d="M14 3h2.1a5.2 5.2 0 0 0 3.4 3.2v2.2A7.3 7.3 0 0 1 16 7.2v6.5a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.3a3.4 3.4 0 1 0 2.4 3.3V3z"
        />
      ) : null}
      {name === "facebook" ? (
        <path
          fill="currentColor"
          d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z"
        />
      ) : null}
    </svg>
  );
}
