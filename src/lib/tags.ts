import { supabase, supabaseAdmin } from './supabase'
import { Tag } from './supabase-types'

// Fetch all tags
export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data as Tag[]
}

// Fetch tags for a specific article
export async function getArticleTags(articleId: string): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('article_tags')
    .select('tags(*)')
    .eq('article_id', articleId)

  if (error) throw error

  // Extract tags from the response
  return data?.map((item: any) => item.tags) || []
}

// Add tags to an article
export async function addArticleTags(articleId: string, tagIds: string[]): Promise<void> {
  if (tagIds.length === 0) return

  const insertData = tagIds.map((tagId) => ({
    article_id: articleId,
    tag_id: tagId,
  }))

  const { error } = await supabaseAdmin()
    .from('article_tags')
    .insert(insertData)

  if (error) throw error
}

// Remove all tags from an article
export async function removeArticleTags(articleId: string): Promise<void> {
  const { error } = await supabaseAdmin()
    .from('article_tags')
    .delete()
    .eq('article_id', articleId)

  if (error) throw error
}

// Update article tags
export async function updateArticleTags(articleId: string, tagIds: string[]): Promise<void> {
  // Remove existing tags
  await removeArticleTags(articleId)

  // Add new tags
  if (tagIds.length > 0) {
    await addArticleTags(articleId, tagIds)
  }
}

// Create a new tag
export async function createTag(name: string, color: string = '#4f46e5'): Promise<Tag> {
  // Generate slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-')

  const { data, error } = await supabase
    .from('tags')
    .insert([{ name, slug, color }])
    .select()
    .single()

  if (error) throw error
  return data as Tag
}
