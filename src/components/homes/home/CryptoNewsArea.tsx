"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateReadTime, formatDate } from '@/lib/article-utils';
import SvgBgDecorator from './SvgBgDecorator';

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

const CryptoNewsArea = () => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles?limit=3');

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const articles: Article[] = await response.json();

        // Transform articles to news format
        const transformedNews = articles.map((article) => ({
          id: article.id,
          title: article.title,
          description: article.excerpt || article.content.substring(0, 150),
          date: formatDate(article.published_at),
          source: 'CoinPulse',
          image: article.featured_image || '/assets/img/crypto-news/default.jpg',
          link: `/articles/${article.id}`,
          readTime: calculateReadTime(article.content),
          tags: article.tags || []
        }));

        setNewsItems(transformedNews);

        // Extract unique categories from tags
        const uniqueCategories = new Set<string>();
        uniqueCategories.add('All');
        articles.forEach((article) => {
          article.tags?.forEach((tag) => {
            uniqueCategories.add(tag.name);
          });
        });

        setCategories(Array.from(uniqueCategories));
      } catch (error) {
        console.error('Error fetching articles:', error);
        setNewsItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredNews = selectedCategory === 'All'
    ? newsItems
    : newsItems.filter(item => item.tags.some(tag => tag.name === selectedCategory));

  return (
    <>
      <section className="crypto-news-wrapper py-5" style={{ position: 'relative' }}>
        <SvgBgDecorator side="left" size="35%" opacity={0.1} />
        <div className="divider"></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="section-heading d-md-flex align-items-end justify-content-between">
                <div>
                  <h2 className="mb-3 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                    Latest Crypto News & Updates
                  </h2>
                  <p className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms" style={{ color: '#8B8B94', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 500 }}>
                    Stay informed with the latest cryptocurrency market news
                  </p>
                </div>
                <Link href="/articles" className="btn btn-primary mt-4 mt-md-0 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="500ms">
                  <span>View All News</span>
                  <span>View All News</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="category-filter d-flex flex-wrap gap-2 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="500ms">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '8px 16px',
                      border: `1px solid ${selectedCategory === category ? '#ECC80B' : 'rgba(236, 200, 11, 0.3)'}`,
                      borderRadius: '8px',
                      background: selectedCategory === category ? '#ECC80B' : 'transparent',
                      color: selectedCategory === category ? '#0E0E0E' : '#8B8B94',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.6)';
                        e.currentTarget.style.color = '#ECC80B';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.3)';
                        e.currentTarget.style.color = '#8B8B94';
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="text-muted">Loading articles...</p>
              </div>
            </div>
          )}

          {/* News Cards Grid */}
          {!isLoading && (
          <div className="row g-4">
            {filteredNews.map((news, index) => (
              <div key={news.id} className="col-12 col-md-6 col-lg-4">
                <Link
                  href={news.link}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <div
                    className="news-card wow fadeInUp"
                    data-wow-duration="1000ms"
                    data-wow-delay={`${600 + index * 150}ms`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)',
                      border: '1px solid rgba(236, 200, 11, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 200, 11, 0.15) 0%, rgba(236, 200, 11, 0.08) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                  {/* News Image */}
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: 'rgba(236, 200, 11, 0.1)' }}>
                    <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Card Content */}
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', flex: 1 }}>
                    {/* Tags */}
                    {news.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {news.tags.map((tag) => (
                          <span key={tag.id} style={{ background: '#ECC80B', color: '#0E0E0E', fontSize: '12px', fontWeight: 700, padding: '6px 12px', borderRadius: '6px', display: 'inline-block' }}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* News Title */}
                    <h5 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', marginTop: '0', lineHeight: '1.4', textAlign: 'left' }}>
                      {news.title}
                    </h5>

                    {/* News Description */}
                    <p style={{ fontSize: '13px', color: '#8B8B94', marginBottom: '12px', lineHeight: '1.6', flex: 1, textAlign: 'left', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {news.description}
                    </p>

                    {/* Meta Information */}
                    <div className="news-meta d-flex align-items-center gap-2" style={{ marginBottom: '12px', borderBottom: '1px solid rgba(236, 200, 11, 0.15)', paddingBottom: '12px', width: '100%' }}>
                      <span style={{ color: '#8B8B94', fontSize: '12px' }}>
                        {news.date}
                      </span>
                      <span style={{ color: '#8B8B94', fontSize: '12px' }}>
                        •
                      </span>
                      <span style={{ color: '#8B8B94', fontSize: '12px' }}>
                        {news.readTime} min read
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
                      Read More →
                    </span>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          )}

          {/* If No News Found */}
          {!isLoading && filteredNews.length === 0 && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="text-muted">No articles found for this category.</p>
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>
      </section>
    </>
  );
};

export default CryptoNewsArea;
