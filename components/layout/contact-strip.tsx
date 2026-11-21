const facts = [
  "Darmowa wycena ze zdjęć",
  "Konin + 50 km",
  "Całe województwo wielkopolskie",
  "Kostka, elewacja, taras, ogrodzenie",
  "Malowanie elewacji",
] as const;

export function ContactStrip() {
  const loop = [...facts, ...facts];

  return (
    <div className="hidden overflow-hidden border-b border-line bg-[#f4f7fb] md:block">
      <div className="ticker" aria-hidden>
        <p className="ticker-track">
          {loop.map((fact, index) => (
            <span key={`${fact}-${index}`} className="ticker-item">
              {fact}
            </span>
          ))}
        </p>
      </div>
      <p className="sr-only">{facts.join(". ")}.</p>
    </div>
  );
}
