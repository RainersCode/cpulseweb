'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateReadTime, formatDate } from '@/lib/article-utils';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  status: string;
  published_at?: string;
  tags?: Array<{ id: string; name: string }>;
}

const NewsPage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<Array<{ id: string; name: string }>>([]);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const fetchedArticles: Article[] = await response.json();

        // Transform articles
        const transformedArticles = fetchedArticles.map((article) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          date: formatDate(article.published_at),
          image: article.featured_image || '/assets/img/crypto-news/default.jpg',
          readTime: calculateReadTime(article.content),
          tags: article.tags || [],
          link: `/articles/${article.id}`,
        }));

        setArticles(transformedArticles);

        // Extract unique tags
        const tagsSet = new Set<string>();
        const tagsMap = new Map<string, { id: string; name: string }>();
        fetchedArticles.forEach((article) => {
          article.tags?.forEach((tag) => {
            if (!tagsSet.has(tag.id)) {
              tagsSet.add(tag.id);
              tagsMap.set(tag.id, tag);
            }
          });
        });

        setAllTags(Array.from(tagsMap.values()));
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles by selected tag
  const filteredArticles =
    !selectedTag
      ? articles
      : articles.filter((article) =>
          article.tags.some((tag: any) => tag.id === selectedTag)
        );

  return (
    <>
      {/* Main Content */}
      <section className="news-content-wrapper py-5">
        <div className="container">
          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="row mb-5">
              <div className="col-12">
                <div className="tag-filter d-flex flex-wrap gap-2 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="500ms">
                  <button
                    onClick={() => setSelectedTag(null)}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '10px 20px',
                      border: `2px solid ${!selectedTag ? '#ECC80B' : 'rgba(236, 200, 11, 0.3)'}`,
                      borderRadius: '8px',
                      background: !selectedTag ? '#ECC80B' : 'transparent',
                      color: !selectedTag ? '#0E0E0E' : '#8B8B94',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTag) {
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.6)';
                        e.currentTarget.style.color = '#ECC80B';
                        e.currentTarget.style.backgroundColor = 'rgba(236, 200, 11, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTag) {
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.3)';
                        e.currentTarget.style.color = '#8B8B94';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    All Articles
                  </button>

                  {allTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setSelectedTag(tag.id)}
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '10px 20px',
                        border: `2px solid ${selectedTag === tag.id ? '#ECC80B' : 'rgba(236, 200, 11, 0.3)'}`,
                        borderRadius: '8px',
                        background: selectedTag === tag.id ? '#ECC80B' : 'transparent',
                        color: selectedTag === tag.id ? '#0E0E0E' : '#8B8B94',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTag !== tag.id) {
                          e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.6)';
                          e.currentTarget.style.color = '#ECC80B';
                          e.currentTarget.style.backgroundColor = 'rgba(236, 200, 11, 0.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTag !== tag.id) {
                          e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.3)';
                          e.currentTarget.style.color = '#8B8B94';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="text-muted">Loading articles...</p>
              </div>
            </div>
          )}

          {/* Articles Grid - Modern Card Layout */}
          {!isLoading && filteredArticles.length > 0 && (
            <div className="row g-4">
              {filteredArticles.map((article, index) => (
                <div key={article.id} className="col-12 col-md-6 col-lg-4">
                  <Link
                    href={article.link}
                    style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                  >
                    <article
                      className="news-card-modern wow fadeInUp"
                      data-wow-duration="1000ms"
                      data-wow-delay={`${300 + index * 100}ms`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)',
                        border: '1px solid rgba(236, 200, 11, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 200, 11, 0.15) 0%, rgba(236, 200, 11, 0.08) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-12px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                    {/* Featured Image */}
                    <div
                      style={{
                        width: '100%',
                        height: '220px',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(236, 200, 11, 0.1)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLImageElement).style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLImageElement).style.transform = 'scale(1)';
                        }}
                      />
                    </div>

                    {/* Card Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', flex: 1 }}>
                      {/* Tags */}
                      {article.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {article.tags.slice(0, 2).map((tag: any) => (
                            <span
                              key={tag.id}
                              style={{
                                background: '#ECC80B',
                                color: '#0E0E0E',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '6px 12px',
                                borderRadius: '6px',
                                display: 'inline-block',
                              }}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          marginBottom: '16px',
                          marginTop: '0',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        } as any}
                      >
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <p
                          style={{
                            fontSize: '13px',
                            color: '#8B8B94',
                            marginBottom: '16px',
                            marginTop: '0',
                            lineHeight: '1.6',
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          } as any}
                        >
                          {article.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div
                        className="article-meta d-flex align-items-center gap-2"
                        style={{
                          marginBottom: '16px',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(236, 200, 11, 0.15)',
                        }}
                      >
                        <span style={{ color: '#8B8B94', fontSize: '12px' }}>
                          {article.date}
                        </span>
                        <span style={{ color: '#8B8B94', fontSize: '12px' }}>•</span>
                        <span style={{ color: '#8B8B94', fontSize: '12px' }}>
                          {article.readTime} min
                        </span>
                      </div>

                      {/* Read More Link */}
                      <span
                        style={{
                          color: '#ECC80B',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ECC80B')}
                      >
                        Read Article →
                      </span>
                    </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* No Articles Found */}
          {!isLoading && filteredArticles.length === 0 && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="text-muted" style={{ fontSize: '16px' }}>
                  No articles found for this filter.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section-news py-5">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <h2 className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="700ms" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.3 }}>
                Ready to Make Smarter Crypto Decisions?
              </h2>
            </div>
            <div className="col-12 col-lg-6">
              <p className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="900ms" style={{ color: '#8B8B94', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
                Get AI-powered market insights, real-time analysis, and intelligent trading suggestions. Join thousands of crypto traders using CoinPulse to optimize their investment strategy.
              </p>
              <a
                href="https://t.me/CryptoOleBot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="1100ms"
                style={{ minWidth: '280px' }}
              >
                <span>Launch CoinPulse Bot</span>
                <span>Launch CoinPulse Bot</span>
              </a>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>

      <FooterOne />
    </>
  );
};

export default NewsPage;
