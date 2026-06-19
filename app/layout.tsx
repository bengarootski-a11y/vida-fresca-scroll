import type { Metadata } from "next";
import { Knewave, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const knewave = Knewave({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-knewave",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vida Fresca — Fresh Fruit Drinks",
  description: "Real fruit, blended fresh and made for sunny LA days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${knewave.variable} ${jakarta.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
