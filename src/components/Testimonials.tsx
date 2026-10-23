import { Star } from "lucide-react";
import Reveal from "./Reveal";

// Depoimentos provisórios — substituir por avaliações reais de clientes
const items = [
  ["Mariana S.", "Home office", "Desde que mudei para a INET minhas reuniões nunca mais travaram. E quando precisei, o suporte resolveu no mesmo dia."],
  ["Carlos A.", "Gamer", "Ping baixo e estável o tempo todo. Fibra de verdade faz muita diferença nos jogos online."],
  ["Padaria Pão Nosso", "Empresa", "Maquininhas, câmeras e Wi-Fi para os clientes funcionando sem parar. Atendimento de quem é da cidade."],
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-navy-ink to-navy-deep py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Depoimentos</p>
          <h2 className="section-title mt-3">Quem tem INET recomenda.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map(([name, tag, text], i) => (
            <Reveal key={name} delay={i * 0.08}>
              <figure className="glass flex h-full flex-col rounded-3xl p-8">
                <div className="flex gap-1 text-lime">
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-white/80">“{text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/30 font-display font-bold">
                    {name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold">{name}</span>
                    <span className="text-sm text-white/50">{tag}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
