import Reveal from "./Reveal";

const steps = [
  ["01", "Luz em vez de eletricidade", "Os dados viajam como pulsos de luz dentro de fios de vidro mais finos que um fio de cabelo."],
  ["02", "Sem perdas no caminho", "A luz não sofre interferência elétrica nem de clima, então o sinal chega inteiro."],
  ["03", "Até dentro da sua casa", "A INET leva a fibra até o seu roteador — sem trechos de cabo de cobre no meio."],
];

// Fibras penduradas (estilo "Hanging Fiber Optics"), geradas uma vez
const strands = Array.from({ length: 34 }, (_, i) => ({
  left: (i / 34) * 100 + Math.random() * 2,
  height: 30 + Math.random() * 55,
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 3,
  faint: Math.random() < 0.4,
}));

export default function HowFiber() {
  return (
    <section id="fibra" className="relative overflow-hidden bg-navy-ink pb-28 pt-0">
      <div className="pointer-events-none relative h-72 sm:h-96" aria-hidden="true">
        {strands.map((s, i) => (
          <span
            key={i}
            className="absolute top-0 w-px origin-top"
            style={{
              left: `${s.left}%`,
              height: `${s.height}%`,
              opacity: s.faint ? 0.35 : 1,
              background: "linear-gradient(to bottom, transparent, rgba(0,98,236,0.6) 60%, rgba(140,180,255,0.9))",
              animation: `sway ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          >
            <span
              className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white"
              style={{ boxShadow: "0 0 12px 3px rgba(112,224,0,0.8)", animation: `glow ${s.dur}s ease-in-out ${s.delay}s infinite alternate` }}
            />
          </span>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-ink to-transparent" />
      </div>

      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Como funciona</p>
          <h2 className="section-title mt-3">Sua internet viajando na velocidade da luz.</h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map(([n, title, text], i) => (
            <Reveal key={n} delay={i * 0.1}>
              <div className="border-l border-lime/40 pl-6">
                <p className="font-display text-5xl font-extrabold italic text-lime/90">{n}</p>
                <h3 className="mt-3 text-2xl font-bold">{title}</h3>
                <p className="mt-2 text-white/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
