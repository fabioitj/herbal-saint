# Herbal Saint

Uma experiência botânica em Next.js: papel natural, vidro âmbar, fotografia de ervas e uma narrativa conduzida pela rolagem em um único palco fixo.

```sh
npm ci
npm run dev
```

Acesse `http://localhost:3000`. Para validar a versão de produção:

```sh
npm run lint
npm run build
```

## A experiência

- O scroll controla uma câmera virtual: cenas atravessam a tela lateralmente, o jardim se aproxima e os frascos se transformam. Os capítulos não empurram a tela para cima.
- Introdução fotográfica, manifesto e passagem por um jardim de ervas.
- Capítulos de Vitalis, Sereno e Flora com frascos e gravuras botânicas animados.
- Seletor de ritual que apresenta o momento e a fórmula correspondente.
- Navegação por âncoras, menu móvel e temas claro, escuro e automático com preferência salva.
- Rolagem nativa, sem bloqueio de toque ou roda do mouse. As âncoras e o histórico do navegador apontam para os capítulos da experiência.
- A preferência por movimento reduzido apresenta os capítulos em uma página convencional e remove as animações. O conteúdo também é legível sem JavaScript.

As fórmulas e os contatos foram preservados do conceito original. Os links de contato abrem o aplicativo de e-mail; não há checkout ou envio de formulário no servidor.

As imagens são visuais gerados para este conceito, armazenados em `public/images/` e otimizados pelo Next.js. Referências de direção de arte e prompts completos estão em [docs/design-references.md](docs/design-references.md) e [docs/generated-assets.md](docs/generated-assets.md).
