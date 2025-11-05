import { NextRequest, NextResponse } from 'next/server';
import { getCoinChart } from '@/lib/binance';

/**
 * GET /api/coins/chart?symbol=BTC&interval=1d&limit=30
 * Fetch chart data (klines) for a coin
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const interval = searchParams.get('interval') || '1d';
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    if (!symbol) {
      return NextResponse.json(
        { error: 'symbol parameter is required' },
        { status: 400 }
      );
    }

    // Validate interval
    const validIntervals = ['1h', '4h', '1d', '1w', '1M'];
    if (!validIntervals.includes(interval)) {
      return NextResponse.json(
        {
          error: `Invalid interval. Must be one of: ${validIntervals.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate limit
    if (limit < 1 || limit > 1000) {
      return NextResponse.json(
        { error: 'limit must be between 1 and 1000' },
        { status: 400 }
      );
    }

    // Fetch chart data
    const chartData = await getCoinChart(
      symbol.toUpperCase(),
      interval as any,
      limit
    );

    return NextResponse.json(
      { symbol, interval, data: chartData },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
      { status: 500 }
    );
  }
}
