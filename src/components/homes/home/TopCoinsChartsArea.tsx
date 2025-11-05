"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PriceChart from '@/components/coins/PriceChart';
import DetailedCoinCard from '@/components/coins/DetailedCoinCard';
import SvgBgDecorator from './SvgBgDecorator';
import type { CoinPrice } from '@/lib/binance';

// Custom scrollbar styles
const scrollbarStyles = `
  .trading-pairs-list::-webkit-scrollbar {
    width: 8px;
  }

  .trading-pairs-list::-webkit-scrollbar-track {
    background: rgba(236, 200, 11, 0.05);
    border-radius: 4px;
  }

  .trading-pairs-list::-webkit-scrollbar-thumb {
    background: rgba(236, 200, 11, 0.3);
    border-radius: 4px;
  }

  .trading-pairs-list::-webkit-scrollbar-thumb:hover {
    background: rgba(236, 200, 11, 0.5);
  }

  /* Price text color for light/dark mode */
  html.light-mode .pair-price {
    color: #0E0E0E !important;
  }

  html.dark-mode .pair-price {
    color: #fff !important;
  }

  /* Coin symbol color for light/dark mode */
  html.light-mode .pair-symbol {
    color: #0E0E0E !important;
  }

  html.dark-mode .pair-symbol {
    color: #ECC80B !important;
  }

  /* All USDT Pairs header color for light/dark mode */
  html.light-mode .pairs-header {
    color: #0E0E0E !important;
  }

  html.dark-mode .pairs-header {
    color: #fff !important;
  }
`;

