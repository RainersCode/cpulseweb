'use client'

import { useState, useEffect } from 'react'
import { Tag } from '@/lib/supabase-types'
import { getAllTags } from '@/lib/tags'
import styles from './TagSelector.module.css'

interface TagSelectorProps {
  selectedTagIds: string[]
  onTagsChange: (tagIds: string[]) => void
  disabled?: boolean
}

export default function TagSelector({
  selectedTagIds,
  onTagsChange,
  disabled = false,
}: TagSelectorProps) {
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true)
        const tags = await getAllTags()
        setAllTags(tags)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tags')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTags()
  }, [])

  const handleTagClick = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onTagsChange(selectedTagIds.filter((id) => id !== tagId))
    } else {
      onTagsChange([...selectedTagIds, tagId])
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading tags...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.tagSelector}>
      <div className={styles.tagsContainer}>
        {allTags.length === 0 ? (
          <p className={styles.noTags}>No tags available</p>
        ) : (
          allTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagClick(tag.id)}
              disabled={disabled}
              className={`${styles.tag} ${
                selectedTagIds.includes(tag.id) ? styles.selected : ''
              }`}
              style={{
                backgroundColor: selectedTagIds.includes(tag.id) ? tag.color : 'transparent',
                borderColor: tag.color,
                color: selectedTagIds.includes(tag.id) ? 'white' : tag.color,
              }}
              title={`${selectedTagIds.includes(tag.id) ? 'Remove' : 'Add'} ${tag.name}`}
            >
              {tag.name}
            </button>
          ))
        )}
      </div>

      {selectedTagIds.length > 0 && (
        <div className={styles.selectedInfo}>
          <small>
            Selected: {selectedTagIds.length} tag{selectedTagIds.length !== 1 ? 's' : ''}
          </small>
        </div>
      )}
    </div>
  )
}
