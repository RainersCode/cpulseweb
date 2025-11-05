'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  time: number;
  price: number;
}

interface PriceChartProps {
  symbol: string;
  interval?: '1h' | '4h' | '1d' | '1w' | '1M';
  height?: number;
  priceChange?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({
  symbol,
  interval = '1d',
  height = 250,
  priceChange = 0,
}) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/coins/chart?symbol=${symbol}&interval=${interval}&limit=30`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading chart');
        console.error('Error fetching chart:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, interval]);

  if (isLoading) {
    return (
      <div
        style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(236, 200, 11, 0.05)',
          borderRadius: '8px',
        }}
      >
        <p style={{ color: '#8B8B94', fontSize: '12px' }}>Loading chart...</p>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div
        style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(236, 200, 11, 0.05)',
          borderRadius: '8px',
        }}
      >
        <p style={{ color: '#8B8B94', fontSize: '12px' }}>
          {error || 'No data available'}
        </p>
      </div>
    );
  }

  // Use website brand color (gold/yellow) for chart line instead of red/green
  const lineColor = '#ECC80B';

  // Format timestamp for display
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (interval === '1h') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (interval === '4h') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (interval === '1w') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(236, 200, 11, 0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: '#8B8B94' }}
            tickFormatter={formatTime}
            stroke="rgba(236, 200, 11, 0.1)"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#8B8B94' }}
            stroke="rgba(236, 200, 11, 0.1)"
            width={65}
            tickFormatter={(value) => {
              if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
              if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
              return `$${value.toFixed(0)}`;
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20, 20, 30, 0.95)',
              border: `1px solid ${lineColor}`,
              borderRadius: '8px',
              color: lineColor,
            }}
            labelFormatter={(label) => new Date(label).toLocaleString()}
            formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