const TopCoinsChartsArea = () => {
  const [timeframe, setTimeframe] = useState<'1h' | '4h' | '1d' | '1w' | '1M'>('1d');
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [selectedTradingPair, setSelectedTradingPair] = useState<CoinPrice | null>(null);
  const [coins, setCoins] = useState<CoinPrice[]>([]);
  const [allPairs, setAllPairs] = useState<CoinPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPairsLoading, setIsPairsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Top 10 coins by market cap (Binance available pairs on Binance US)
  const coinSymbols = ["BTC", "ETH", "BNB", "XRP", "SOL", "ADA", "DOGE", "AVAX", "LINK", "LTC"];

  const coinMetadata: Record<string, { name: string; logo: string; color: string }> = {
    BTC: { name: "Bitcoin", logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png", color: "hsl(43, 99%, 50%)" },
    ETH: { name: "Ethereum", logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png", color: "hsl(240, 70%, 50%)" },
    BNB: { name: "Binance Coin", logo: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", color: "hsl(40, 99%, 60%)" },
    XRP: { name: "Ripple", logo: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", color: "hsl(180, 50%, 50%)" },
    SOL: { name: "Solana", logo: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png", color: "hsl(260, 80%, 60%)" },
    ADA: { name: "Cardano", logo: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png", color: "hsl(220, 80%, 50%)" },
    DOGE: { name: "Dogecoin", logo: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png", color: "hsl(35, 100%, 50%)" },
    AVAX: { name: "Avalanche", logo: "", color: "hsl(0, 0%, 100%)" },
    LINK: { name: "Chainlink", logo: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png", color: "hsl(210, 100%, 40%)" },
    LTC: { name: "Litecoin", logo: "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png", color: "hsl(201, 100%, 50%)" }
  };

  // Fetch coin prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/coins/price?symbols=${coinSymbols.join(',')}`);
        if (!response.ok) throw new Error('Failed to fetch prices');

        const pricesData = await response.json();
        setCoins(pricesData);
      } catch (err) {
        console.error('Error fetching prices:', err);
        setError(err instanceof Error ? err.message : 'Error loading prices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Fetch all USDT trading pairs
  useEffect(() => {
    const fetchAllPairs = async () => {
      try {
        setIsPairsLoading(true);
        const response = await fetch('/api/coins/pairs');
        if (!response.ok) throw new Error('Failed to fetch pairs');

        const pairsData = await response.json();
        setAllPairs(pairsData);

        // Set first pair as default selected
        if (pairsData.length > 0) {
          setSelectedTradingPair(pairsData[0]);
        }
      } catch (err) {
        console.error('Error fetching trading pairs:', err);
        // Don't show error to user, just log it
      } finally {
        setIsPairsLoading(false);
      }
    };

    fetchAllPairs();
  }, []);

  // Merge API data with metadata
  const allCoins = coins.map((coin, index) => ({
    id: index + 1,
    symbol: coin.symbol,
    name: coinMetadata[coin.symbol]?.name || coin.name,
    price: coin.price,
    change24h: coin.priceChangePercent24h,
    change7d: coin.priceChangePercent7d || 0,
    volume24h: coin.volume24h,
    high24h: coin.high24h,
    low24h: coin.low24h,
    logo: coinMetadata[coin.symbol]?.logo || "",
    color: coinMetadata[coin.symbol]?.color || "hsl(240, 70%, 50%)"
  }));

  const timeframes = ['1H', '4H', '1D', '1W', '1M'];

  // Loading state
  if (isLoading) {
    return (
      <section className="top-coins-charts-wrapper bg-secondary py-5" style={{ position: 'relative' }}>
        <SvgBgDecorator side="left" size="38%" opacity={0.1} />
        <div className="divider"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row mb-5">
            <div className="col-12">
              <div className="section-heading d-md-flex align-items-end justify-content-between">
                <div>
                  <h2 className="mb-3">Top Crypto Coins</h2>
                  <p style={{ color: '#8B8B94' }}>Loading real-time data from Binance...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center" style={{ padding: '40px' }}>
              <div style={{ color: '#8B8B94' }}>Loading prices...</div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="top-coins-charts-wrapper bg-secondary py-5" style={{ position: 'relative' }}>
        <SvgBgDecorator side="left" size="38%" opacity={0.1} />
        <div className="divider"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row mb-5">
            <div className="col-12">
              <div className="section-heading">
                <div>
                  <h2 className="mb-3">Top Crypto Coins</h2>
                  <p style={{ color: '#ef4444' }}>Error: {error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </section>
    );
  }

  return (
    <>
      <style>{scrollbarStyles}</style>
      <section className="top-coins-charts-wrapper bg-secondary py-5" style={{ position: 'relative' }}>
        <SvgBgDecorator side="left" size="38%" opacity={0.1} />
        <div className="divider"></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="section-heading d-md-flex align-items-end justify-content-between">
                <div>
                  <h2 className="mb-3 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                    Top Crypto Coins
                  </h2>
                  <p className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms" style={{ color: '#8B8B94', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 500 }}>
                    Real-time price data and market performance powered by Binance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeframe Toggle */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="timeframe-toggle d-flex gap-2 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="500ms">
                {timeframes.map((tf) => {
                  const timeframeMap: Record<string, '1h' | '4h' | '1d' | '1w' | '1M'> = {
                    '1H': '1h',
                    '4H': '4h',
                    '1D': '1d',
                    '1W': '1w',
                    '1M': '1M'
                  };
                  const mappedTf = timeframeMap[tf];
                  return (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(mappedTf)}
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '8px 16px',
                        border: `1px solid ${timeframe === mappedTf ? '#ECC80B' : 'rgba(236, 200, 11, 0.3)'}`,
                        borderRadius: '8px',
                        background: timeframe === mappedTf ? '#ECC80B' : 'transparent',
                        color: timeframe === mappedTf ? '#0E0E0E' : '#8B8B94',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (timeframe !== mappedTf) {
                          e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.6)';
                          e.currentTarget.style.color = '#ECC80B';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (timeframe !== mappedTf) {
                          e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.3)';
                          e.currentTarget.style.color = '#8B8B94';
                        }
                      }}
                    >
                      {tf}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Card with Trading Pairs List */}
          <div className="row g-4">
            {/* Left Side - Detailed Coin Card (2/3 width) */}
            <div className="col-12 col-lg-8">
              <DetailedCoinCard coin={selectedTradingPair} timeframe={timeframe} />
            </div>


            {/* Right Side - Trading Pairs List (1/3 width) */}
            <div className="col-12 col-lg-4">
              <div
                style={{
                  maxHeight: '800px',
                  height: '800px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)',
                  border: '1px solid rgba(236, 200, 11, 0.2)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Header */}
                <h5 className="pairs-header" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
                  📊 All USDT Pairs
                </h5>

                {/* Loading Indicator */}
                {isPairsLoading && (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#8B8B94' }}>
                    <small>Loading pairs...</small>
                  </div>
                )}

                {/* Scrollable List */}
                <div
                  style={{
                    flex: 1,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    paddingRight: '4px',
                    scrollBehavior: 'smooth',
                    minHeight: '0'
                  }}
                  className="trading-pairs-list"
                >
                  {allPairs.map((coin) => (
                    <div
                      key={coin.symbol}
                      onClick={() => setSelectedTradingPair(coin)}
                      style={{
                        padding: '12px',
                        marginBottom: '8px',
                        borderRadius: '12px',
                        background: selectedTradingPair?.symbol === coin.symbol ? 'rgba(236, 200, 11, 0.2)' : 'rgba(236, 200, 11, 0.05)',
                        border: selectedTradingPair?.symbol === coin.symbol ? '1px solid rgba(236, 200, 11, 0.6)' : '1px solid rgba(236, 200, 11, 0.15)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(236, 200, 11, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.4)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = selectedTradingPair?.symbol === coin.symbol ? 'rgba(236, 200, 11, 0.2)' : 'rgba(236, 200, 11, 0.05)';
                        e.currentTarget.style.borderColor = selectedTradingPair?.symbol === coin.symbol ? 'rgba(236, 200, 11, 0.6)' : 'rgba(236, 200, 11, 0.15)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {/* Pair Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span className="pair-symbol" style={{ fontSize: '12px', fontWeight: 700 }}>
                            {coin.symbol}
                          </span>
                          <span style={{ fontSize: '10px', color: '#8B8B94' }}>
                            USDT
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                          <span className="pair-price" style={{ fontWeight: 600 }}>
                            ${coin.price.toFixed(coin.price >= 1 ? 2 : 4)}
                          </span>
                          <span
                            style={{
                              color: coin.priceChangePercent24h >= 0 ? '#22c55e' : '#ef4444',
                              fontWeight: 600
                            }}
                          >
                            {coin.priceChangePercent24h >= 0 ? '+' : ''}{coin.priceChangePercent24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {/* Analyze Button */}
                      <a
                        href="https://t.me/CryptoOleBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        style={{
                          textDecoration: 'none'
                        }}
                      >
                        <button
                          style={{
                            padding: '6px 12px',
                            background: '#ECC80B',
                            color: '#0E0E0E',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FFD700';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#ECC80B';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          Go
                        </button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="row mt-5 pt-4">
            <div className="col-12">
              <div className="info-banner p-4 rounded wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="1000ms" style={{ background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)', border: '1px solid rgba(236, 200, 11, 0.2)' }}>
                <div className="d-flex align-items-start gap-3">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px', marginTop: '4px', color: '#ECC80B' }}>
                    info
                  </span>
                  <div>
                    <h5 className="mb-2" style={{ color: 'inherit' }}>Real-Time Data From Binance</h5>
                    <p className="mb-0" style={{ color: '#8B8B94', marginBottom: '12px' }}>
                      All price data, market caps, and trading volumes are updated in real-time from Binance. Use our bot to get detailed analysis for any coin on this list.
                    </p>
                    <Link href="https://t.me/CryptoOleBot" target="_blank" style={{ color: '#ECC80B', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD700'} onMouseLeave={(e) => e.currentTarget.style.color = '#ECC80B'}>
                      Start Analyzing →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>
    </>
  );
};

export default TopCoinsChartsArea;
