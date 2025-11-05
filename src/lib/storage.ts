import { supabaseAdmin } from './supabase'

const BUCKET_NAME = 'article-images'

// Upload an image file (uses service role key to bypass RLS)
export async function uploadImage(file: File, folder: string = ''): Promise<string> {
  if (!file) throw new Error('No file provided')

  // Generate unique filename
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}-${random}.${extension}`
  const filepath = folder ? `${folder}/${filename}` : filename

  const admin = supabaseAdmin()

  const { data, error } = await admin.storage
    .from(BUCKET_NAME)
    .upload(filepath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  // Get public URL
  const { data: publicData } = admin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filepath)

  return publicData.publicUrl
}

// Delete an image file
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract filepath from URL
    const urlObj = new URL(url)
    const parts = urlObj.pathname.split('/storage/v1/object/public/' + BUCKET_NAME + '/')
    const filepath = parts[1]

    if (!filepath) return

    const admin = supabaseAdmin()

    const { error } = await admin.storage
      .from(BUCKET_NAME)
      .remove([filepath])

    if (error) throw error
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}

// Get public URL for a filepath
export function getPublicUrl(filepath: string): string {
  const admin = supabaseAdmin()
  const { data } = admin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filepath)

  return data.publicUrl
}
