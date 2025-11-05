import React, { useState } from 'react';
import PriceChart from './PriceChart';
import type { CoinPrice } from '@/lib/binance';

interface DetailedCoinCardProps {
  coin: CoinPrice | null;
  timeframe: '1h' | '4h' | '1d' | '1w' | '1M';
}

export default function DetailedCoinCard({ coin, timeframe }: DetailedCoinCardProps) {
  const [logoError, setLogoError] = useState(false);

  if (!coin) {
    return (
      <div
        style={{
          padding: '60px 32px',
          textAlign: 'center',
          color: '#8B8B94',
          fontSize: '16px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)',
          border: '1px solid rgba(236, 200, 11, 0.2)',
          minHeight: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Select a trading pair from the list to view details
      </div>
    );
  }

  return (
    <div
      className="detailed-coin-card wow fadeInUp"
      data-wow-duration="1000ms"
      data-wow-delay="600ms"
      style={{
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)',
        border: '1px solid rgba(236, 200, 11, 0.2)',
        transition: 'all 0.3s ease',
        height: '800px',
        maxHeight: '800px',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      {/* Coin Icon Container */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '12px',
          background: coin.logo && !logoError ? 'transparent' : `linear-gradient(135deg, #ECC80B 0%, #FFD700 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          boxShadow: coin.logo && !logoError ? 'none' : `0 8px 20px rgba(236, 200, 11, 0.3)`,
          flexShrink: 0,
          overflow: 'hidden',
          padding: '4px'
        }}
      >
        {coin.logo && !logoError ? (
          <img
            src={coin.logo}
            alt={coin.symbol}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: 'transparent'
            }}
            onError={() => setLogoError(true)}
          />
        ) : (
          <span
            style={{
              fontSize: '30px',
              color: '#0E0E0E',
              fontWeight: 'bold'
            }}
          >
            {coin.symbol[0]}
          </span>
        )}
      </div>

      {/* Coin Name & Symbol */}
      <h2
        style={{
          fontSize: '30px',
          fontWeight: 700,
          marginBottom: '4px'
        }}
      >
        {coin.symbol}
      </h2>
      <p
        style={{
          fontSize: '12px',
          color: '#8B8B94',
          marginBottom: '16px',
          marginTop: '0'
        }}
      >
        {coin.name}
      </p>

      {/* Price */}
      <div
        style={{
          fontSize: '34px',
          fontWeight: 700,
          marginBottom: '16px',
          color: '#ECC80B'
        }}
      >
        ${coin.price.toFixed(coin.price >= 1 ? 2 : 4)}
      </div>

      {/* Price Change */}
      <div
        className="d-flex gap-5 mb-5"
        style={{
          width: '100%',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(236, 200, 11, 0.15)',
          justifyContent: 'center'
        }}
      >
        <div>
          <small style={{ color: '#8B8B94', display: 'block', marginBottom: '6px', fontSize: '11px' }}>
            24h Change
          </small>
          <span
            style={{
              color: coin.priceChangePercent24h >= 0 ? '#22c55e' : '#ef4444',
              fontSize: '18px',
              fontWeight: 700,
              display: 'block'
            }}
          >
            {coin.priceChangePercent24h >= 0 ? '+' : ''}{coin.priceChangePercent24h.toFixed(2)}%
          </span>
        </div>
        <div>
          <small style={{ color: '#8B8B94', display: 'block', marginBottom: '6px', fontSize: '11px' }}>
            7d Change
          </small>
          <span
            style={{
              color: (coin.priceChangePercent7d || 0) >= 0 ? '#22c55e' : '#ef4444',
              fontSize: '18px',
              fontWeight: 700,
              display: 'block'
            }}
          >
            {(coin.priceChangePercent7d || 0) >= 0 ? '+' : ''}{(coin.priceChangePercent7d || 0).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Volume and High/Low Section */}
      <div
        style={{
          width: '100%',
          marginBottom: '16px',
          marginTop: '16px'
        }}
      >
        {/* 24h Volume */}
        {coin.volume24h && (
          <div
            style={{
              marginBottom: '14px',
              padding: '14px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#8B8B94', fontSize: '12px', fontWeight: 600 }}>
                📊 24h Volume
              </small>
              <span
                style={{
                  color: '#22c55e',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                ${(coin.volume24h / 1000000000).toFixed(2)}B
              </span>
            </div>
          </div>
        )}

        {/* 24h High/Low */}
        {coin.high24h && coin.low24h && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}
          >
            {/* High */}
            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                textAlign: 'center'
              }}
            >
              <small style={{ color: '#8B8B94', display: 'block', marginBottom: '6px', fontSize: '10px', fontWeight: 600 }}>
                📈 24h High
              </small>
              <span
                style={{
                  color: '#22c55e',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'block'
                }}
              >
                ${coin.high24h.toFixed(coin.price >= 1 ? 2 : 4)}
              </span>
            </div>

            {/* Low */}
            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                textAlign: 'center'
              }}
            >
              <small style={{ color: '#8B8B94', display: 'block', marginBottom: '6px', fontSize: '10px', fontWeight: 600 }}>
                📉 24h Low
              </small>
              <span
                style={{
                  color: '#ef4444',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'block'
                }}
              >
                ${coin.low24h.toFixed(coin.price >= 1 ? 2 : 4)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Price Chart */}
      <div style={{ width: '100%', marginBottom: '12px', marginTop: '8px' }}>
        <PriceChart
          symbol={coin.symbol}
          interval={timeframe}
          height={220}
          priceChange={coin.priceChangePercent24h}
        />
      </div>

      {/* Analyze Button */}
      <a
        href="https://t.me/CryptoOleBot"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none'
        }}
      >
        <button
          className="btn btn-primary w-100"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            padding: '12px 20px',
            background: '#ECC80B',
            color: '#0E0E0E',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%'
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
          Analyze
        </button>
      </a>
    </div>
  );
}
