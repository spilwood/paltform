import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { Toaster } from "@spilwood/ui";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Spilwood — Спилы и пеньки из берёзы и сосны от производителя",
  description:
    "Производство спилов дерева в Тверской области. Готовые спилы для декора, мастерских и интерьеров. Доставка по России через Ozon.",
  keywords:
    "спилы дерева, пеньки, спилы берёзы, спилы сосны, декор из дерева, деревянные спилы купить",
  metadataBase: new URL("https://spilwood.ru"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Spilwood",
    title: "Spilwood — Спилы и пеньки от производителя",
    description:
      "Производство спилов дерева в Тверской области. Берёза и сосна. Доставка по России.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spilwood — Спилы и пеньки от производителя",
    description:
      "Производство спилов дерева в Тверской области. Берёза и сосна.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
      </head>
      <body
        className={`${inter.className} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-to-content">
            Перейти к содержимому
          </a>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
