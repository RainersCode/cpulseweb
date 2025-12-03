export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.coinpulse.tech/#organization",
        "name": "CoinPulse",
        "url": "https://www.coinpulse.tech",
        "description": "AI-powered Telegram bot for cryptocurrency analysis and trading signals",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.coinpulse.tech/logo.png",
          "width": 200,
          "height": 200
        },
        "sameAs": [
          "https://t.me/CryptoOleBot",
          "https://x.com/cpulse_crypto"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "url": "https://www.coinpulse.tech/contact"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.coinpulse.tech/#website",
        "url": "https://www.coinpulse.tech",
        "name": "CoinPulse",
        "description": "AI-powered cryptocurrency analysis bot on Telegram",
        "isPartOf": {
          "@id": "https://www.coinpulse.tech/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.coinpulse.tech/articles?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.coinpulse.tech/#app",
        "name": "CoinPulse Telegram Bot",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Telegram",
        "description": "AI-powered cryptocurrency analysis and trading signals bot for Telegram",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free tier available, premium plans for advanced features"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "436"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.coinpulse.tech/#webpage",
        "url": "https://www.coinpulse.tech",
        "name": "CoinPulse - AI-Powered Telegram Crypto Bot",
        "description": "Find, analyze, and identify top-performing cryptocurrency coins in real-time with AI-powered insights and trading signals",
        "isPartOf": {
          "@id": "https://www.coinpulse.tech/#website"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.coinpulse.tech/og-image.jpg",
          "width": 1200,
          "height": 630
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
