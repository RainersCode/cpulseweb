import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Wrapper from '@/layouts/Wrapper';
import ArticleDetail from '@/components/article/ArticleDetail';
import { getArticleById } from '@/lib/articles';

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.coinpulse.tech';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  // Return empty array to generate on-demand
  // or fetch actual articles if you want pre-rendering
  return [];
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await getArticleById(id);

    if (!article || article.status !== 'published') {
      return {
        title: 'Article Not Found',
        description: 'The article you are looking for does not exist.',
      };
    }

    const articleUrl = `${baseUrl}/articles/${id}`;
    const description = article.excerpt || article.content.substring(0, 160);

    // Fallback OG image URL using our logo
    const defaultOgImageUrl = `${baseUrl}/logo/coinpulse-og-image.png`;

    // Try to use featured image first, fall back to default OG image
    let imageUrl = article.featured_image || defaultOgImageUrl;

    // If featured image is from Supabase, proxy it through our server
    // This ensures Twitter can access it reliably
    if (article.featured_image && article.featured_image.includes('supabase')) {
      imageUrl = `${baseUrl}/api/og-image-proxy?url=${encodeURIComponent(article.featured_image)}`;
    }

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

    const metadata: Metadata = {
      title: article.title + ' | CoinPulse',
      description,
      alternates: {
        canonical: articleUrl,
      },
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

    console.log(`[generateMetadata] Article: ${article.title}, Image: ${imageUrl}`);
    return metadata;
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
