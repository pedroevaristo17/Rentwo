import { useEffect, useMemo, useState } from "react";

export default function PhotoCarousel({ photos = [], alt = "foto" }) {
  const safePhotos = useMemo(() => (Array.isArray(photos) ? photos : []), [photos]);
  const [index, setIndex] = useState(0);

  // quando muda o perfil (lista de fotos), volta pra primeira
  useEffect(() => {
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePhotos.join("|")]);

  if (safePhotos.length === 0) {
    return (
      <div className="relative w-full h-full bg-slate-200 overflow-hidden grid place-items-center">
        <span className="text-slate-500 text-sm">Sem fotos</span>
      </div>
    );
  }

  function prev() {
    setIndex((i) => (i <= 0 ? safePhotos.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i >= safePhotos.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative w-full h-full bg-slate-200 overflow-hidden">
      {/* imagem */}
      <img
        src={safePhotos[index]}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* barrinhas */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 px-4 z-10">
        {safePhotos.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* clique esquerda/direita */}
      <button
        type="button"
        onClick={prev}
        aria-label="foto anterior"
        className="absolute inset-y-0 left-0 w-1/2 bg-transparent"
      />
      <button
        type="button"
        onClick={next}
        aria-label="próxima foto"
        className="absolute inset-y-0 right-0 w-1/2 bg-transparent"
      />

      {/* gradiente pra contraste do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>
  );
}