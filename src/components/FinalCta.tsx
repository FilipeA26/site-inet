import { MessageCircle } from "lucide-react";
import Orbit from "./Orbit";
import Reveal from "./Reveal";
import { waLink } from "../lib";

export default function FinalCta() {
  return (
    <section className="bg-navy-deep px-4 pb-28">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy via-royal to-electric px-8 py-20 text-center sm:px-16">
          <Orbit className="pointer-events-none absolute -left-20 -top-10 w-[520px] opacity-50" />
          <Orbit className="pointer-events-none absolute -bottom-16 -right-24 w-[480px] rotate-180 opacity-40" />
          <h2 className="relative mx-auto max-w-3xl text-4xl font-extrabold italic leading-tight sm:text-6xl">
            Pronto para navegar na velocidade da luz?
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-white/80">Fale agora com a INET e agende sua instalação.</p>
          <a href={waLink("Olá! Quero contratar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="btn-primary relative mt-10">
            <MessageCircle size={18} /> Falar no WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
