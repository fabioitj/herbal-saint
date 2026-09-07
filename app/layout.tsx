import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import "./journey-responsive.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Herbal Saint — O cuidado começa na raiz",
  description: "Um retorno ao essencial. Conheça Vitalis, Sereno e Flora: três encontros com a botânica para acompanhar o seu ritmo natural.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0ede4" },
    { media: "(prefers-color-scheme: dark)", color: "#202b22" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${sans.variable} ${serif.variable}`}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`try{const saved=localStorage.getItem('herbal-saint-theme');const t=['light','dark','system'].includes(saved)?saved:'light';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t}catch{document.documentElement.dataset.theme='light'}`}</Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
