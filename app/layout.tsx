import type { Metadata, Viewport } from "next";
import { Arima, Fraunces, Noto_Sans_Tamil } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const noto = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-tamil",
  display: "swap",
});

const arima = Arima({
  subsets: ["tamil", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-arima",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.developer.name, url: siteConfig.developer.url }],
  creator: siteConfig.developer.name,
  keywords: [
    "BITE MIX",
    "வீட்டு உணவு",
    "இறைச்சி சம்பல்",
    "முறுக்கு",
    "வட்டலப்பம்",
    "லட்டு",
    "Sri Lankan homemade food",
    "Tamil homemade snacks",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1f3d2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ta"
      className={`${noto.variable} ${arima.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
