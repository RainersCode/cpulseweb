import { supabase, supabaseAdmin } from './supabase'
import { deleteImage } from './storage'
import { Article, ArticleWithAuthor } from './supabase-types'

// Fetch all published articles
export async function getArticles(limit?: number) {
  let query = supabase
    .from('articles')
    .select(`
      *,
      author:users(id, name, email)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw error

  // Fetch tags for each article
  const articlesWithTags = await Promise.all(
    (data || []).map(async (article: any) => {
      const { data: tagsData, error: tagsError } = await supabase
        .from('article_tags')
        .select('tags(*)')
        .eq('article_id', article.id)

      if (!tagsError && tagsData) {
        const tags = tagsData.map((item: any) => item.tags)
        return { ...article, tags }
      }

      return article
    })
  )

  return articlesWithTags as ArticleWithAuthor[]
}

// Fetch article by ID with tags
export async function getArticleById(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:users(id, name, email)
    `)
    .eq('id', id)
    .single()

  if (error) throw error

  // Fetch tags for this article
  const { data: tagsData, error: tagsError } = await supabase
    .from('article_tags')
    .select('tags(*)')
    .eq('article_id', id)

  if (!tagsError && tagsData) {
    const tags = tagsData.map((item: any) => item.tags)
    return { ...data, tags } as ArticleWithAuthor
  }

  return data as ArticleWithAuthor
}

// Fetch articles by author
export async function getArticlesByAuthor(authorId: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:users(id, name, email)
    `)
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as ArticleWithAuthor[]
}

// Create a new article
export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabaseAdmin()
    .from('articles')
    .insert([{
      ...article,
      published_at: article.published_at || new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) throw error
  return data as Article
}

// Update an article
export async function updateArticle(id: string, updates: Partial<Omit<Article, 'id' | 'created_at'>>) {
  const { data, error } = await supabaseAdmin()
    .from('articles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Article
}

// Delete an article and its featured image
export async function deleteArticle(id: string) {
  try {
    // Fetch article to get featured image URL
    const { data: article, error: fetchError } = await supabaseAdmin()
      .from('articles')
      .select('featured_image')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the featured image if it exists
    if (article?.featured_image) {
      try {
        await deleteImage(article.featured_image)
      } catch (imgError) {
        console.warn('Failed to delete image, but continuing with article deletion:', imgError)
      }
    }

    // Delete the article
    const { error: deleteError } = await supabaseAdmin().from('articles').delete().eq('id', id)
    if (deleteError) throw deleteError
  } catch (error) {
    console.error('Error deleting article:', error)
    throw error
  }
}

// Search articles by title or content
export async function searchArticles(query: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:users(id, name, email)
    `)
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)

  if (error) throw error

  // Fetch tags for each article
  const articlesWithTags = await Promise.all(
    (data || []).map(async (article: any) => {
      const { data: tagsData, error: tagsError } = await supabase
        .from('article_tags')
        .select('tags(*)')
        .eq('article_id', article.id)

      if (!tagsError && tagsData) {
        const tags = tagsData.map((item: any) => item.tags)
        return { ...article, tags }
      }

      return article
    })
  )

  return articlesWithTags as ArticleWithAuthor[]
}
