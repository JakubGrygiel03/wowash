const facts = [
  "Darmowa wycena ze zdjęć",
  "Konin + 50 km",
  "Całe województwo wielkopolskie",
  "Kostka, elewacja, taras, ogrodzenie",
  "Malowanie elewacji",
] as const;

export function ContactStrip() {
  // Enough copies so one group is always wider than the viewport — no blank gap on loop
  const group = [...facts, ...facts, ...facts];

  return (
    <div className="hidden overflow-hidden border-b border-white/10 bg-[#071428] md:block">
      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          <p className="ticker-group">
            {group.map((fact, index) => (
              <span key={`a-${fact}-${index}`} className="ticker-item">
                {fact}
              </span>
            ))}
          </p>
          <p className="ticker-group">
            {group.map((fact, index) => (
              <span key={`b-${fact}-${index}`} className="ticker-item">
                {fact}
              </span>
            ))}
          </p>
        </div>
      </div>
      <p className="sr-only">{facts.join(". ")}.</p>
    </div>
  );
}
