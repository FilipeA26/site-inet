import { Instagram, Facebook, Phone, Globe, MessageCircle } from "lucide-react";
import { PHONE, waLink } from "../lib";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-white/10 bg-navy">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3">
        <div>
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/65">Internet Fibra Óptica. Velocidade, estabilidade e atendimento local em Minas Gerais.</p>
        </div>
        <div>
          <p className="font-display text-lg font-bold">Links rápidos</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[["Planos", "#planos"], ["Vantagens", "#vantagens"], ["Cobertura", "#cobertura"], ["Como funciona", "#fibra"]].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="hover:text-lime">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold">Contato</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone size={16} className="text-lime" /> <a href="tel:+553335363939">{PHONE}</a></li>
            <li className="flex items-center gap-2"><MessageCircle size={16} className="text-lime" /> <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li className="flex items-center gap-2"><Globe size={16} className="text-lime" /> inetminas.com.br</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/inetminas" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-lime hover:text-lime"><Instagram size={18} /></a>
            <a href="https://facebook.com/inetminas" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-lime hover:text-lime"><Facebook size={18} /></a>
            <span className="self-center text-sm font-semibold">@inetminas</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">© {new Date().getFullYear()} INET – Internet Fibra Óptica</div>
    </footer>
  );
}
