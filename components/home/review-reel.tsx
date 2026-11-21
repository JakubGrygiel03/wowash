"use client";

import { useEffect, useRef, useState } from "react";

import { googleReviews, reviewsSummary } from "@/lib/reviews";

const DWELL_MS = 7000;

function pageSizeForWidth(width: number) {
  if (width >= 1280) return 3;
  if (width >= 1024) return 2;
  return 1;
}

function pagesOf<T>(items: readonly T[], size: number) {
  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages;
}

export function ReviewReel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [perPage, setPerPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hold, setHold] = useState(false);
  const [open, setOpen] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [reduced, setReduced] = useState(false);
  const prevHold = useRef(false);
  const pages = pagesOf(googleReviews, perPage);
  const pageCount = pages.length;

  useEffect(() => {
    const sync = () => setPerPage(pageSizeForWidth(document.documentElement.clientWidth));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [perPage]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setHold(pointer || open);
  }, [pointer, open]);

  useEffect(() => {
    if (prevHold.current && !hold) setCycle((current) => current + 1);
    prevHold.current = hold;
  }, [hold]);

  useEffect(() => {
    if (hold || reduced || pageCount < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % pageCount);
      setCycle((current) => current + 1);
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [cycle, hold, pageCount, reduced]);

  function closeOpen() {
    rootRef.current?.querySelectorAll("details[open]").forEach((node) => {
      node.removeAttribute("open");
    });
    setOpen(false);
  }

  function go(step: number) {
    closeOpen();
    setIndex((current) => (current + step + pageCount) % pageCount);
    setCycle((current) => current + 1);
  }

  return (
    <div
      ref={rootRef}
      className="mt-5"
      onPointerEnter={() => setPointer(true)}
      onPointerLeave={() => setPointer(false)}
      onFocusCapture={() => setPointer(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPointer(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {pages.map((page, pageIndex) => (
            <li key={page.map((review) => review.id).join("-")} className="w-full shrink-0">
              <div className={`flex gap-3 ${page.length < perPage ? "justify-center" : ""}`}>
                {page.map((review) => (
                  <div
                    key={review.id}
                    className="min-w-0"
                    style={{ width: `calc((100% - ${(perPage - 1) * 0.75}rem) / ${perPage})` }}
                  >
                    <details
                      className="group card-shadow h-full rounded-[1.35rem] border border-line bg-white"
                      onToggle={(event) => {
                        if (pageIndex === index) setOpen(event.currentTarget.open);
                      }}
                    >
                      <summary className="cursor-pointer list-none px-5 py-5 [&::-webkit-details-marker]:hidden">
                        <p className="text-sm font-semibold tracking-[0.14em] text-[#f5b400]">
                          <span className="sr-only">Ocena {review.rating} na 5. </span>
                          <span aria-hidden>★★★★★</span>
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#071428] group-open:line-clamp-none">
                          {review.text}
                        </p>
                        <p className="mt-3 text-sm font-semibold">{review.author}</p>
                        <p className="text-xs text-muted">Opinia w Google</p>
                        <span className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#1e3a8a] group-open:hidden">
                          Rozwiń
                        </span>
                        <span className="mt-2 hidden min-h-11 items-center text-sm font-semibold text-[#1e3a8a] group-open:inline-flex">
                          Zwiń
                        </span>
                      </summary>
                    </details>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold"
          onClick={() => go(-1)}
        >
          <span aria-hidden>←</span>
          Poprzednia
        </button>
        <p className="text-sm font-semibold text-muted">
          {index + 1} / {pageCount}
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold"
          onClick={() => go(1)}
        >
          Następna
          <span aria-hidden>→</span>
        </button>
      </div>
      {reduced || pageCount < 2 ? null : (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#d7e2ee]">
          <div key={cycle} className={hold ? "review-progress is-paused" : "review-progress"} />
        </div>
      )}
      <p className="sr-only">
        {reviewsSummary.ratingValue} na 5, {reviewsSummary.count} opinii w {reviewsSummary.source}.
      </p>
    </div>
  );
}
