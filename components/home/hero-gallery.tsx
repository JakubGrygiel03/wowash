"use client";

import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  place: string;
  caption: string;
  compare?: boolean;
};

const slides: readonly Slide[] = [
  {
    src: "/realizacje/goslawice-porownanie.jpg",
    alt: "Elewacja w Gosławicach: zacieki przed myciem i ta sama ściana po malowaniu.",
    place: "Gosławice, Konin",
    caption: "Mycie i malowanie elewacji",
    compare: true,
  },
  {
    src: "/realizacje/goslawice-mycie.jpg",
    alt: "Mycie elewacji w Gosławicach. Część ściany jest już czysta, obok widać jeszcze osady.",
    place: "Gosławice, Konin",
    caption: "Mycie elewacji",
  },
  {
    src: "/realizacje/kostka-plyta.jpg",
    alt: "Mycie kostki brukowej. Obok siebie widać umytą i zabrudzoną część.",
    place: "Kostka brukowa",
    caption: "Mycie ciśnieniowe",
  },
  {
    src: "/realizacje/goslawice-szczyt.jpg",
    alt: "Świeżo pomalowana elewacja domu w Gosławicach, ściana szczytowa.",
    place: "Gosławice, Konin",
    caption: "Po malowaniu elewacji",
  },
  {
    src: "/realizacje/kostka-sciezka.jpg",
    alt: "Mycie ścieżki z kostki: jasny pas jest już umyty, dalsza część jeszcze zabrudzona.",
    place: "Kostka brukowa",
    caption: "Efekt mycia",
  },
];

const INTERVAL_MS = 7000;

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

export function HeroGallery() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const slide = slides[index]!;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    function onChange() {
      setReduceMotion(query.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all(slides.map((item) => preload(item.src))).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [ready, reduceMotion, index]);

  return (
    <figure className="rise rise-3 flex min-h-0 min-w-0 flex-col">
      <div className="relative min-h-0 flex-1 max-lg:aspect-[16/10] max-lg:flex-none">
        <div
          aria-hidden
          className="absolute -inset-2 rounded-[1.45rem] bg-gradient-to-br from-[#4c1d95]/18 via-[#2563eb]/10 to-[#38bdf8]/22"
        />
        <div className="card-shadow absolute inset-0 overflow-hidden rounded-[1.3rem] bg-[#dbeafe] ring-1 ring-white/70">
          {slides.map((item, slideIndex) => {
            const active = slideIndex === index;
            return (
              <img
                key={item.src}
                src={item.src}
                alt={active ? item.alt : ""}
                width={1440}
                height={1440}
                decoding="async"
                fetchPriority={slideIndex === 0 ? "high" : "low"}
                aria-hidden={!active}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  ready && active ? "opacity-100" : "opacity-0"
                } ${reduceMotion ? "duration-0" : ""}`}
              />
            );
          })}
          {slide.compare ? (
            <>
              <span className="compare-label left-3">Przed</span>
              <span className="compare-label right-3">Po</span>
            </>
          ) : null}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((item, slideIndex) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Pokaż przykład ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  slideIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/55"
                }`}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        </div>
      </div>
      <figcaption className="relative mt-2.5 flex h-5 shrink-0 items-baseline justify-between gap-3 text-sm">
        {slides.map((item, slideIndex) => {
          const active = slideIndex === index;
          return (
            <span
              key={item.src}
              className={`absolute inset-x-0 flex items-baseline justify-between gap-3 transition-opacity duration-500 ease-out ${
                ready && active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="font-semibold text-[#071428]">{item.place}</span>
              <span className="text-right text-muted">{item.caption}</span>
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
}
