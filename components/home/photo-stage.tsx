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
  const [perPage, setPerPage] = useState(2);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    function sync() {
      const next = query.matches ? Math.min(4, count) : Math.min(2, count);
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
    <div className="px-3 pt-3">
      <ul
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
      >
        {shown.map((frame) => (
          <li key={frame.src} className="min-w-0 overflow-hidden rounded-2xl bg-[#eef3f8]">
            <img
              src={frame.src}
              alt={frame.alt}
              width={800}
              height={800}
              draggable={false}
              className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </li>
        ))}
      </ul>
      {count > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold"
            onClick={() => go(-1)}
          >
            Wstecz
          </button>
          <p className="min-w-12 text-center text-sm text-muted">
            {start + 1} / {count}
          </p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold"
            onClick={() => go(1)}
          >
            Dalej
          </button>
        </div>
      ) : null}
    </div>
  );
}
