/**
 * Binance API Service
 * Fetches real-time cryptocurrency price data from Binance
 */

export interface CoinPrice {
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  priceChange7d?: number;
  priceChangePercent7d?: number;
  marketCap?: number;
  marketCapRank?: number;
  volume24h?: number;
  high24h?: number;
  low24h?: number;
  logo?: string;
}

export interface ChartData {
  time: number;
  price: number;
}

// Binance Spot API base URL (public, no auth needed for most endpoints)
const BINANCE_API = 'https://api.binance.us/api/v3';

// CoinGecko API for coin logos and additional data
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Cache for coin logos to reduce API calls
const logoCache: { [symbol: string]: string | null } = {};

/**
 * Get coin logo from CoinGecko
 */
async function getCoinLogo(symbol: string): Promise<string | null> {
  // Check cache first
  if (logoCache[symbol] !== undefined) {
    return logoCache[symbol];
  }

  try {
    const response = await fetch(
      `${COINGECKO_API}/search?query=${symbol}`
    );

    if (!response.ok) {
      logoCache[symbol] = null;
      return null;
    }

    const data = await response.json();
    const coin = data.coins?.[0];

    if (coin?.large) {
      logoCache[symbol] = coin.large;
      return coin.large;
    }

    logoCache[symbol] = null;
    return null;
  } catch (error) {
    console.warn(`Error fetching logo for ${symbol}:`, error);
    logoCache[symbol] = null;
    return null;
  }
}

/**
 * Get current price for a coin
 */
export async function getCoinPrice(symbol: string): Promise<CoinPrice | null> {
  try {
    const pair = `${symbol}USDT`;

    // Fetch current ticker data
    const tickerResponse = await fetch(
      `${BINANCE_API}/ticker/24hr?symbol=${pair}`
    );

    if (!tickerResponse.ok) {
      console.error(`Failed to fetch price for ${symbol}:`, tickerResponse.status);
      return null;
    }

    const ticker = await tickerResponse.json();

    // Calculate market cap estimate using volume data if available
    // This is an approximation since Binance API doesn't provide market cap
    const volume24h = parseFloat(ticker.quoteAssetVolume);

    // Fetch 7-day klines data to calculate 7-day change
    let priceChange7d = undefined;
    let priceChangePercent7d = undefined;

    try {
      const klinesResponse = await fetch(
        `${BINANCE_API}/klines?symbol=${pair}&interval=1d&limit=7`
      );

      if (klinesResponse.ok) {
        const klines = await klinesResponse.json();

        if (klines.length >= 2) {
          // Get the opening price from 7 days ago (first kline)
          // and the current price (latest kline close)
          const priceSevenDaysAgo = parseFloat(klines[0][1]); // open price of oldest candle
          const currentPrice = parseFloat(ticker.lastPrice);

          priceChange7d = currentPrice - priceSevenDaysAgo;
          priceChangePercent7d = (priceChange7d / priceSevenDaysAgo) * 100;
        }
      }
    } catch (error) {
      console.warn(`Error fetching 7d change for ${symbol}:`, error);
      // Continue without 7d data if klines fetch fails
    }

    // Fetch logo asynchronously but don't block price fetch
    const logo = await getCoinLogo(symbol);

    return {
      symbol,
      name: symbol,
      price: parseFloat(ticker.lastPrice),
      priceChange24h: parseFloat(ticker.priceChange),
      priceChangePercent24h: parseFloat(ticker.priceChangePercent),
      priceChange7d: priceChange7d,
      priceChangePercent7d: priceChangePercent7d,
      volume24h: volume24h,
      // Market cap data is not available from Binance REST API
      // Can be estimated or fetched from alternative sources like CoinGecko
      marketCap: undefined,
      high24h: parseFloat(ticker.highPrice),
      low24h: parseFloat(ticker.lowPrice),
      logo: logo || undefined,
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
}

/**
 * Get multiple coin prices at once
 */
export async function getMultipleCoinPrices(
  symbols: string[]
): Promise<CoinPrice[]> {
  const prices = await Promise.all(
    symbols.map(symbol => getCoinPrice(symbol))
  );

  return prices.filter((price) => price !== null) as CoinPrice[];
}

/**
 * Get price chart data (klines) for a coin
 * @param symbol - Coin symbol (e.g., 'BTC', 'ETH')
 * @param interval - Candle interval ('1h', '4h', '1d', '1w', '1M')
 * @param limit - Number of candles to fetch (default: 100, max: 1000)
 */
export async function getCoinChart(
  symbol: string,
  interval: '1h' | '4h' | '1d' | '1w' | '1M' = '1d',
  limit: number = 100
): Promise<ChartData[]> {
  try {
    const pair = `${symbol}USDT`;

    const response = await fetch(
      `${BINANCE_API}/klines?symbol=${pair}&interval=${interval}&limit=${limit}`
    );

    if (!response.ok) {
      console.error(`Failed to fetch chart for ${symbol}:`, response.status);
      return [];
    }

    const klines = await response.json();

    // Transform Binance klines to chart format
    // klines format: [openTime, open, high, low, close, volume, closeTime, ...]
    return klines.map((kline: any[]) => ({
      time: kline[0], // Open time
      price: parseFloat(kline[4]), // Close price
    }));
  } catch (error) {
    console.error(`Error fetching chart for ${symbol}:`, error);
    return [];
  }
}

/**
 * Get all USDT trading pairs with current prices
 */
export async function getAllUSDTPairs(): Promise<CoinPrice[]> {
  try {
    const response = await fetch(`${BINANCE_API}/exchangeInfo`);

    if (!response.ok) {
      console.error('Failed to fetch exchange info:', response.status);
      return [];
    }

    const data = await response.json();
    const usdtPairs = data.symbols.filter((symbol: any) =>
      symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING'
    );

    // Extract unique symbols (remove USDT suffix)
    const symbols = usdtPairs.map((pair: any) =>
      pair.baseAsset
    ).filter((symbol: string) => symbol.length > 0);

    // Remove duplicates
    const uniqueSymbols = [...new Set(symbols)] as string[];

    // Fetch prices for all symbols in batches (Binance has limits)
    const prices = await getMultipleCoinPrices(uniqueSymbols);
    return prices;
  } catch (error) {
    console.error('Error fetching all USDT pairs:', error);
    return [];
  }
}

/**
 * Get 24h price change for a coin
 */
export async function get24hChange(symbol: string): Promise<number | null> {
  try {
    const price = await getCoinPrice(symbol);
    return price ? price.priceChangePercent24h : null;
  } catch (error) {
    console.error(`Error fetching 24h change for ${symbol}:`, error);
    return null;
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  } else {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 4 })}`;
  }
}

/**
 * Format percentage for display
 */
export function formatPercentage(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

/**
 * Get color based on price change (green for positive, red for negative)
 */
export function getPriceChangeColor(change: number): string {
  if (change > 0) return '#22c55e'; // green-500
  if (change < 0) return '#ef4444'; // red-500
  return '#8B8B94'; // gray
}
