import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { createArticle, getArticles, searchArticles } from '@/lib/articles'
import { addArticleTags } from '@/lib/tags'

// GET /api/articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    let articles

    if (query) {
      articles = await searchArticles(query)
    } else {
      articles = await getArticles(limit)
    }

    return NextResponse.json(articles, { status: 200 })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles (create new article)
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { title, content, excerpt, featured_image, status = 'draft', tags = [] } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Use the authenticated user's ID as the author
    const article = await createArticle({
      title,
      content,
      excerpt,
      featured_image,
      status,
      author_id: session.user.id!,
    })

    // Add tags to article
    if (tags.length > 0) {
      try {
        await addArticleTags(article.id, tags)
      } catch (tagError) {
        console.warn('Failed to add tags to article:', tagError)
        // Continue even if tags fail
      }
    }

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
