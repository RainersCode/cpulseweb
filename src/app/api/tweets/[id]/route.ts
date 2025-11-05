import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { updateTweet, deleteTweet, toggleTweetVisibility } from '@/lib/tweets';

// PATCH /api/tweets/[id] - Update tweet
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    const tweet = await updateTweet(id, body);
    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    console.error('Error updating tweet:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error ? error.toString() : JSON.stringify(error);
    console.error('Full error details:', errorDetails);
    return NextResponse.json(
      {
        error: 'Failed to update tweet',
        details: errorMessage,
        fullError: errorDetails
      },
      { status: 500 }
    );
  }
}

// DELETE /api/tweets/[id] - Delete tweet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    await deleteTweet(id);

    return NextResponse.json(
      { message: 'Tweet deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting tweet:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error ? error.toString() : JSON.stringify(error);
    console.error('Full error details:', errorDetails);
    return NextResponse.json(
      {
        error: 'Failed to delete tweet',
        details: errorMessage,
        fullError: errorDetails
      },
      { status: 500 }
    );
  }
}

// PUT /api/tweets/[id]/toggle - Toggle tweet visibility
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { is_active } = body;

    const tweet = await toggleTweetVisibility(id, is_active);
    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    console.error('Error toggling tweet visibility:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error ? error.toString() : JSON.stringify(error);
    console.error('Full error details:', errorDetails);
    return NextResponse.json(
      {
        error: 'Failed to toggle tweet visibility',
        details: errorMessage,
        fullError: errorDetails
      },
      { status: 500 }
    );
  }
}
