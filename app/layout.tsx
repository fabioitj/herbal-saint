import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Manrope({ subsets: ["latin"], variable: "--font-display" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Herbal Saint — Bem-estar que vem da natureza",
  description: "Fórmulas fitoterápicas para uma rotina com mais equilíbrio e bem-estar.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e7" },
    { media: "(prefers-color-scheme: dark)", color: "#101814" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`try{const t=localStorage.getItem('herbal-saint-theme')||'system';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t}catch{}`}</Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
