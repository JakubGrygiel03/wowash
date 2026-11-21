"use client";

import { useEffect, useState } from "react";

type Frame = {
  src: string;
  alt: string;
};

const INTERVAL_MS = 12000;

export function PhotoStage({ frames }: { frames: readonly Frame[] }) {
  const visible = frames.slice(0, 8);
  const count = visible.length;
  const [perPage, setPerPage] = useState(1);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    function sync() {
      const next = query.matches ? Math.min(2, count) : Math.min(1, count);
      setPerPage(next || 1);
    }
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [count]);

  useEffect(() => {
    if (count <= perPage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setStart((current) => (current + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, perPage, start]);

  function go(step: number) {
    setStart((current) => (current + step + count) % count);
  }

  if (count === 0) return null;

  const shown = Array.from({ length: Math.min(perPage, count) }, (_, offset) => visible[(start + offset) % count]!);

  return (
    <div className="relative">
      <ul
        className="grid gap-px bg-line/60"
        style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
      >
        {shown.map((frame) => (
          <li key={frame.src} className="min-w-0 overflow-hidden bg-[#eef3f8]">
            <img
              src={frame.src}
              alt={frame.alt}
              width={800}
              height={600}
              draggable={false}
              className="aspect-[4/3] w-full object-cover"
            />
          </li>
        ))}
      </ul>
      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 px-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-sm font-semibold shadow-sm ring-1 ring-black/5"
            aria-label="Poprzednie zdjęcie"
            onClick={() => go(-1)}
          >
            ←
          </button>
          <p className="rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-muted shadow-sm ring-1 ring-black/5">
            {start + 1} / {count}
          </p>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-sm font-semibold shadow-sm ring-1 ring-black/5"
            aria-label="Następne zdjęcie"
            onClick={() => go(1)}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
