"use client";

import { useEffect, useRef, useState } from "react";
import { ThemePicker } from "./theme-picker";

const formulas = [
  { id: "vitalis", number: "01", name: "VITALIS", verb: "DESPERTE", statement: "Energia que nasce da raiz.", ingredients: "Guaraná · Ginseng · Cúrcuma", color: "#baff39" },
  { id: "sereno", number: "02", name: "SERENO", verb: "RESPIRE", statement: "Calma que encontra espaço.", ingredients: "Passiflora · Melissa · Camomila", color: "#ff7657" },
  { id: "flora", number: "03", name: "FLORA", verb: "RESTAURE", statement: "Equilíbrio que volta a florescer.", ingredients: "Funcho · Gengibre · Hortelã", color: "#bba8ff" },
] as const;

function Mark() {
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 36C20 23 25 14 34 5M20 36C20 24 14 16 5 11"/><path d="M33 6c-7 0-11 4-13 11 8 0 12-4 13-11ZM6 12c7 0 11 4 13 11-8 0-12-4-13-11Z"/></svg>;
}

function Bottle({ name }: { name: string }) {
  return <div className="scroll-bottle" aria-hidden="true"><div className="bottle-shadow"/><div className="bottle-cap"/><div className="bottle-glass"><div className="bottle-shine"/><div className="bottle-label"><small>HERBAL SAINT®</small><strong>{name}</strong><span>BOTANICAL FORMULA</span></div></div><i className="bottle-orbit"/><i className="bottle-orbit orbit-b"/></div>;
}

