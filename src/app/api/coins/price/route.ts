import { NextRequest, NextResponse } from 'next/server';
import { getCoinPrice, getMultipleCoinPrices } from '@/lib/binance';

/**
 * GET /api/coins/price?symbols=BTC,ETH,BNB
 * Fetch current prices for one or more coins
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbolsParam = searchParams.get('symbols');

    if (!symbolsParam) {
      return NextResponse.json(
        { error: 'symbols parameter is required (comma-separated)' },
        { status: 400 }
      );
    }

    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());

    if (symbols.length === 0) {
      return NextResponse.json(
        { error: 'At least one symbol is required' },
        { status: 400 }
      );
    }

    // Fetch prices
    const prices = await getMultipleCoinPrices(symbols);

    return NextResponse.json(prices, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error('Error fetching coin prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin prices' },
      { status: 500 }
    );
  }
}
