import { ThemePicker } from "./theme-picker";

function Logo() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 35C20 22 26 14 34 7M20 35C20 23 14 17 6 12" />
      <path d="M32 8c-7 0-11 3-12 10 7 0 11-3 12-10ZM7 13c7 0 11 3 12 10-7 0-11-3-12-10Z" />
    </svg>
  );
}

function Bottle({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div className={className}>
      <div className="cap" />
      <div className="label"><small>HERBAL SAINT</small><strong>{name}</strong></div>
    </div>
  );
}

const formulas = [
  { name: "Vitalis", benefit: "Disposição", text: "Para dias que pedem presença, energia e movimento.", className: "card-vitalis" },
  { name: "Sereno", benefit: "Equilíbrio", text: "Para desacelerar o ruído e acolher o seu ritmo natural.", className: "card-sereno" },
  { name: "Flora", benefit: "Leveza", text: "Para cultivar leveza e equilíbrio todos os dias.", className: "card-flora" },
];

const questions = [
  ["O que são fitoterápicos?", "São produtos obtidos a partir de matérias-primas vegetais, desenvolvidos com critérios de qualidade, segurança e uso adequado."],
  ["Como escolher a fórmula ideal?", "Cada pessoa tem necessidades únicas. Converse com um profissional de saúde habilitado antes de iniciar qualquer suplementação."],
  ["Os produtos são naturais?", "Nossas propostas partem de ativos botânicos selecionados. Consulte sempre a composição completa no rótulo de cada produto."],
  ["Como devo consumir?", "Siga as orientações do rótulo e do profissional responsável. Não exceda a recomendação de uso."],
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Herbal Saint, início"><Logo /><span>Herbal Saint</span></a>
        <nav className="desktop-nav" aria-label="Navegação principal"><a href="#formulas">Fórmulas</a><a href="#essencia">Nossa essência</a><a href="#perguntas">Perguntas</a></nav>
        <div className="header-actions"><ThemePicker /><a className="button button-small" href="#contato">Falar conosco</a></div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Ciência, natureza e propósito</p>
            <h1>Bem-estar que<br />floresce de <em>dentro.</em></h1>
            <p className="hero-text">Fórmulas fitoterápicas cuidadosamente desenvolvidas para acompanhar o seu ritmo e nutrir uma vida mais equilibrada.</p>
            <div className="hero-actions"><a className="button" href="#formulas">Conheça nossas fórmulas <span aria-hidden="true">↗</span></a><a className="text-link" href="#essencia">Descubra nossa essência <span aria-hidden="true">↓</span></a></div>
            <ul className="trust-list" aria-label="Diferenciais"><li><span>✓</span> Ingredientes selecionados</li><li><span>✓</span> Fórmulas conscientes</li><li><span>✓</span> Feito no Brasil</li></ul>
          </div>

          <div className="hero-art reveal" aria-label="Frascos das fórmulas Herbal Saint">
            <div className="sun-disc" />
            <svg className="botanical botanical-left" viewBox="0 0 180 390" aria-hidden="true"><path d="M153 377C121 292 97 187 43 41"/><path d="M99 198C48 181 25 143 18 109 58 117 88 145 99 198ZM130 295c-36-5-63-28-79-61 41-1 68 18 79 61ZM66 103C70 62 91 34 124 15c3 40-16 72-58 88ZM113 242c8-42 34-70 67-83-3 39-23 67-67 83Z"/></svg>
            <svg className="botanical botanical-right" viewBox="0 0 180 390" aria-hidden="true"><path d="M27 377C59 292 83 187 137 41"/><path d="M81 198c51-17 74-55 81-89-40 8-70 36-81 89ZM50 295c36-5 63-28 79-61-41-1-68 18-79 61ZM114 103c-4-41-25-69-58-88-3 40 16 72 58 88ZM67 242c-8-42-34-70-67-83 3 39 23 67 67 83Z"/></svg>
            <div className="bottle bottle-back"><div className="cap"/><div className="label"><small>HERBAL SAINT</small><strong>SERENO</strong><span>calma & equilíbrio</span></div></div>
            <div className="bottle bottle-front"><div className="cap"/><div className="label"><small>HERBAL SAINT</small><strong>VITALIS</strong><span>energia & disposição</span><i>30 cápsulas</i></div></div>
            <div className="art-note"><span>01</span><p><strong>Botânicos de origem</strong> selecionada e rastreável</p></div>
          </div>
        </section>

        <section className="manifesto" id="essencia">
          <p className="eyebrow"><span /> Nossa essência</p>
          <p className="manifesto-text reveal">Acreditamos no encontro entre a <em>sabedoria das plantas</em> e o cuidado contemporâneo — para transformar pequenos hábitos em bem-estar duradouro.</p>
          <div className="values">
            <article><span>01</span><h3>Pureza na origem</h3><p>Ingredientes escolhidos por sua qualidade e procedência.</p></article>
            <article><span>02</span><h3>Ciência no processo</h3><p>Desenvolvimento responsável e atenção em cada detalhe.</p></article>
            <article><span>03</span><h3>Respeito no propósito</h3><p>À natureza, ao seu corpo e ao tempo de cada pessoa.</p></article>
          </div>
        </section>

        <section className="formulas" id="formulas">
          <div className="section-heading"><div><p className="eyebrow"><span /> Nossas fórmulas</p><h2>Um cuidado para<br /><em>cada momento.</em></h2></div><p>Combinações botânicas pensadas para integrar a sua rotina com simplicidade.</p></div>
          <div className="formula-grid">
            {formulas.map((formula, index) => (
              <article className={`formula-card ${formula.className}`} key={formula.name}>
                <div className="card-top"><span>0{index + 1}</span><span className="tag">{formula.benefit}</span></div>
                <Bottle name={formula.name.toUpperCase()} className="mini-bottle" />
                <h3>{formula.name}</h3><p>{formula.text}</p><a href="#contato" aria-label={`Saiba mais sobre ${formula.name}`}>Saiba mais <span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-section"><blockquote>“Cuidar de si não precisa ser complicado. Começa com escolhas mais conscientes, todos os dias.”</blockquote><p>— Herbal Saint</p></section>

        <section className="faq" id="perguntas">
          <div><p className="eyebrow"><span /> Perguntas frequentes</p><h2>O que você<br />gostaria de <em>saber?</em></h2></div>
          <div className="accordion">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className="contact" id="contato">
          <div><p className="eyebrow light"><span /> Vamos conversar</p><h2>Seu bem-estar<br />pode começar <em>hoje.</em></h2></div>
          <div className="contact-copy"><p>Fale com a nossa equipe e descubra qual caminho combina com o seu momento.</p><a className="button button-cream" href="mailto:contato@herbalsaint.com.br">Entrar em contato <span>↗</span></a></div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#inicio"><Logo /><span>Herbal Saint</span></a>
        <p>Natureza, ciência e propósito.</p>
        <div className="footer-links"><a href="#">Instagram</a><a href="mailto:contato@herbalsaint.com.br">E-mail</a></div>
        <small>© {new Date().getFullYear()} Herbal Saint. Todos os direitos reservados.<br />Este conteúdo não substitui orientação de um profissional de saúde.</small>
      </footer>
    </>
  );
}
