import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs';

// GET /api/og-image-proxy?url=[encoded-supabase-url]
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    // Fetch the image from the external URL (Supabase)
    const response = await fetch(decodeURIComponent(imageUrl), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TwitterBot/1.0; +http://twitter.com)',
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch image from ${imageUrl}: ${response.status}`)
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: 502 }
      )
    }

    // Get the image content type
    const contentType = response.headers.get('content-type') || 'image/jpeg'

    // Return the image with proper cache headers
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=604800',  // Cache for 7 days
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('Error proxying OG image:', error)
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    )
  }
}
