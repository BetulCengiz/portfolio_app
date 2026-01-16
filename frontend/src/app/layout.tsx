import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Space_Grotesk, Noto_Sans, Roboto_Flex } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/common/I18nProvider";
import UmamiAnalytics from "@/components/common/UmamiAnalytics";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Betül Cengiz",
  description: "Generative AI, Büyük Dil Modelleri, Agentic RAG sistemleri ve üretime hazır yapay zekâ çözümleri geliştiren Yapay Zekâ Mühendisi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${notoSans.variable} ${robotoFlex.variable} font-sans bg-background text-foreground overflow-x-hidden relative min-h-screen flex flex-col selection:bg-primary selection:text-white antialiased`}
      >
        <I18nProvider>
          {children}
          <UmamiAnalytics />
        </I18nProvider>
      </body>
    </html>
  );
}
