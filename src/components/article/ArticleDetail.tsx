'use client';

import React, { useState } from 'react';
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
  author?: { id: string; name: string; email: string };
}

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const [copied, setCopied] = useState(false);

  const readTime = calculateReadTime(article.content);
  const publishDate = formatDate(article.published_at);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse HTML content and extract first paragraph for excerpt
  const stripHtml = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const contentText = stripHtml(article.content);
  const firstParagraph = contentText.split('\n')[0] || article.excerpt || '';

  return (
    <>
      <HeaderOne />

      {/* Hero/Featured Image Section */}
      {article.featured_image && (
        <section
          className="article-featured-image"
          style={{
            width: '100%',
            height: '500px',
            backgroundImage: `url('${article.featured_image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)',
            }}
          />
        </section>
      )}

      {/* Main Article Content */}
      <article className="article-detail-wrapper">
        <div className="container" style={{ maxWidth: '900px', paddingTop: '60px', paddingBottom: '80px' }}>
          {/* Article Header */}
          <div className="article-header" style={{ marginBottom: '40px' }}>
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag.id}
                    style={{
                      background: '#ECC80B',
                      color: '#0E0E0E',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '8px 16px',
                      borderRadius: '8px',
                      display: 'inline-block',
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              {article.title}
            </h1>

            {/* Meta Information */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                paddingBottom: '24px',
                borderBottom: '1px solid rgba(236, 200, 11, 0.2)',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', color: '#ECC80B' }}>📅</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{publishDate}</div>
                  <div style={{ fontSize: '12px', color: '#8B8B94' }}>Published</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', color: '#ECC80B' }}>⏱️</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{readTime} min</div>
                  <div style={{ fontSize: '12px', color: '#8B8B94' }}>Read time</div>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '10px 16px',
                  background: '#ECC80B',
                  color: '#0E0E0E',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#FFD700';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#ECC80B';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                {copied ? '✓ Copied' : '🔗 Copy Link'}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 16px',
                  background: 'rgba(236, 200, 11, 0.1)',
                  color: '#ECC80B',
                  border: '1px solid rgba(236, 200, 11, 0.3)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(236, 200, 11, 0.2)';
                  e.currentTarget.style.borderColor = '#ECC80B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(236, 200, 11, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.3)';
                }}
              >
                𝕏 Share
              </a>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="article-content"
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '60px',
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Footer */}
          <div
            style={{
              paddingTop: '40px',
              borderTop: '1px solid rgba(236, 200, 11, 0.2)',
              marginBottom: '60px',
            }}
          >
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Related Tags</h3>
              {article.tags && article.tags.length > 0 ? (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/news?tag=${tag.id}`}
                      style={{
                        background: 'rgba(236, 200, 11, 0.1)',
                        color: '#ECC80B',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '1px solid rgba(236, 200, 11, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(236, 200, 11, 0.2)';
                        e.currentTarget.style.borderColor = '#ECC80B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(236, 200, 11, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.2)';
                      }}
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#8B8B94' }}>No tags available</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(236, 200, 11, 0.2)',
            }}
          >
            <Link
              href="/articles"
              style={{
                flex: 1,
                padding: '16px 24px',
                background: '#ECC80B',
                color: '#0E0E0E',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFD700';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ECC80B';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ← Back to Articles
            </Link>
            <Link
              href="/"
              style={{
                flex: 1,
                padding: '16px 24px',
                background: 'rgba(236, 200, 11, 0.1)',
                color: '#ECC80B',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
                border: '1px solid rgba(236, 200, 11, 0.2)',
                transition: 'all 0.3s ease',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(236, 200, 11, 0.2)';
                e.currentTarget.style.borderColor = '#ECC80B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(236, 200, 11, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.2)';
              }}
            >
              Go to Home
            </Link>
          </div>
        </div>
      </article>

      <FooterOne />
    </>
  );
};

export default ArticleDetail;
