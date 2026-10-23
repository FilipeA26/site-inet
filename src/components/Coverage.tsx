import { useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";
import Reveal from "./Reveal";
import { waLink } from "../lib";

// Pontos ilustrativos do mapa (coordenadas do SVG) — trocar pelas cidades reais atendidas
const nodes = [
  [80, 260], [190, 150], [300, 230], [260, 360], [420, 120], [470, 300], [380, 420], [560, 200],
];
const links = [[0, 1], [1, 2], [2, 3], [1, 4], [2, 5], [4, 7], [5, 7], [3, 6], [5, 6], [0, 3]];

export default function Coverage() {
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSent(true);
  };

  return (
    <section id="cobertura" className="relative overflow-hidden bg-navy-deep py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Cobertura</p>
          <h2 className="section-title mt-3">A fibra da INET já chega até você?</h2>
          <p className="mt-4 max-w-md text-white/60">Digite seu CEP ou cidade e descubra a disponibilidade no seu endereço.</p>

          <form onSubmit={submit} className="glass mt-8 flex max-w-md items-center gap-2 rounded-full p-2">
            <MapPin size={20} className="ml-3 shrink-0 text-lime" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSent(false);
              }}
              placeholder="CEP ou cidade"
              aria-label="CEP ou cidade"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-white placeholder:text-white/40 focus:outline-none"
            />
            <button type="submit" className="btn-primary px-5 py-2.5 text-sm">
              <Search size={16} /> Consultar
            </button>
          </form>

          {sent && (
            <p className="mt-5 max-w-md text-sm text-white/75">
              Recebemos sua consulta para <strong className="text-white">{query}</strong>. Fale com a nossa equipe para confirmar
              a viabilidade:{" "}
              <a className="font-semibold text-lime underline" target="_blank" rel="noreferrer" href={waLink(`Olá! Quero saber se a INET atende: ${query}`)}>
                chamar no WhatsApp
              </a>
            </p>
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,98,236,0.25),transparent_60%)]" />
            <svg viewBox="0 0 640 480" className="relative h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,0.05)" />
                </pattern>
              </defs>
              <rect width="640" height="480" fill="url(#grid)" />
              {links.map(([a, b], i) => {
                const [x1, y1] = nodes[a];
                const [x2, y2] = nodes[b];
                const d = `M${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 40} ${x2} ${y2}`;
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="rgba(0,98,236,0.5)" strokeWidth="1.5" />
                    <circle r="4" fill="#70E000" style={{ filter: "drop-shadow(0 0 6px #70E000)" }}>
                      <animateMotion dur={`${2.5 + (i % 4) * 0.7}s`} repeatCount="indefinite" path={d} begin={`${i * 0.3}s`} />
                    </circle>
                  </g>
                );
              })}
              {nodes.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="14" fill="rgba(112,224,0,0.12)">
                    <animate attributeName="r" values="8;20;8" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={y} r="5" fill="#fff" />
                </g>
              ))}
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
