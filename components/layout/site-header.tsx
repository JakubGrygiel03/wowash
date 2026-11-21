"use client";

import Link from "next/link";
import { useState } from "react";

import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between gap-3 px-4 lg:h-[4.25rem]">
        <Link href="/" className="inline-flex min-w-0 shrink items-center" aria-label="WoWash — strona główna">
          <img
            src="/logo-mark.png"
            alt=""
            width={498}
            height={386}
            className="h-8 w-auto object-contain object-left lg:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Sekcje strony">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold hover:bg-surface"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className="btn-glow hidden min-h-11 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4C1D95] to-[#2563EB] px-4 text-sm font-semibold text-white md:inline-flex"
          >
            Zadzwoń {site.phoneDisplay}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm font-semibold lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobilne"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Zamknij" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="menu-mobilne" className="menu-panel border-t border-line px-4 py-2 lg:hidden" aria-label="Sekcje strony">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center text-base font-semibold"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
      <div className="brand-line h-px" />
    </header>
  );
}
