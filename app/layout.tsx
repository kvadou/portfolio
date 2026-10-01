import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { ThemeProvider } from "@/lib/theme";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doug Kvamme · Forward Deployed AI Engineer",
  description:
    "Portfolio of Doug Kvamme, a forward deployed AI engineer who maps real business processes, re-engineers them around agents, and ships production systems that non-technical teams run every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
