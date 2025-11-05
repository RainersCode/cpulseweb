'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDate, calculateReadTime } from '@/lib/article-utils'
import styles from './Articles.module.css'

interface Article {
  id: string
  title: string
  excerpt?: string
  content: string
  status: string
  created_at: string
  updated_at: string
  published_at?: string
}

export default function AdminArticlesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/')
    }
  }, [status, session?.user?.role, router])

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return

    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/articles`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }

        const allArticles = await response.json()
        setArticles(allArticles)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [status, session?.user])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete article')
      }

      setArticles((prev) => prev.filter((article) => article.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete article')
    }
  }

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Will redirect via useEffect
  }

  if (session?.user?.role !== 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.message}>Admin access required</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Articles</h1>
        <Link href="/admin/articles/new" className={styles.createButton}>
          Create Article
        </Link>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {isLoading ? (
        <div className={styles.loading}>Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className={styles.empty}>
          <p>No articles yet.</p>
          <Link href="/admin/articles/new" className={styles.createLink}>
            Create your first article
          </Link>
        </div>
      ) : (
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Published</th>
                <th>Read Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <div className={styles.titleCell}>
                      <strong>{article.title}</strong>
                      {article.excerpt && (
                        <p className={styles.excerpt}>{article.excerpt}</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[article.status]}`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td>
                    <span className={styles.publishDate}>
                      {article.published_at ? formatDate(article.published_at) : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <span className={styles.readTime}>
                      {calculateReadTime(article.content)} min
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className={styles.editButton}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back Button */}
      <div style={{ marginTop: '40px', paddingBottom: '40px' }}>
        <Link href="/admin" style={{
          color: '#666',
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          ← Back to Admin
        </Link>
      </div>
    </div>
  )
}