function Atmosphere({ progress }: { progress: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0, height = 0, frame = 0;
    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const seeds = Array.from({ length: 64 }, (_, index) => ({ angle: index * 2.399, distance: 70 + index % 16 * 28, size: 1 + index % 3 }));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ponytail: Canvas 2D is enough for a responsive organic field; use WebGL only when real 3D assets exist.
    const resize = () => { const ratio = Math.min(devicePixelRatio, 2); width = canvas.clientWidth; height = canvas.clientHeight; canvas.width = width * ratio; canvas.height = height * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const ink = getComputedStyle(document.documentElement).getPropertyValue("--field").trim();
      const cx = width / 2 + (pointer.x - width / 2) * .04, cy = height / 2 + (pointer.y - height / 2) * .04;
      context.strokeStyle = ink; context.fillStyle = ink;
      seeds.forEach((seed, index) => {
        const angle = seed.angle + time * .000025 + progress.current * Math.PI * 3;
        const distance = seed.distance + Math.sin(time * .0004 + index) * 18;
        const x = cx + Math.cos(angle) * distance, y = cy + Math.sin(angle) * distance * .58;
        context.globalAlpha = .04 + index % 5 * .025;
        context.beginPath(); context.moveTo(cx, cy); context.quadraticCurveTo(cx + Math.sin(angle) * 130, cy - Math.cos(angle) * 90, x, y); context.stroke();
        context.globalAlpha = .2; context.beginPath(); context.arc(x, y, seed.size, 0, Math.PI * 2); context.fill();
      });
      context.globalAlpha = 1;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize(); draw(); addEventListener("resize", resize); addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, [progress]);
  return <canvas ref={canvasRef} className="atmosphere" aria-hidden="true"/>;
}

export function ScrollExperience() {
  const progress = useRef(0);
  const [chapter, setChapter] = useState("origin");

  useEffect(() => {
    let scheduled = false;
    const update = () => {
      progress.current = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      document.documentElement.style.setProperty("--page-progress", String(progress.current));
      let closest = { distance: Infinity, chapter: "origin" };
      document.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const local = Math.max(0, Math.min(1, (innerHeight - rect.top) / (rect.height + innerHeight)));
        const peak = Math.sin(local * Math.PI);
        scene.style.setProperty("--scene-progress", String(local));
        scene.style.setProperty("--scene-opacity", String(Math.min(1, peak * 2.2)));
        scene.style.setProperty("--scene-y", `${(0.5 - local) * innerHeight * .55}px`);
        scene.style.setProperty("--scene-x", `${(0.5 - local) * innerWidth * .22}px`);
        scene.style.setProperty("--scene-scale", String(.72 + peak * .34));
        scene.style.setProperty("--scene-rotate", `${(0.5 - local) * 34}deg`);
        const distance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
        if (distance < closest.distance) closest = { distance, chapter: scene.dataset.chapter ?? "origin" };
      });
      setChapter(closest.chapter); scheduled = false;
    };
    const scroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update(); addEventListener("scroll", scroll, { passive: true }); addEventListener("resize", update);
    return () => { removeEventListener("scroll", scroll); removeEventListener("resize", update); };
  }, []);

  return (
    <main className="scroll-site" data-chapter={chapter}>
      <Atmosphere progress={progress}/><div className="grain" aria-hidden="true"/>
      <header className="scroll-nav">
        <a className="scroll-brand" href="#origin"><Mark/><span>HERBAL<br/>SAINT</span></a>
        <span className="chapter-readout">NOW ENTERING<br/><b>{chapter.toUpperCase()}</b></span>
        <ThemePicker/>
        <a className="nav-contact" href="#contact">CONTACT <i>↗</i></a>
      </header>
      <aside className="progress-rail" aria-hidden="true"><span>00</span><i/><span>04</span></aside>

      <section className="scroll-scene origin-scene" id="origin" data-scene data-chapter="origin">
        <div className="sticky-frame">
          <p className="scene-code">[ SCROLL TO AWAKEN ]</p>
          <h1><span>PLANTS</span><em>REMEMBER</em><span>WHAT WE FORGOT.</span></h1>
          <div className="origin-bottle"><Bottle name="VITALIS"/></div>
          <p className="origin-note">A botanical scroll experience<br/>by Herbal Saint®</p>
          <div className="scroll-prompt"><i>↓</i><span>BEGIN THE DESCENT</span></div>
        </div>
      </section>

      <section className="scroll-scene belief-scene" data-scene data-chapter="belief">
        <div className="sticky-frame">
          <p className="scene-code">[ 00 / THE BELIEF ]</p>
          <div className="belief-copy"><p>Nature is not<br/>an aesthetic.</p><p>It is the oldest<br/><em>technology.</em></p></div>
          <div className="cell"><span/><span/><span/><b>BOTANICAL<br/>INTELLIGENCE</b></div>
        </div>
      </section>

      {formulas.map((formula) => (
        <section className={`scroll-scene formula-chapter ${formula.id}`} id={formula.id} data-scene data-chapter={formula.id} key={formula.id} style={{ "--formula": formula.color } as React.CSSProperties}>
          <div className="sticky-frame">
            <div className="formula-wash"/>
            <p className="scene-code">[ FORMULA / {formula.number} ]</p>
            <div className="formula-title"><span>{formula.verb}</span><h2>{formula.name}</h2></div>
            <div className="chapter-bottle"><Bottle name={formula.name}/></div>
            <div className="chapter-copy"><strong>{formula.statement}</strong><p>{formula.ingredients}</p><p>Uma frequência botânica criada para acompanhar o seu ritmo natural.</p><a href="mailto:contato@herbalsaint.com.br">DISCOVER FORMULA <i>↗</i></a></div>
            <div className="chapter-number">{formula.number}</div>
          </div>
        </section>
      ))}

      <section className="scroll-scene finale" id="contact" data-scene data-chapter="ritual">
        <div className="sticky-frame">
          <p className="scene-code">[ THE RITUAL STARTS HERE ]</p>
          <h2>FEEL<br/><em>ALIVE.</em></h2>
          <a href="mailto:contato@herbalsaint.com.br"><span>COMEÇAR UMA CONVERSA</span><i>↗</i></a>
          <footer><span>HERBAL SAINT®</span><span>FEITO NO BRASIL</span><span>CONTEÚDO NÃO SUBSTITUI ORIENTAÇÃO PROFISSIONAL</span><span>© {new Date().getFullYear()}</span></footer>
        </div>
      </section>
    </main>
  );
}
