import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const title = searchParams.get('title') || 'CoinPulse'
    const description = searchParams.get('description') || 'Crypto News & Insights'

    // Create a simple SVG image with the article title
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <rect x="0" y="0" width="1200" height="630" fill="rgba(236, 200, 11, 0.05)"/>

        <!-- Yellow accent bar -->
        <rect x="0" y="0" width="1200" height="8" fill="#ECC80B"/>

        <!-- Title -->
        <text x="60" y="180" font-size="56" font-weight="bold" fill="#ECC80B" font-family="Arial, sans-serif" width="1080">
          <tspan x="60" dy="0">${escapeXml(title.substring(0, 50))}</tspan>
        </text>

        <!-- Description -->
        <text x="60" y="340" font-size="24" fill="#FFFFFF" font-family="Arial, sans-serif" opacity="0.8">
          ${escapeXml(description.substring(0, 80))}
        </text>

        <!-- Footer -->
        <text x="60" y="600" font-size="18" fill="#ECC80B" font-family="Arial, sans-serif">
          CoinPulse • Crypto News & Insights
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    console.error('Error generating OG image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
