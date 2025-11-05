
import Link from 'next/link';
import React from 'react';

const BlogArea = () => {
  const articles = [
    {
      id: 1,
      title: "How to Use Market Sentiment Analysis for Better Trading",
      category: "Education",
      date: "Oct 28, 2025",
      excerpt: "Learn how to interpret market sentiment indicators and use them to make more informed trading decisions with CoinPulse Bot.",
      link: "/blog-details"
    },
    {
      id: 2,
      title: "Complete Guide to Sector-Based Coin Selection",
      category: "Guides",
      date: "Oct 25, 2025",
      excerpt: "Understand how different crypto sectors work and how to identify the best coins within each sector using our bot.",
      link: "/blog-details"
    },
    {
      id: 3,
      title: "Risk Management Strategies for Crypto Traders",
      category: "Trading Tips",
      date: "Oct 22, 2025",
      excerpt: "Master essential risk management techniques to protect your capital while trading cryptocurrencies.",
      link: "/blog-details"
    }
  ];

  return (
    <>
      <div className="blog-wrapper">
      <div className="divider"></div>

      <div className="container">
         <div className="row">
            <div className="col-12">
               <div className="section-heading d-md-flex align-items-end justify-content-between">
                  <h2 className="mb-4 mb-md-0">Crypto Trading Guides <br />& Tips</h2>
                  <Link href="/blog" className="btn btn-primary"><span>ALL ARTICLES</span><span>ALL ARTICLES</span></Link>
               </div>
            </div>
         </div>
      </div>

      <div className="divider-sm"></div>

      <div className="container">
         <div className="row g-4">
            {articles.map((article) => (
              <div key={article.id} className="col-12 col-md-6 col-lg-4">
                 <div className="blog-card">
                    <div className="blog-image-placeholder bg-light d-flex align-items-center justify-content-center" style={{ height: '200px', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#ddd' }}>article</span>
                    </div>
                    <div className="blog-meta d-flex align-items-center">
                       <Link href="#" className="text-decoration-none">{article.date}</Link>
                       <div className="dot"></div>
                       <Link href="#" className="text-decoration-none">{article.category}</Link>
                    </div>
                    <Link className="post-title" href={article.link}>{article.title}</Link>
                    <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>{article.excerpt}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="divider"></div>
   </div>
    </>
  );
};

export default BlogArea;