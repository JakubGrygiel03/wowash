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
  const [open, setOpen] = useState(false);
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
    if (prevHold.current && !open) setCycle((current) => current + 1);
    prevHold.current = open;
  }, [open]);

  useEffect(() => {
    if (open || reduced || pageCount < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % pageCount);
      setCycle((current) => current + 1);
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [cycle, open, pageCount, reduced]);

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
      <div className="review-clip min-w-0">
        <ul
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {pages.map((page, pageIndex) => (
            <li key={page.map((review) => review.id).join("-")} className="w-full min-w-full shrink-0 px-[1.35rem] pt-3 pb-[2.75rem]">
              <div className={`flex items-stretch gap-4 ${page.length < perPage ? "justify-center" : ""}`}>
                {page.map((review) => (
                  <div
                    key={review.id}
                    className="flex min-w-0 flex-col"
                    style={{ width: `calc((100% - ${(perPage - 1) * 1}rem) / ${perPage})` }}
                  >
                    <details
                      className="group card-shadow flex flex-1 flex-col overflow-hidden rounded-[1.35rem] border border-line bg-white"
                      onToggle={(event) => {
                        if (pageIndex === index) setOpen(event.currentTarget.open);
                      }}
                    >
                      <summary className="flex flex-1 cursor-pointer list-none flex-col px-5 py-5 lg:px-6 lg:py-6 [&::-webkit-details-marker]:hidden">
                        <p className="text-sm font-semibold tracking-[0.14em] text-[#f5b400]">
                          <span className="sr-only">Ocena {review.rating} na 5. </span>
                          <span aria-hidden>★★★★★</span>
                        </p>
                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[#071428] group-open:line-clamp-none">
                          {review.text}
                        </p>
                        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold tracking-tight text-[#071428]">{review.author}</p>
                            <p className="mt-0.5 text-xs text-muted">Opinia w Google</p>
                          </div>
                          <span className="shrink-0 text-sm font-semibold text-[#1e3a8a] group-open:hidden">
                            Rozwiń
                          </span>
                          <span className="hidden shrink-0 text-sm font-semibold text-[#1e3a8a] group-open:inline">
                            Zwiń
                          </span>
                        </div>
                      </summary>
                    </details>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3">
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
        <div className="mx-auto mt-3 h-1 w-full max-w-xl overflow-hidden rounded-full bg-[#e7eef6]">
          <div key={cycle} className={open ? "review-progress is-paused" : "review-progress"} />
        </div>
      )}
      <p className="sr-only">
        {reviewsSummary.ratingValue} na 5, {reviewsSummary.count} opinii w {reviewsSummary.source}.
      </p>
    </div>
  );
}
