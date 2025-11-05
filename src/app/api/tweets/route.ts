import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { getActiveTweets, getAllTweets, addTweet, extractTweetId, saveEmbedHtml } from '@/lib/tweets';

// Helper function to fetch embed HTML from Twitter oEmbed API
async function fetchTwitterEmbed(tweetUrl: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&theme=dark`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CoinPulse/1.0)',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.html || null;
    }
    console.warn(`Failed to fetch oEmbed for ${tweetUrl}: status ${response.status}`);
    return null;
  } catch (error) {
    console.error(`Error fetching embed for ${tweetUrl}:`, error);
    return null;
  }
}

// GET /api/tweets - Get active tweets (limited to 3 for home page, or all if authenticated)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    // If authenticated, return all tweets (for admin panel)
    // If not authenticated, return only active tweets (limit to 3 for home page by default)
    const tweets = session?.user
      ? await getAllTweets()
      : await getActiveTweets(limit ?? 3);

    // Fetch embed HTML for tweets that don't have it cached
    const tweetsWithEmbed = await Promise.all(
      tweets.map(async (tweet: any) => {
        // If embed_html is already cached in database, use it
        if (tweet.embed_html) {
          return tweet;
        }

        // Otherwise fetch from Twitter oEmbed API
        const embed_html = await fetchTwitterEmbed(tweet.tweet_url);
        return { ...tweet, embed_html };
      })
    );

    return NextResponse.json(tweetsWithEmbed, {
      status: 200,
      headers: {
        // Cache for 5 minutes for public, no cache for admin
        'Cache-Control': session?.user ? 'private, no-cache' : 'public, max-age=300',
      }
    });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tweets', details: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/tweets - Add new tweet (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { tweet_url, author, content, display_order } = body;

    if (!tweet_url) {
      return NextResponse.json(
        { error: 'Tweet URL is required' },
        { status: 400 }
      );
    }

    // Extract tweet ID from URL
    const tweet_id = extractTweetId(tweet_url);
    if (!tweet_id) {
      return NextResponse.json(
        { error: 'Invalid tweet URL format' },
        { status: 400 }
      );
    }

    const tweet = await addTweet({
      tweet_url,
      tweet_id,
      author: author || 'CoinPulse',
      content: content || '',
      display_order: display_order || 0,
    });

    // Fetch embed HTML and save to database
    const embed_html = await fetchTwitterEmbed(tweet_url);
    if (embed_html) {
      // Save to database in background (don't wait for it)
      saveEmbedHtml(tweet.id, embed_html).catch(err =>
        console.error('Failed to cache embed HTML:', err)
      );
    }

    const tweetWithEmbed = { ...tweet, embed_html };

    return NextResponse.json(tweetWithEmbed, { status: 201 });
  } catch (error) {
    console.error('Error creating tweet:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error ? error.toString() : JSON.stringify(error);
    console.error('Full error details:', errorDetails);
    return NextResponse.json(
      {
        error: 'Failed to create tweet',
        details: errorMessage,
        message: errorMessage,
        fullError: errorDetails
      },
      { status: 500 }
    );
  }
}
