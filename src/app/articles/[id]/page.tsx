import { notFound } from 'next/navigation';
import Wrapper from '@/layouts/Wrapper';
import ArticleDetail from '@/components/article/ArticleDetail';
import { getArticleById } from '@/lib/articles';

export const revalidate = 60;

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;

  try {
    const article = await getArticleById(id);

    if (!article || article.status !== 'published') {
      return {
        title: 'Article Not Found',
        description: 'The article you are looking for does not exist.',
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.coinpulse.tech';
    const articleUrl = `${baseUrl}/articles/${id}`;
    const description = article.excerpt || article.content.substring(0, 160);

    // Generate OG image URL using our endpoint (always works, Twitter can access it)
    const ogImageUrl = `${baseUrl}/api/og-image?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(description)}`;

    // Try to use featured image first, fall back to generated OG image
    const imageUrl = article.featured_image || ogImageUrl;

    const imageData = imageUrl
      ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ]
      : [];

    return {
      title: article.title + ' | CoinPulse',
      description,
      openGraph: {
        type: 'article',
        title: article.title,
        description,
        url: articleUrl,
        images: imageData,
        siteName: 'CoinPulse',
        publishedTime: article.published_at,
      },
      twitter: {
        card: imageUrl ? 'summary_large_image' : 'summary',
        title: article.title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article',
      description: 'Read our latest crypto article',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  try {
    const article = await getArticleById(id);

    if (!article || article.status !== 'published') {
      notFound();
    }

    return (
      <Wrapper>
        <ArticleDetail article={article} />
      </Wrapper>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}
