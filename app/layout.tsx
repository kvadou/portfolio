import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doug Kvamme · Forward Deployed AI Engineer",
  description:
    "Doug Kvamme built a company's whole operating system as a solo engineer: ten production apps, an AI and data platform, and evals in production. Forward deployed AI engineer.",
};

export const viewport: Viewport = {
  themeColor: "#f4f6f4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${martian.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-panel"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
