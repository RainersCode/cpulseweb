import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/articles'
import { updateArticleTags } from '@/lib/tags'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET /api/articles/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const article = await getArticleById(id)
    return NextResponse.json(article, { status: 200 })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Article not found' },
      { status: 404 }
    )
  }
}

// PATCH /api/articles/[id] (update article)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { tags, ...articleData } = body

    const updatedArticle = await updateArticle(id, articleData)

    // Update tags if provided
    if (tags && Array.isArray(tags)) {
      try {
        await updateArticleTags(params.id, tags)
      } catch (tagError) {
        console.warn('Failed to update tags:', tagError)
        // Continue even if tags fail
      }
    }

    return NextResponse.json(updatedArticle, { status: 200 })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const { id } = await params
    await deleteArticle(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}
