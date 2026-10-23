import { motion } from "framer-motion";
import { ArrowRight, Zap, Wifi, Headset } from "lucide-react";
import FiberCanvas from "./FiberCanvas";
import Orbit from "./Orbit";

const badges = [
  [Zap, "100% Fibra Óptica"],
  [Wifi, "Wi-Fi 6"],
  [Headset, "Suporte local 7 dias"],
] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#03256C_0%,#020F2E_45%,#010818_100%)]"
    >
      <FiberCanvas className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-ink to-transparent" />
      <Orbit className="pointer-events-none absolute -right-24 top-24 w-[560px] opacity-25 sm:opacity-40" />

      <div className="container-x pointer-events-none relative z-10 pb-16 pt-24">
        <motion.p {...rise(0)} className="eyebrow">
          Internet fibra óptica · Minas Gerais
        </motion.p>
        <motion.h1
          {...rise(0.1)}
          className="mt-5 max-w-4xl text-5xl font-extrabold italic leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
        >
          Internet de verdade é{" "}
          <span className="bg-gradient-to-r from-lime to-leaf bg-clip-text text-transparent">fibra</span> de ponta a ponta.
        </motion.h1>
        <motion.p {...rise(0.25)} className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl">
          Ultravelocidade, estabilidade e suporte local para a sua casa e a sua empresa.
        </motion.p>
        <motion.div {...rise(0.4)} className="pointer-events-auto mt-10 flex flex-wrap gap-4">
          <a href="#planos" className="btn-primary">
            Ver planos <ArrowRight size={18} />
          </a>
          <a href="#cobertura" className="btn-ghost">
            Consultar cobertura
          </a>
        </motion.div>
        <motion.ul {...rise(0.6)} className="mt-14 flex flex-wrap gap-3">
          {badges.map(([Icon, label]) => (
            <li key={label} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/85">
              <Icon size={16} className="text-lime" /> {label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
