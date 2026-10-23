/** Arco verde da marca ("círculo oval crescente") usado como detalhe decorativo. */
export default function Orbit({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className} aria-hidden="true">
      <path
        d="M30 150 C 0 110, 40 60, 120 40 C 220 15, 360 30, 385 80 C 400 115, 360 140, 300 165"
        stroke="url(#orbit-g)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="orbit-g" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#70E000" stopOpacity="0" />
          <stop offset="0.3" stopColor="#70E000" />
          <stop offset="1" stopColor="#38B000" />
        </linearGradient>
      </defs>
    </svg>
  );
}
