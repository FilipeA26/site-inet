import { useEffect, useRef } from "react";

type Fiber = {
  x0: number; // base x (fraction of width)
  x1: number; // tip x (fraction)
  y1: number; // tip y (fraction of height)
  bend: number; // control point offset
  z: number; // depth 0.25 (far) .. 1 (near)
  phase: number;
  speed: number;
  lit: number; // smoothed light intensity
};

type Pulse = { fiber: number; t: number; v: number };

const BLUE = [0, 98, 236];
const PALE = [140, 180, 255];
const LIME = [112, 224, 0];

const mix = (a: number[], b: number[], k: number) =>
  a.map((v, i) => Math.round(v + (b[i] - v) * k));

/**
 * Fibras ópticas acesas subindo da base. Uma luz segue o cursor (com atraso),
 * acende as fibras próximas e dispara pulsos de luz que percorrem os fios.
 */
export default function FiberCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, time = 0;

    const count = window.innerWidth < 768 ? 55 : 110;
    const fibers: Fiber[] = Array.from({ length: count }, () => {
      const z = 0.25 + Math.random() ** 1.6 * 0.75;
      const x0 = Math.random() * 1.2 - 0.1;
      return {
        x0,
        x1: x0 + (Math.random() - 0.5) * 0.35,
        y1: 0.08 + Math.random() * 0.55,
        bend: (Math.random() - 0.5) * 0.25,
        z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        lit: 0,
      };
    }).sort((a, b) => a.z - b.z);

    const pulses: Pulse[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const light = { x: 0, y: 0 };
    const trail: { x: number; y: number }[] = [];
    let lastMove = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      light.x = w * 0.6;
      light.y = h * 0.45;
    };

    // Ponto da curva (Bézier quadrática) no parâmetro t: 0 = base, 1 = ponta
    const point = (f: Fiber, t: number, sway: number) => {
      const bx = f.x0 * w, by = h + 20;
      const tx = f.x1 * w + sway, ty = f.y1 * h;
      const cx = (bx + tx) / 2 + f.bend * w + sway * 0.4, cy = (by + ty) / 2 + h * 0.1;
      const u = 1 - t;
      return { x: u * u * bx + 2 * u * t * cx + t * t * tx, y: u * u * by + 2 * u * t * cy + t * t * ty };
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = pointer.y > -50 && pointer.y < h + 50;
      lastMove = performance.now();
    };
    const onLeave = () => (pointer.active = false);

    const frame = (now: number) => {
      time = now / 1000;
      const idle = !pointer.active || now - lastMove > 4000;

      // Sem mouse (ou celular): a luz passeia sozinha numa curva de Lissajous
      const targetX = idle ? w * (0.5 + 0.35 * Math.sin(time * 0.35)) : pointer.x;
      const targetY = idle ? h * (0.45 + 0.2 * Math.sin(time * 0.53 + 1)) : pointer.y;
      light.x += (targetX - light.x) * 0.08;
      light.y += (targetY - light.y) * 0.08;
      trail.push({ x: light.x, y: light.y });
      if (trail.length > 28) trail.shift();

      ctx.clearRect(0, 0, w, h);

      // Rastro de luz que se dissipa
      ctx.globalCompositeOperation = "lighter";
      trail.forEach((p, i) => {
        const k = i / trail.length;
        const r = 60 + 140 * k;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(112,224,0,${0.035 * k})`);
        g.addColorStop(0.5, `rgba(0,98,236,${0.03 * k})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      });

      const radius = Math.max(160, Math.min(w, h) * 0.28);

      fibers.forEach((f, idx) => {
        const sway = Math.sin(time * f.speed + f.phase) * 14 * f.z;
        // Intensidade: quão perto a luz está de algum ponto do fio
        let best = 0;
        for (let s = 0.35; s <= 1.001; s += 0.13) {
          const p = point(f, s, sway);
          const d2 = (p.x - light.x) ** 2 + (p.y - light.y) ** 2;
          best = Math.max(best, Math.exp(-d2 / (radius * radius)));
        }
        f.lit += (best - f.lit) * 0.12;

        if (!reduce && f.lit > 0.45 && Math.random() < 0.02 * f.lit && pulses.length < 40)
          pulses.push({ fiber: idx, t: 0, v: 0.006 + Math.random() * 0.01 });

        const lit = f.lit;
        const tip = point(f, 1, sway);
        const base = point(f, 0, sway);
        const col = mix(mix(BLUE, PALE, 0.35 * f.z), LIME, Math.min(1, lit * 1.1));
        const alpha = (0.12 + 0.45 * f.z) * (0.55 + 0.9 * lit);

        const grad = ctx.createLinearGradient(base.x, base.y, tip.x, tip.y);
        grad.addColorStop(0, `rgba(${col},0)`);
        grad.addColorStop(0.55, `rgba(${col},${alpha * 0.55})`);
        grad.addColorStop(1, `rgba(${col},${Math.min(1, alpha)})`);

        ctx.beginPath();
        for (let s = 0; s <= 1.001; s += 0.05) {
          const p = point(f, s, sway);
          s === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = grad;
        // fios do fundo ficam largos e fracos (efeito desfocado)
        ctx.lineWidth = f.z < 0.45 ? 5 + (0.45 - f.z) * 20 : 0.6 + f.z * 1.4;
        if (f.z < 0.45) ctx.globalAlpha = 0.18;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Ponta brilhante
        const tr = (f.z < 0.45 ? 6 : 2 + f.z * 2.5) * (1 + lit * 1.4);
        const tg = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, tr * 4);
        const tc = mix([220, 235, 255], LIME, lit);
        tg.addColorStop(0, `rgba(255,255,255,${0.5 * f.z + 0.5 * lit})`);
        tg.addColorStop(0.25, `rgba(${tc},${0.35 * f.z + 0.5 * lit})`);
        tg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = tg;
        ctx.fillRect(tip.x - tr * 4, tip.y - tr * 4, tr * 8, tr * 8);
      });

      // Pulsos de luz percorrendo as fibras
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.v;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }
        const f = fibers[p.fiber];
        const sway = Math.sin(time * f.speed + f.phase) * 14 * f.z;
        const q = point(f, p.t, sway);
        const r = 10 + 10 * f.z;
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, r);
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(0.3, "rgba(112,224,0,0.6)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(q.x - r, q.y - r, r * 2, r * 2);
      }

      // Núcleo da luz do cursor
      const core = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 90);
      core.addColorStop(0, "rgba(180,255,120,0.22)");
      core.addColorStop(0.4, "rgba(0,98,236,0.08)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.fillRect(light.x - 90, light.y - 90, 180, 180);
      ctx.globalCompositeOperation = "source-over";

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
