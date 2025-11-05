'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './TweetsAdmin.module.css';

interface Tweet {
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

const TweetsAdmin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    tweet_url: '',
    author: 'CoinPulse',
    content: '',
    display_order: 0,
  });

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/')
    }
  }, [status, session?.user?.role, router])

  // Fetch tweets
  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return;

    const fetchTweets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tweets');

        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }

        const data = await response.json();
        setTweets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, [status, session?.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!formData.tweet_url.trim()) {
        throw new Error('Tweet URL is required');
      }

      if (!formData.tweet_url.includes('twitter.com') && !formData.tweet_url.includes('x.com')) {
        throw new Error('Please provide a valid Twitter/X URL');
      }

      const method = editingId ? 'PATCH' : 'POST';
      const url = editingId ? `/api/tweets/${editingId}` : '/api/tweets';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.details || errorData.error || errorData.message || 'Failed to save tweet';
        throw new Error(errorMsg);
      }

      const result = await response.json();

      if (editingId) {
        setTweets(tweets.map((t) => (t.id === editingId ? result : t)));
        setSuccess('Tweet updated successfully!');
      } else {
        setTweets([...tweets, result]);
        setSuccess('Tweet added successfully!');
      }

      resetForm();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEdit = (tweet: Tweet) => {
    setFormData({
      tweet_url: tweet.tweet_url,
      author: tweet.author || 'CoinPulse',
      content: tweet.content || '',
      display_order: tweet.display_order,
    });
    setEditingId(tweet.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tweet?')) return;

    try {
      setError(null);
      const response = await fetch(`/api/tweets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tweet');
      }

      setTweets(tweets.filter((t) => t.id !== id));
      setSuccess('Tweet deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tweet');
    }
  };

  const handleToggleVisibility = async (id: string, is_active: boolean) => {
    try {
      const response = await fetch(`/api/tweets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !is_active }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tweet visibility');
      }

      const result = await response.json();
      setTweets(tweets.map((t) => (t.id === id ? result : t)));
      setSuccess(`Tweet ${!is_active ? 'shown' : 'hidden'} successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update tweet');
    }
  };

  const resetForm = () => {
    setFormData({
      tweet_url: '',
      author: 'CoinPulse',
      content: '',
      display_order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect via useEffect
  }

  if (session?.user?.role !== 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.message}>Admin access required</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Tweets</h1>
        <button
          className={styles.createButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Tweet'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{editingId ? 'Edit Tweet' : 'Add New Tweet'}</h2>

          <div className={styles.formGroup}>
            <label htmlFor="tweet_url">Tweet URL *</label>
            <input
              id="tweet_url"
              type="text"
              placeholder="https://twitter.com/cpulse_crypto/status/..."
              value={formData.tweet_url}
              onChange={(e) => setFormData({ ...formData, tweet_url: e.target.value })}
              className={styles.input}
            />
            <small className={styles.hint}>
              Copy the URL from the tweet (click "..." on Twitter/X and select "Copy link to tweet")
            </small>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                placeholder="CoinPulse"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="display_order">Display Order</label>
              <input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Description (Optional)</label>
            <textarea
              id="content"
              placeholder="Brief description of the tweet..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {editingId ? 'Update Tweet' : 'Add Tweet'}
            </button>
            <button type="button" onClick={resetForm} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tweets List */}
      {isLoading && <div className={styles.loading}>Loading tweets...</div>}

      {!isLoading && tweets.length === 0 ? (
        <div className={styles.empty}>
          <p>No tweets yet.</p>
          <button className={styles.createLink} onClick={() => setShowForm(true)}>
            Add your first tweet
          </button>
        </div>
      ) : (
        <div className={styles.tweetsGrid}>
          {tweets.map((tweet, index) => (
            <div key={tweet.id} className={styles.tweetCard}>
              <div className={styles.tweetHeader}>
                <div className={styles.tweetMeta}>
                  <span className={styles.order}>#{tweet.display_order}</span>
                  <span className={styles.author}>{tweet.author || 'CoinPulse'}</span>
                </div>
                <span className={tweet.is_active ? styles.activeBadge : styles.inactiveBadge}>
                  {tweet.is_active ? '✓ Active' : '⊗ Hidden'}
                </span>
              </div>

              <div className={styles.tweetContent}>
                <p>{tweet.content || tweet.tweet_url}</p>
              </div>

              <div className={styles.tweetUrl}>
                <a href={tweet.tweet_url} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>
                  View on Twitter →
                </a>
              </div>

              <div className={styles.tweetActions}>
                <button
                  onClick={() => handleToggleVisibility(tweet.id, tweet.is_active)}
                  className={styles.toggleButton}
                  title={tweet.is_active ? 'Hide tweet' : 'Show tweet'}
                >
                  {tweet.is_active ? '👁️ Hide' : '👁️‍🗨️ Show'}
                </button>
                <button
                  onClick={() => handleEdit(tweet)}
                  className={styles.editButton}
                  title="Edit tweet"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(tweet.id)}
                  className={styles.deleteButton}
                  title="Delete tweet"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back Button */}
      <div className={styles.footer}>
        <Link href="/admin" className={styles.backLink}>
          ← Back to Admin
        </Link>
      </div>
    </div>
  );
};

export default TweetsAdmin;
