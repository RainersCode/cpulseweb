/**
 * Calculate estimated reading time based on content
 * Average reading speed is ~200 words per minute
 */
export function calculateReadTime(htmlContent: string): number {
  // Remove HTML tags
  const plainText = htmlContent.replace(/<[^>]*>/g, ' ')

  // Count words (split by whitespace)
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  // Calculate minutes (minimum 1 minute)
  const minutes = Math.max(1, Math.ceil(words / 200))

  return minutes
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Not published'

  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Check if today
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today'
  }

  // Check if yesterday
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday'
  }

  // Format as "Jan 15, 2024"
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format date with time
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return 'Not published'

  const date = new Date(dateString)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
