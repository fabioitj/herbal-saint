"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ThemePicker } from "./theme-picker";
import { useBotanicalJourney } from "./use-botanical-journey";

const formulas = [
  {
    id: "vitalis", number: "01", name: "Vitalis", verb: "desperte", moment: "Para começar", time: "O primeiro respiro do dia",
    title: <>Um novo dia.<br /><em>Um novo ritmo.</em></>,
    description: "Abra as janelas. Sinta a luz. Um encontro com as plantas para acompanhar os seus começos.",
    ingredients: ["Guaraná", "Ginseng", "Cúrcuma"], botanical: "Paullinia cupana", color: "#a37a3d", wash: "#e6dfca", leaf: "#7d8350",
    ritual: "Antes de entrar no ritmo do mundo, encontre o seu. Abra a janela e reserve um momento só para você.",
  },
  {
    id: "sereno", number: "02", name: "Sereno", verb: "respire", moment: "Para desacelerar", time: "Uma pausa no meio de tudo",
    title: <>Menos pressa.<br /><em>Mais presença.</em></>,
    description: "Entre um compromisso e outro, existe um espaço que é seu. Habite essa pausa com delicadeza.",
    ingredients: ["Passiflora", "Melissa", "Camomila"], botanical: "Matricaria chamomilla", color: "#6e795c", wash: "#dce0d1", leaf: "#647c5b",
    ritual: "Solte os ombros. Afaste a tela por um instante. Inspire devagar e perceba o que está à sua volta.",
  },
  {
    id: "flora", number: "03", name: "Flora", verb: "floresça", moment: "Para reconectar", time: "O cuidado que volta para você",
    title: <>Volte ao simples.<br /><em>Volte a você.</em></>,
    description: "Cuidar também é escutar. Pequenos gestos, repetidos com intenção, abrem espaço para o seu ritmo natural.",
    ingredients: ["Funcho", "Gengibre", "Hortelã"], botanical: "Mentha spicata", color: "#97634d", wash: "#eadbcf", leaf: "#6c7d60",
    ritual: "Prepare um lugar confortável. Deixe o dia lá fora por um momento e faça algo simples que você ama.",
  },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.3" /></svg>;
}

function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 48" fill="none" aria-hidden="true"><path d="M20 45V19M20 33C8 33 4 24 5 17c11 0 15 7 15 16Zm0-10C31 23 36 13 34 5c-11 2-14 10-14 18ZM20 42C9 42 7 36 7 31m13 6c10 0 14-6 14-13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="m20 23 10-12M20 33 9 22" stroke="currentColor" strokeWidth=".7" /></svg>;
}

// A botanical engraving whose stem is drawn as its chapter enters.
function BotanicalSprig({ className = "", flowering = false }: { className?: string; flowering?: boolean }) {
  const leaves = [
    { x: 137, y: 342, r: -65, s: 1.1 }, { x: 145, y: 305, r: 45, s: 1.2 },
    { x: 151, y: 270, r: -60, s: 1.05 }, { x: 156, y: 233, r: 48, s: 1.1 },
    { x: 166, y: 194, r: -48, s: .9 }, { x: 171, y: 158, r: 42, s: .9 },
    { x: 181, y: 120, r: -37, s: .8 }, { x: 185, y: 88, r: 30, s: .66 },
  ];
  return <svg className={`botanical-sprig ${className}`} viewBox="0 0 320 430" fill="none" aria-hidden="true">
    <path className="botanical-stem" pathLength="1" d="M112 422c34-63 28-112 45-198S178 106 204 30" />
    {leaves.map((leaf, index) => <g key={index} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
      <path className="botanical-leaf" d="M0 0C-39-17-46-64-15-104 21-76 29-29 0 0Z" />
      <path d="M0 0c-3-26-6-61-15-104M-4-23l-20-14m19 3 15-20M-8-47l-23-17m20 5 14-18M-12-74l-15-12" />
    </g>)}
    {flowering && [[75, 100], [246, 169], [87, 231]].map(([x, y], index) => <g key={index} transform={`translate(${x} ${y})`}>
      <path d={`M0 0Q${index % 2 ? -30 : 65} 70 ${160 - x} ${320 - y}`} />
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx="0" cy="-17" rx="6" ry="15" transform={`rotate(${i * 40})`} className="botanical-petal" />)}
      <circle r="10" className="botanical-center" />
    </g>)}
  </svg>;
}

