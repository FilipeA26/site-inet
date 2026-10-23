import { Check } from "lucide-react";
import Reveal from "./Reveal";
import { waLink } from "../lib";

// Valores provisórios — trocar pelos planos reais da INET
const plans = [
  { speed: "300", unit: "Mega", price: "89,90", perks: ["Wi-Fi 6 incluso", "Instalação grátis", "Sem franquia"] },
  { speed: "500", unit: "Mega", price: "99,90", perks: ["Wi-Fi 6 incluso", "Instalação grátis", "Sem franquia", "Suporte prioritário"], featured: true },
  { speed: "700", unit: "Mega", price: "119,90", perks: ["Wi-Fi 6 mesh", "Instalação grátis", "Sem franquia", "Suporte prioritário"] },
  { speed: "1", unit: "Giga", price: "149,90", perks: ["Wi-Fi 6 mesh", "Instalação grátis", "Sem franquia", "Suporte VIP 24h"] },
];

export default function Plans() {
  return (
    <section id="planos" className="relative bg-navy-ink py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Planos</p>
          <h2 className="section-title mt-3">Escolha a velocidade da sua casa.</h2>
          <p className="mt-4 text-white/60">Todos os planos com 100% fibra óptica até o seu roteador.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.speed + p.unit} delay={i * 0.08}>
              <article
                className={`relative flex h-full flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${
                  p.featured
                    ? "border border-lime/70 bg-gradient-to-b from-royal/60 to-navy-deep shadow-[0_0_60px_-10px_rgba(112,224,0,0.45)]"
                    : "glass hover:border-electric/60"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 text-xs font-bold text-navy-ink">Mais vendido</span>
                )}
                <p className="font-display text-6xl font-extrabold italic leading-none">
                  {p.speed}
                  <span className="ml-1 text-2xl font-bold not-italic text-lime">{p.unit}</span>
                </p>
                <p className="mt-6 text-sm text-white/50">por apenas</p>
                <p className="font-display text-3xl font-bold">
                  R$ {p.price}
                  <span className="text-base font-normal text-white/50">/mês</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-white/80">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <Check size={16} className="text-lime" /> {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Olá! Quero assinar o plano de ${p.speed} ${p.unit} da INET.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 ${p.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  Assinar
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
