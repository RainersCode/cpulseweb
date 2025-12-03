import type { Metadata } from "next";
import "../styles/index.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { SchemaMarkup } from "./schema";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.coinpulse.tech";

export const metadata: Metadata = {
  title: "CoinPulse - AI-Powered Telegram Crypto Bot for Coin Analysis",
  description: "CoinPulse is an AI-powered Telegram bot that helps users find, analyze, and identify top-performing cryptocurrency coins in real-time with intelligent market insights and trading signals.",
  keywords: ["crypto bot", "telegram bot", "cryptocurrency analysis", "coin analyzer", "crypto signals", "top coins finder", "telegram crypto", "crypto market analysis"],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "CoinPulse - AI-Powered Telegram Crypto Bot for Coin Analysis",
    description: "CoinPulse is an AI-powered Telegram bot that helps users find, analyze, and identify top-performing cryptocurrency coins in real-time with intelligent market insights and trading signals.",
    siteName: "CoinPulse",
    images: [
      {
        url: `${baseUrl}/logo/coinpulse-og-image.png`,
        width: 1200,
        height: 630,
        alt: "CoinPulse - AI Crypto Analysis Bot",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinPulse - AI-Powered Telegram Crypto Bot for Coin Analysis",
    description: "CoinPulse is an AI-powered Telegram bot that helps users find, analyze, and identify top-performing cryptocurrency coins in real-time with intelligent market insights and trading signals.",
    images: [`${baseUrl}/logo/coinpulse-og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Unbounded:wght@200..900&display=swap" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* AI Search Engine Optimization */}
        <meta name="author" content="CoinPulse" />
        <meta name="creator" content="CoinPulse" />
        <meta name="publisher" content="CoinPulse" />
        <meta name="audience" content="Cryptocurrency Traders, Investors, Analysts" />
        <meta name="category" content="Technology, Finance, Cryptocurrency" />
        <meta name="distribution" content="global" />

        {/* Allow AI crawlers */}
        <meta name="AdsBot-Google" content="index, follow" />
        <meta name="gpt-crawl" content="allow" />
        <meta name="perplexitybot" content="allow" />
        <meta name="ccbot" content="allow" />
        <meta name="OAI-SearchBot" content="allow" />

        {/* Schema markup for AI understanding */}
        <meta name="description" content="CoinPulse is an AI-powered Telegram bot that helps users find, analyze, and identify top-performing cryptocurrency coins in real-time with intelligent market insights and trading signals." />
        <meta name="theme-color" content="#1A1A1A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* JSON-LD Schema for AI search engines */}
        <SchemaMarkup />
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
