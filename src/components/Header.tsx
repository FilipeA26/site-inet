import { useEffect, useState } from "react";
import { Menu, X, UserRound } from "lucide-react";
import { waLink } from "../lib";

const links = [
  ["Planos", "#planos"],
  ["Vantagens", "#vantagens"],
  ["Cobertura", "#cobertura"],
  ["A fibra", "#fibra"],
  ["Contato", "#contato"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-navy-deep/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#inicio" aria-label="INET – início">
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-10 w-auto sm:h-11" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-white/75 transition hover:text-lime">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#" className="inline-flex items-center gap-2 px-3 text-sm font-medium text-white/75 hover:text-white">
            <UserRound size={16} /> Área do cliente
          </a>
          <a href={waLink("Olá! Quero assinar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="btn-primary py-2.5 text-sm">
            Assine já
          </a>
        </div>

        <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="container-x flex flex-col gap-1 pb-6 lg:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-white/85 hover:bg-white/5">
              {label}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary mt-3">
            Assine já
          </a>
        </nav>
      )}
    </header>
  );
}
