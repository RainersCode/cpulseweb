import { NextResponse } from 'next/server';
import { getAllUSDTPairs } from '@/lib/binance';

/**
 * GET /api/coins/pairs
 * Fetch all USDT trading pairs with current prices from Binance
 */
export async function GET() {
  try {
    const pairs = await getAllUSDTPairs();

    return NextResponse.json(pairs, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=120', // Cache for 2 minutes (more pairs to fetch)
      },
    });
  } catch (error) {
    console.error('Error fetching trading pairs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trading pairs' },
      { status: 500 }
    );
  }
}
