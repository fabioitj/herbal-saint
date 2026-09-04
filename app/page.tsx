import { LivingField } from "./experience";
import { ThemePicker } from "./theme-picker";

const formulas = [
  { number: "01", name: "VITALIS", state: "Awaken", phrase: "Acenda o corpo.", detail: "Guaraná · Ginseng · Cúrcuma", className: "vitalis" },
  { number: "02", name: "SERENO", state: "Exhale", phrase: "Silencie o excesso.", detail: "Passiflora · Melissa · Camomila", className: "sereno" },
  { number: "03", name: "FLORA", state: "Restore", phrase: "Volte ao eixo.", detail: "Funcho · Gengibre · Hortelã", className: "flora" },
];

function Mark() {
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 36C20 23 25 14 34 5M20 36C20 24 14 16 5 11"/><path d="M33 6c-7 0-11 4-13 11 8 0 12-4 13-11ZM6 12c7 0 11 4 13 11-8 0-12-4-13-11Z"/></svg>;
}

function Capsule({ name }: { name: string }) {
  return (
    <div className="specimen" aria-hidden="true">
      <div className="specimen-shadow"/><div className="specimen-cap"/>
      <div className="specimen-glass"><div className="specimen-label"><small>HERBAL SAINT®</small><strong>{name}</strong><span>BOTANICAL FORMULA</span></div></div>
      <span className="orbit orbit-one"/><span className="orbit orbit-two"/>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <LivingField />
      <header className="floating-nav">
        <a className="wordmark" href="#top" aria-label="Herbal Saint, início"><Mark/><span>HERBAL<br/>SAINT</span></a>
        <p className="nav-coordinate">BOTANICAL LAB<br/>BRAZIL · 2026</p>
        <ThemePicker/>
        <a className="nav-contact" href="#contact">CONTACT <span>↗</span></a>
      </header>

      <section className="cinema-hero" id="top">
        <div className="hero-index">HS® / 001</div>
        <div className="hero-kicker"><span>Nature is not<br/>an aesthetic.</span><span>It is<br/>technology.</span></div>
        <h1><span>HERBAL</span><span>SAINT</span></h1>
        <div className="hero-object"><Capsule name="VITALIS"/></div>
        <p className="hero-statement">Fórmulas vivas para<br/>corpos em movimento.</p>
        <a className="scroll-cue" href="#manifesto"><span>SCROLL TO FEEL</span><i>↓</i></a>
      </section>

      <section className="signal-band" aria-label="Manifesto em movimento"><div>ROOTS / RITUAL / RESEARCH / ROOTS / RITUAL / RESEARCH /</div></section>

      <section className="manifesto-screen" id="manifesto">
        <div className="section-code">[ OUR BELIEF ]</div>
        <p>Não embalamos<br/><em>promessas.</em></p>
        <p>Extraímos inteligência<br/>do que já estava <em>vivo.</em></p>
        <div className="manifesto-foot"><span>BOTANICAL INTELLIGENCE</span><span>HUMAN RHYTHM</span><span>RADICAL CARE</span></div>
      </section>

      <section className="formula-intro" id="formulas">
        <p className="section-code">[ SELECT YOUR STATE ]</p>
        <h2>THREE FORMULAS.<br/><span>THREE FREQUENCIES.</span></h2>
      </section>


      {formulas.map((formula) => (
        <section className={`formula-scene ${formula.className}`} key={formula.name}>
          <div className="formula-number">{formula.number}</div><p className="formula-state">{formula.state}</p><h2>{formula.name}</h2>
          <Capsule name={formula.name}/>
          <div className="formula-copy"><strong>{formula.phrase}</strong><p>{formula.detail}</p><a href="#contact">EXPLORE FORMULA <span>↗</span></a></div>
          <div className="formula-line"/>
        </section>
      ))}

      <section className="origin">
        <div className="origin-orb"><span>SEED</span><span>SCIENCE</span><span>SELF</span></div>
        <div className="origin-copy"><p className="section-code">[ FROM ORIGIN TO YOU ]</p><h2>Plantas com origem.<br/>Ciência com intenção.<br/>Cuidado sem ruído.</h2><p>Ingredientes selecionados, fórmulas conscientes e respeito ao tempo de cada pessoa.</p></div>
      </section>

      <section className="contact-screen" id="contact">
        <p className="section-code">[ BEGIN YOUR RITUAL ]</p><h2>FEEL<br/><em>DIFFERENT.</em></h2>
        <a href="mailto:contato@herbalsaint.com.br">COMEÇAR UMA CONVERSA <span>↗</span></a>
        <footer><span>HERBAL SAINT®</span><span>FEITO NO BRASIL</span><span>ESTE CONTEÚDO NÃO SUBSTITUI ORIENTAÇÃO PROFISSIONAL</span><span>© {new Date().getFullYear()}</span></footer>
      </section>
    </main>
  );
}
