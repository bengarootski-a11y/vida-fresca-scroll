import type { Metadata, Viewport } from "next";
import { Knewave, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Loader from "./components/Loader";

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
  // Used to resolve the file-based icon / opengraph-image / twitter-image paths
  // to absolute URLs for crawlers. Override with NEXT_PUBLIC_SITE_URL when the
  // final domain is known.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://vidafrescala.com",
  ),
  title: "Vida Fresca — Organic Fresh Fruit Drinks · Los Angeles",
  description:
    "Organic agua frescas made fresh — Watermelon Blast, Mango Madness, and Pineapple Paradise. First pop-up July 11 in Larchmont Village, LA.",
  keywords: [
    "agua fresca",
    "organic fruit drinks",
    "Los Angeles",
    "Larchmont Village",
    "Vida Fresca",
    "watermelon",
    "mango",
    "pineapple",
  ],
  openGraph: {
    title: "Vida Fresca — Organic Fresh Fruit Drinks",
    description:
      "Organic agua frescas, ice-cold and made for sunny LA days. First pop-up July 11 · Larchmont Village.",
    type: "website",
    locale: "en_US",
    siteName: "Vida Fresca",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vida Fresca — Organic Fresh Fruit Drinks",
    description:
      "Organic agua frescas, ice-cold and made for sunny LA days. First pop-up July 11 · Larchmont Village.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4D2E",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
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
      <body>
        <Loader />
        {children}
      </body>
    </html>
  );
}