function Bottle({ formula }: { formula: typeof formulas[number] }) {
  return <div className="apothecary-bottle" aria-hidden="true">
    <div className="bottle-ground" /><div className="bottle-neck" /><div className="bottle-cap"><span /></div>
    <div className="bottle-glass"><div className="bottle-label">
      <span className="bottle-brand">HERBAL SAINT</span><Mark />
      <span className="bottle-formula">{formula.name}</span><span className="bottle-rule" />
      <span className="bottle-label-note">FÓRMULA BOTÂNICA</span>
      <span className="bottle-label-ingredients">{formula.ingredients.join(" · ")}</span>
      <span className="bottle-edition">Nº {formula.number} <span>ORIGEM NATURAL</span></span>
    </div></div>
  </div>;
}

const beliefWords = "A gente acredita que o cuidado floresce quando você se aproxima da natureza.".split(" ");

export function ScrollExperience() {
  const root = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useBotanicalJourney(root);
  const [ritual, setRitual] = useState(1);

  useEffect(() => {
    if (!menuOpen) return;
    root.current?.querySelector<HTMLAnchorElement>(".main-navigation a")?.focus();
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    const desktop = matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    addEventListener("keydown", dismiss);
    desktop.addEventListener("change", closeOnDesktop);
    return () => { removeEventListener("keydown", dismiss); desktop.removeEventListener("change", closeOnDesktop); };
  }, [menuOpen]);

  const selection = formulas[ritual];
  return <main className="botanical-site" ref={root} data-section={activeSection}>
    <a href="#essencia" className="skip-link">Pular para o conteúdo</a>
    <div className="paper-grain" aria-hidden="true" />
    <header className="site-header" onBlur={(event) => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }}>
      <a className="brand" href="#origin" aria-label="Herbal Saint — início" onClick={() => setMenuOpen(false)}><Mark /><span>herbal saint<span className="brand-period">®</span></span></a>
      <nav className={`main-navigation ${menuOpen ? "is-open" : ""}`} id="main-navigation" aria-label="Navegação principal">
        <a href="#essencia" aria-current={activeSection === "essencia" ? "location" : undefined} onClick={() => setMenuOpen(false)}>Nossa essência</a>
        <a href="#formulas" aria-current={activeSection === "formulas" ? "location" : undefined} onClick={() => setMenuOpen(false)}>As fórmulas</a>
        <a href="#ritual" aria-current={activeSection === "ritual" ? "location" : undefined} onClick={() => setMenuOpen(false)}>Seu ritual</a>
      </nav>
      <a className="header-contact" href="#contact">Vamos conversar <Arrow diagonal /></a>
      <button className="menu-toggle" ref={menuButton} type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <div className="reading-progress" aria-hidden="true" />
    </header>
    <div className="journey"><div className="journey-stage">
    <section className="hero story-scene" id="origin" data-motion data-chapter="origin" aria-labelledby="hero-heading">
      <div className="hero-frame pinned-frame">
        <div className="hero-copy">
          <p className="eyebrow"><span className="tiny-leaf">✳</span> BOTÂNICA PARA A VIDA REAL</p>
          <h1 id="hero-heading">A natureza<br />tem seu<br /><em>próprio ritmo.</em></h1>
          <p className="hero-description">E você também.<br />Redescubra o cuidado que começa na raiz.</p>
          <a className="round-link" href="#ritual"><span>Encontre seu ritual</span><span className="arrow-circle"><Arrow diagonal /></span></a>
        </div>
        <div className="hero-visual">
          <div className="hero-image"><Image src="/images/hero-apothecary.webp" alt="Frasco de vidro âmbar Herbal Saint entre folhas frescas e flores de camomila sobre pedra natural" fill sizes="(max-width: 760px) 100vw, 55vw" preload /></div>
          <div className="image-caption"><span>DA TERRA. COM INTENÇÃO.</span><span>Fig. 01 — A origem</span></div>
          <div className="herbal-stamp" aria-hidden="true"><span>FEITO DE NATUREZA</span><Mark /><span>FEITO PARA VOCÊ</span></div>
        </div>
        <div className="hero-bottom"><a href="#essencia"><span className="scroll-line" /> DESACELERE. EXPLORE.</a><span>Um pequeno retorno ao essencial.</span><span className="hero-index">01 — 05</span></div>
      </div>
    </section>
    <section className="belief story-scene" id="essencia" data-motion data-chapter="essencia" aria-labelledby="belief-heading">
      <div className="belief-frame pinned-frame">
        <p className="eyebrow section-label"><span>01 / NOSSA ESSÊNCIA</span><span>O simples tem raízes profundas.</span></p>
        <div className="belief-content"><Mark className="belief-mark" /><h2 id="belief-heading" aria-label={beliefWords.join(" ")}>{beliefWords.map((word, index) => <span key={index} data-word aria-hidden="true" style={{ "--word-index": index } as CSSProperties} className={index >= 10 ? "belief-emphasis" : ""}>{word}{" "}</span>)}</h2></div>
        <div className="belief-note"><span className="small-cross">+</span><p>Não precisa ser complicado.<br />Só precisa fazer sentido para você.</p><p>Plantas, tempo e intenção.<br />É desse encontro que nasce a Herbal Saint.</p></div>
      </div>
    </section>
    <section className="garden story-scene" id="jardim" data-motion data-chapter="essencia" aria-labelledby="garden-heading">
      <div className="garden-frame pinned-frame">
        <Image className="garden-photo" src="/images/herb-garden.webp" alt="Jardim de ervas verdes e camomilas brancas sob a luz suave do sol" fill sizes="100vw" />
        <div className="garden-shade" /><p className="eyebrow">UM CONVITE PARA SENTIR</p>
        <h2 id="garden-heading">Mais perto<br />da <em>terra.</em><br /><span>Mais perto de você.</span></h2>
        <div className="garden-bottom"><p>O tempo de uma folha crescer.<br />O espaço de uma respiração.</p><span className="garden-caption">NATUREZA EM SEU ESTADO MAIS SINCERO <span>↘</span></span></div>
      </div>
    </section>
    <section className="formula-intro" id="formulas" data-motion data-chapter="formulas" aria-labelledby="formulas-heading">
      <p className="eyebrow">02 / NOSSO HERBÁRIO</p>
      <div><h2 id="formulas-heading">Cada planta, uma história.<br /><em>Cada momento, um cuidado.</em></h2><p>Três encontros com a natureza.<br />Descubra qual conversa com o seu agora.</p></div>
      <nav className="formula-index" aria-label="Escolher uma fórmula">{formulas.map(formula => <a href={`#${formula.id}`} key={formula.id}><span>{formula.number}</span>{formula.name}<Arrow diagonal /></a>)}</nav>
    </section>
    {formulas.map((formula, index) => <section className={`formula-scene story-scene ${formula.id}`} id={formula.id} data-motion data-chapter="formulas" key={formula.id} aria-labelledby={`${formula.id}-heading`} style={{ "--accent": formula.color, "--wash": formula.wash, "--leaf": formula.leaf } as CSSProperties}>
      <div className="formula-frame pinned-frame">
        <div className="formula-topline eyebrow"><span>HERBÁRIO / Nº {formula.number}</span><span>{formula.time}</span><span>{formula.number} / 03</span></div>
        <span className="formula-watermark" aria-hidden="true">{formula.verb}</span>
        <div className="formula-story"><p className="eyebrow formula-moment">{formula.moment}</p><h3 id={`${formula.id}-heading`}>{formula.title}</h3><p className="formula-description">{formula.description}</p><a className="text-link" href={`mailto:contato@herbalsaint.com.br?subject=${encodeURIComponent(`Quero conhecer a fórmula ${formula.name}`)}`}>Conheça {formula.name} <Arrow diagonal /></a></div>
        <div className="specimen-stage"><BotanicalSprig flowering={formula.id === "sereno"} /><div className="specimen-bottle"><Bottle formula={formula} /></div><span className="specimen-annotation"><span />{formula.botanical}</span></div>
        <div className="formula-bottom"><span className="formula-name">{formula.name}<sup>®</sup></span><div className="ingredient-list"><span className="eyebrow">AS PLANTAS DESTE ENCONTRO</span><p>{formula.ingredients.map(ingredient => <span key={ingredient}>{ingredient}</span>)}</p></div><a className="next-formula" href={index === formulas.length - 1 ? "#ritual" : `#${formulas[index + 1].id}`} aria-label={index === formulas.length - 1 ? "Encontre seu ritual" : "Próxima fórmula"}><Arrow /></a></div>
      </div>
    </section>)}
    <section className="ritual-section" id="ritual" data-motion data-chapter="ritual" aria-labelledby="ritual-heading">
      <div className="ritual-heading"><p className="eyebrow">03 / UM MOMENTO SEU</p><h2 id="ritual-heading">Do que o seu<br /><em>agora precisa?</em></h2><p>Não existe um único jeito de se cuidar.<br />Comece por escutar você.</p><BotanicalSprig className="ritual-sprig" flowering /></div>
      <div className="ritual-selector"><div className="ritual-options" role="group" aria-label="Escolha o seu momento">{formulas.map((formula, index) => <button key={formula.id} type="button" aria-pressed={ritual === index} onClick={() => setRitual(index)}><span>{formula.number}</span><span>{formula.moment.replace("Para ", "")}</span><Arrow diagonal /></button>)}</div><div className="ritual-result" aria-live="polite" aria-atomic="true"><p className="eyebrow">SEU CONVITE DE HOJE</p><h3>{selection.name}<span>{selection.ingredients.join(" · ")}</span></h3><p>{selection.ritual}</p><a className="text-link" href={`#${selection.id}`}>Explore esse encontro <Arrow diagonal /></a></div></div>
    </section>
    <footer className="site-footer" id="contact" data-motion data-chapter="contact">
      <div className="footer-top"><p className="eyebrow">04 / CULTIVE ESSA CONEXÃO</p><span>Sem pressa. Estamos por aqui.</span></div>
      <div className="footer-invitation"><h2>O seu próximo<br />ritual começa<br /><em>com um olá.</em></h2><a href="mailto:contato@herbalsaint.com.br" className="contact-circle" aria-label="Enviar um e-mail para a Herbal Saint"><Arrow diagonal /><span>VAMOS CONVERSAR</span></a></div>
      <div className="footer-details"><a href="mailto:contato@herbalsaint.com.br">contato@herbalsaint.com.br <Arrow diagonal /></a><div className="footer-theme"><span>A LUZ DO SEU JARDIM</span><ThemePicker /></div><a href="#origin">Voltar às raízes ↑</a></div>
      <div className="footer-wordmark" aria-hidden="true">herbal saint<Mark /></div>
      <div className="footer-fineprint"><span>© {new Date().getFullYear()} HERBAL SAINT</span><span>FEITO NO BRASIL. COM INTENÇÃO.</span><p>Conteúdo informativo. Não substitui orientação profissional.</p></div>
    </footer>
    </div></div>
  </main>;
}
