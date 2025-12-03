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

    // Use image proxy to serve featured image (works better with Twitter crawler)
    const imageUrl = article.featured_image
      ? `${baseUrl}/api/image-proxy?url=${encodeURIComponent(article.featured_image)}`
      : null;

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
        card: 'summary_large_image',
        title: article.title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
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
