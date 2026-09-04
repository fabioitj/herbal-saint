"use client";

import { useEffect, useRef, useState } from "react";
import { ThemePicker } from "./theme-picker";

const formulas = [
  { id: "vitalis", number: "01", name: "VITALIS", state: "AWAKEN", note: "Acenda o corpo", ingredients: "Guaraná · Ginseng · Cúrcuma", color: "#baff39", x: 18, y: 28 },
  { id: "sereno", number: "02", name: "SERENO", state: "EXHALE", note: "Silencie o excesso", ingredients: "Passiflora · Melissa · Camomila", color: "#ff7657", x: 80, y: 33 },
  { id: "flora", number: "03", name: "FLORA", state: "RESTORE", note: "Volte ao seu eixo", ingredients: "Funcho · Gengibre · Hortelã", color: "#bba8ff", x: 72, y: 78 },
] as const;

type FormulaId = typeof formulas[number]["id"];

function Mark() {
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 36C20 23 25 14 34 5M20 36C20 24 14 16 5 11"/><path d="M33 6c-7 0-11 4-13 11 8 0 12-4 13-11ZM6 12c7 0 11 4 13 11-8 0-12-4-13-11Z"/></svg>;
}

function OrganicField({ entered, active }: { entered: boolean; active: FormulaId | null }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0, height = 0, frame = 0;
    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const particles = Array.from({ length: 72 }, (_, index) => ({
      angle: index * 2.399, radius: 60 + (index % 18) * 22, speed: .00004 + (index % 5) * .000009, size: 1 + index % 3,
    }));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ponytail: Canvas 2D keeps this dependency-free; move to WebGL only when real 3D assets are required.
    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const style = getComputedStyle(document.documentElement);
      const ink = style.getPropertyValue("--eco-line").trim();
      const cx = width / 2 + (pointer.x - width / 2) * .04;
      const cy = height / 2 + (pointer.y - height / 2) * .04;
      context.strokeStyle = ink; context.fillStyle = ink;
      particles.forEach((particle, index) => {
        const angle = particle.angle + time * particle.speed;
        const breathe = Math.sin(time * .0005 + index) * 12;
        const x = cx + Math.cos(angle) * (particle.radius + breathe);
        const y = cy + Math.sin(angle) * (particle.radius * .62 + breathe);
        context.globalAlpha = entered ? .1 + (index % 4) * .04 : .04;
        context.beginPath(); context.moveTo(cx, cy); context.quadraticCurveTo(cx + Math.sin(angle) * 80, cy - Math.cos(angle) * 50, x, y); context.stroke();
        context.globalAlpha = entered ? .25 + (index % 3) * .12 : .08;
        context.beginPath(); context.arc(x, y, particle.size, 0, Math.PI * 2); context.fill();
      });
      context.globalAlpha = 1;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize(); draw(); addEventListener("resize", resize); addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, [entered, active]);

  return <canvas ref={ref} className="organic-field" aria-hidden="true"/>;
}

export function Ecosystem() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<FormulaId | null>(null);
  const selected = formulas.find((formula) => formula.id === active);

  useEffect(() => {
    const syncLocation = () => {
      const destination = location.hash.slice(1);
      const formula = formulas.find((item) => item.id === destination);
      setEntered(destination === "explore" || Boolean(formula));
      setActive(formula?.id ?? null);
    };
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--rx", `${(event.clientX / innerWidth - .5) * 2}`);
      document.documentElement.style.setProperty("--ry", `${(event.clientY / innerHeight - .5) * 2}`);
    };
    syncLocation();
    addEventListener("pointermove", move);
    addEventListener("hashchange", syncLocation);
    return () => { removeEventListener("pointermove", move); removeEventListener("hashchange", syncLocation); };
  }, []);

  const navigate = (destination: "explore" | FormulaId) => {
    setEntered(true); setActive(destination === "explore" ? null : destination);
    history.replaceState(null, "", `#${destination}`);
  };

  return (
    <main className="ecosystem" data-entered={entered} data-active={active ?? "none"} style={{ "--active-color": selected?.color ?? "var(--acid)" } as React.CSSProperties}>
      <OrganicField entered={entered} active={active}/>
      <div className="grain" aria-hidden="true"/>

      <header className="eco-nav">
        <a className="eco-brand" href="#explore" onClick={(event) => { event.preventDefault(); navigate("explore"); }}><Mark/><span>HERBAL<br/>SAINT</span></a>
        <span className="eco-location">LIVING SYSTEM™<br/>BRAZIL / 2026</span>
        <ThemePicker/>
        <a className="eco-contact" href="mailto:contato@herbalsaint.com.br">CONTACT <i>↗</i></a>
      </header>

      <section className="entry" aria-hidden={entered}>
        <p>[ A BOTANICAL EXPERIENCE ]</p>
        <h1><span>ENTER</span><em>THE LIVING</em><span>SYSTEM</span></h1>
        <button type="button" onClick={() => navigate("explore")}><span>ENTER EXPERIENCE</span><i>↗</i></button>
        <small>MOVE YOUR CURSOR · USE SOUND IF YOU WISH</small>
      </section>

      <section className="world" aria-hidden={!entered}>
        <div className="world-label"><span>EXPLORE FREELY</span><span>SELECT A FREQUENCY</span></div>
        <svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 50 Q34 33 18 28 M50 50 Q65 28 80 33 M50 50 Q62 65 72 78"/>
          <circle cx="50" cy="50" r="22"/><circle cx="50" cy="50" r="35"/>
        </svg>

        <button className="core" type="button" onClick={() => navigate("explore")} aria-label="Voltar ao centro">
          <span className="core-shell"/><span className="core-inner"><Mark/></span><i>BOTANICAL<br/>INTELLIGENCE</i>
        </button>

        {formulas.map((formula) => (
          <button className={`portal portal-${formula.id}`} type="button" key={formula.id} onClick={() => navigate(formula.id)} aria-label={`Explorar ${formula.name}`} style={{ "--portal-color": formula.color, "--x": `${formula.x}%`, "--y": `${formula.y}%` } as React.CSSProperties}>
            <span className="portal-ring"><i/><b>{formula.number}</b></span>
            <span className="portal-copy"><small>{formula.state}</small><strong>{formula.name}</strong></span>
          </button>
        ))}

        <div className="coordinates" aria-hidden="true"><span>23°32&apos;S</span><span>046°37&apos;W</span><span>HS / ECOSYSTEM</span></div>
      </section>

      <aside className="formula-panel" aria-hidden={!selected}>
        {selected && <>
          <button className="panel-close" type="button" onClick={() => navigate("explore")} aria-label="Fechar fórmula">×</button>
          <p className="panel-code">[ FORMULA / {selected.number} ]</p>
          <div className="panel-specimen"><span/><i/><b>{selected.name}</b></div>
          <div className="panel-copy"><span>{selected.state}</span><h2>{selected.note}.</h2><p>{selected.ingredients}</p><p>Uma frequência botânica criada para acompanhar o seu ritmo natural.</p><a href="mailto:contato@herbalsaint.com.br">DESCOBRIR A FÓRMULA <i>↗</i></a></div>
        </>}
      </aside>

      <div className="eco-footer"><span>MOVE THROUGH AIR</span><span>01—03 FORMULAS</span><span>NO LINEAR PATH</span></div>
    </main>
  );
}
