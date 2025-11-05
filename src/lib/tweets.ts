import { supabase, supabaseAdmin } from './supabase';

export interface Tweet {
  id: string;
  tweet_url: string;
  tweet_id: string;
  author?: string;
  content?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  display_order: number;
}

// Fetch active tweets ordered by display_order (limit parameter for home page)
export async function getActiveTweets(limit?: number) {
  let query = supabaseAdmin()
    .from('tweets')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Tweet[];
}

// Fetch all tweets (for admin)
export async function getAllTweets() {
  const { data, error } = await supabaseAdmin()
    .from('tweets')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Tweet[];
}

// Add a new tweet
export async function addTweet(tweetData: {
  tweet_url: string;
  tweet_id: string;
  author?: string;
  content?: string;
  display_order?: number;
}) {
  const { data, error } = await supabaseAdmin()
    .from('tweets')
    .insert([
      {
        ...tweetData,
        display_order: tweetData.display_order || 0,
        is_active: true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Tweet;
}

// Update a tweet
export async function updateTweet(
  id: string,
  updates: Partial<Omit<Tweet, 'id' | 'created_at'>>
) {
  const { data, error } = await supabaseAdmin()
    .from('tweets')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Tweet;
}

// Toggle tweet visibility
export async function toggleTweetVisibility(id: string, is_active: boolean) {
  const { data, error } = await supabaseAdmin()
    .from('tweets')
    .update({
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Tweet;
}

// Delete a tweet
export async function deleteTweet(id: string) {
  const { error } = await supabaseAdmin()
    .from('tweets')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Save embed HTML to database
export async function saveEmbedHtml(tweetId: string, embedHtml: string) {
  try {
    const { error } = await supabaseAdmin()
      .from('tweets')
      .update({
        embed_html: embedHtml,
        updated_at: new Date().toISOString(),
      })
      .eq('id', tweetId);

    if (error) {
      console.error(`Failed to save embed HTML for tweet ${tweetId}:`, error);
      return false;
    }
    console.log(`Saved embed HTML for tweet ${tweetId}`);
    return true;
  } catch (error) {
    console.error(`Error saving embed HTML for tweet ${tweetId}:`, error);
    return false;
  }
}

// Extract tweet ID from URL
export function extractTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}
