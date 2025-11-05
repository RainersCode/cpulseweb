"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SvgBgDecorator from './SvgBgDecorator';

interface Tweet {
  id: string;
  tweet_url: string;
  tweet_id: string;
  author?: string;
  content?: string;
  created_at: string;
  is_active: boolean;
  display_order: number;
  embed_html?: string;
}

declare global {
  interface Window {
    twttr: any;
  }
}

const TwitterFeedArea = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tweets (embed HTML is fetched server-side)
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tweets');

        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }

        const data = await response.json();
        console.log('Tweets fetched:', data.length, 'tweets');
        data.forEach((tweet: Tweet) => {
          console.log(`Tweet ${tweet.tweet_id}: embed_html=${!!tweet.embed_html}`);
        });
        setTweets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching tweets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  // Load Twitter widget script when tweets are ready
  useEffect(() => {
    if (tweets.length > 0) {
      // Load the Twitter widget script
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);

      // Give the script time to process
      const timer = setTimeout(() => {
        if (window.twttr?.widgets?.load) {
          window.twttr.widgets.load();
        }
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [tweets]);

  return (
    <>
      <section className="twitter-feed-wrapper bg-secondary py-5" style={{ position: 'relative' }}>
        <SvgBgDecorator side="right" size="45%" opacity={0.1} />
        <div className="divider"></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <div className="section-heading">
                <h2 className="mb-3 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                  Latest Updates from CoinPulse
                </h2>
                <p className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms" style={{ color: '#8B8B94', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 500 }}>
                  Follow us on Twitter for real-time market insights
                </p>
                <Link
                  href="https://twitter.com/cpulse_crypto"
                  target="_blank"
                  className="btn btn-primary mt-3 wow fadeInUp"
                  data-wow-duration="1000ms"
                  data-wow-delay="500ms"
                >
                  <span>Follow on Twitter</span>
                  <span>Follow on Twitter</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid rgba(236, 200, 11, 0.2)',
                      borderTop: '4px solid #ECC80B',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <p className="text-muted">Fetching tweets...</p>
                </div>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="text-danger">Error loading tweets: {error}</p>
              </div>
            </div>
          )}

          {/* Tweets Bento Grid */}
          {!isLoading && tweets.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '2rem',
              }}
            >
              {tweets.map((tweet, index) => {
                // Create a bento grid pattern: alternate between different sizes
                const isLarge = index % 5 === 0; // Every 5th tweet is larger
                const isWide = index % 5 === 1; // Every 5th+1 tweet is wider

                return (
                  <div
                    key={tweet.id}
                    className="twitter-card wow fadeInUp"
                    data-wow-duration="1000ms"
                    data-wow-delay={`${600 + index * 150}ms`}
                    style={{
                      gridColumn: isWide ? 'span 1' : 'span 1',
                      gridRow: isLarge ? 'span 2' : 'span 1',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      border: 'none',
                      padding: '0',
                      background: 'transparent',
                      overflow: 'hidden',
                      minHeight: isLarge ? '600px' : '300px',
                    }}
                  >
                    {tweet.embed_html ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: tweet.embed_html }}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '12px',
                          width: '100%',
                        }}
                      />
                    ) : (
                      <blockquote
                        className="twitter-tweet"
                        data-theme="dark"
                        data-width="100%"
                        style={{
                          flex: 1,
                          margin: '0',
                          borderRadius: '12px',
                          width: '100%',
                        }}
                      >
                        <a href={tweet.tweet_url} target="_blank" rel="noopener noreferrer">
                          {tweet.content || `Tweet by ${tweet.author || 'CoinPulse'}`}
                        </a>
                      </blockquote>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && tweets.length === 0 && !error && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="text-muted">No tweets yet. Add tweets from the admin panel.</p>
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>
      </section>
    </>
  );
};

export default TwitterFeedArea;
