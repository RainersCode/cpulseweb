// Tag types
export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
}

// Database types for articles
export interface Article {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id: string
  featured_image?: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  published_at?: string
}

export interface ArticleWithAuthor extends Article {
  author?: {
    id: string
    name: string
    email: string
  }
  tags?: Tag[]
}

// User type for NextAuth
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  created_at: string
  updated_at: string
}
