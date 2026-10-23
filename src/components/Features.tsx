import { Gauge, ShieldCheck, ArrowUpDown, Wifi, HeartHandshake, Timer } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  [Gauge, "Ultravelocidade", "Downloads, streaming 4K e jogos sem esperar."],
  [ShieldCheck, "Estabilidade", "Fibra não sofre com chuva nem interferência elétrica."],
  [ArrowUpDown, "Upload de verdade", "Ideal para home office, lives e backup na nuvem."],
  [Wifi, "Wi-Fi em toda casa", "Roteadores Wi-Fi 6 e opção mesh para cobrir tudo."],
  [HeartHandshake, "Suporte humanizado", "Atendimento local, de gente que conhece a sua cidade."],
  [Timer, "Instalação rápida", "Agendamos e instalamos em poucos dias."],
] as const;

export default function Features() {
  return (
    <section id="vantagens" className="relative overflow-hidden bg-gradient-to-b from-navy-ink to-navy-deep py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Vantagens</p>
          <h2 className="section-title mt-3">Por que a INET é diferente.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, title, text], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition duration-300 hover:border-lime/60 hover:shadow-[0_0_40px_-12px_rgba(112,224,0,0.6)]">
                {/* linha de fibra que acende no hover */}
                <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-lime to-transparent transition-all duration-700 group-hover:w-full" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-electric/15 text-lime transition group-hover:bg-lime group-hover:text-navy-ink">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-2 text-white/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
