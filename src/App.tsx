import { MessageCircle } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Features from "./components/Features";
import Coverage from "./components/Coverage";
import HowFiber from "./components/HowFiber";
import Testimonials from "./components/Testimonials";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import { waLink } from "./lib";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Plans />
        <Features />
        <Coverage />
        <HowFiber />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lime text-navy-ink shadow-[0_0_30px_rgba(112,224,0,0.5)] transition hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
}
