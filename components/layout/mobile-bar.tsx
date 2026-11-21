import { site } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-white/96 px-3 pt-2.5 shadow-[0_-12px_36px_-20px_rgba(7,20,40,0.35)] backdrop-blur-md max-[380px]:px-[max(0.75rem,env(safe-area-inset-left))] max-[380px]:pr-[max(0.75rem,env(safe-area-inset-right))] md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5 pb-[max(0.55rem,env(safe-area-inset-bottom))]">
        <a
          href={site.phoneHref}
          className="cta-solid btn-glow inline-flex min-h-12 items-center justify-center rounded-full px-3 text-sm font-semibold text-white max-[380px]:flex-col max-[380px]:gap-1 max-[380px]:px-2 max-[380px]:py-1.5"
        >
          <span className="leading-none">Zadzwoń</span>
          <span className="leading-none max-[380px]:text-[0.7rem] max-[380px]:opacity-95">
            <span className="max-[380px]:hidden"> · </span>
            {site.phoneDisplay}
          </span>
        </a>
        <a
          href={site.whatsappHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c7d2fe] bg-[#f8fafc] px-3 text-sm font-semibold text-[#1e3a8a]"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
