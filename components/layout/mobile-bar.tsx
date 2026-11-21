import { site } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 shadow-[0_-12px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 pb-[env(safe-area-inset-bottom)]">
        <a
          href={site.phoneHref}
          className="btn-glow inline-flex min-h-11 flex-col items-center justify-center rounded-full bg-gradient-to-r from-[#4C1D95] to-[#2563EB] px-3 text-white"
        >
          <span className="text-sm font-semibold leading-tight">Zadzwoń</span>
          <span className="text-xs leading-tight">{site.phoneDisplay}</span>
        </a>
        <a
          href={site.whatsappHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#1e3a8a] px-3 text-sm font-semibold text-[#1e3a8a]"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
