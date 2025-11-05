'use client'

import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import RichTextEditor from './RichTextEditor'
import TagSelector from './TagSelector'
import { formatDateTime, calculateReadTime } from '@/lib/article-utils'
import styles from './ArticleForm.module.css'

interface ArticleFormProps {
  initialData?: {
    id?: string
    title: string
    excerpt?: string
    content: string
    featured_image?: string
    status: 'draft' | 'published' | 'archived'
    author_id?: string
    tags?: Array<{ id: string }>
  }
  onSuccess?: () => void
}

export default function ArticleForm({ initialData, onSuccess }: ArticleFormProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const isEditing = !!initialData?.id

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    featured_image: initialData?.featured_image || '',
    status: (initialData?.status || 'draft') as 'draft' | 'published',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.featured_image || ''
  )
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initialData?.tags?.map((tag) => tag.id) || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Sync selected tags when initialData changes
  useEffect(() => {
    if (initialData?.tags) {
      const tagIds = initialData.tags.map((tag) => tag.id)
      setSelectedTagIds(tagIds)
    }
  }, [initialData?.id])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setImageFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'article-featured')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to upload image')
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!formData.title.trim()) {
        throw new Error('Title is required')
      }

      if (!formData.content.trim()) {
        throw new Error('Content is required')
      }

      let featuredImageUrl = formData.featured_image

      // Upload new image if provided
      if (imageFile) {
        featuredImageUrl = await uploadImage(imageFile)
      }

      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image: featuredImageUrl,
        status: formData.status,
        tags: selectedTagIds,
        ...(formData.status === 'published' && {
          published_at: new Date().toISOString(),
        }),
      }

      const url = isEditing
        ? `/api/articles/${initialData?.id}`
        : '/api/articles'
      const method = isEditing ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} article`)
      }

      setSuccess(true)

      // Only redirect on create, not on edit
      if (!isEditing) {
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            router.push('/admin/articles')
          }
        }, 1500)
      } else {
        // On edit, just show success message for 2 seconds then clear it
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!session?.user) {
    return (
      <div className={styles.container}>
        <div className={styles.alert + ' ' + styles.errorAlert}>
          Please log in to create articles
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>
          {isEditing ? 'Edit Article' : 'Create New Article'}
        </h1>

        {isEditing && initialData && (
          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Published:</span>
              <span className={styles.metaValue}>
                {initialData.published_at ? (
                  <>
                    {formatDateTime(initialData.published_at)}
                    <span className={styles.readTime}>
                      • {calculateReadTime(formData.content)} min read
                    </span>
                  </>
                ) : (
                  'Draft (Not published yet)'
                )}
              </span>
            </div>
          </div>
        )}

        {error && <div className={styles.alert + ' ' + styles.errorAlert}>{error}</div>}
        {success && (
          <div className={styles.alert + ' ' + styles.successAlert}>
            Article {isEditing ? 'updated' : 'created'} successfully!
          </div>
        )}

        {/* Title */}
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter article title"
            disabled={isLoading}
            className={styles.input}
            required
          />
        </div>

        {/* Excerpt */}
        <div className={styles.formGroup}>
          <label htmlFor="excerpt" className={styles.label}>
            Excerpt
          </label>
          <input
            type="text"
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Brief summary of the article"
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        {/* Featured Image */}
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>
            Featured Image
          </label>
          <div className={styles.imageUploadArea}>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
              className={styles.fileInput}
            />
            <label htmlFor="image" className={styles.fileLabel}>
              Click to select image or drag and drop
            </label>
          </div>

          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" />
              <p className={styles.imageInfo}>
                {imageFile ? imageFile.name : 'Current image'}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Content *
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            disabled={isLoading}
          />
          {!formData.content && (
            <small className={styles.error}>Content is required</small>
          )}
        </div>

        {/* Tags */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Tags
          </label>
          <TagSelector
            selectedTagIds={selectedTagIds}
            onTagsChange={setSelectedTagIds}
            disabled={isLoading}
          />
          <small className={styles.hint}>
            Select tags to categorize your article (e.g., DeFi, Web3, Bitcoin)
          </small>
        </div>

        {/* Status */}
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.select}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isLoading || success}
            className={styles.submitButton}
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/articles')}
            disabled={isLoading}
            className={styles.backButton}
          >
            Back to Articles
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
