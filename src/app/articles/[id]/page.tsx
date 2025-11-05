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

    return {
      title: article.title + ' | CoinPulse',
      description: article.excerpt || article.content.substring(0, 160),
      openGraph: {
        title: article.title,
        description: article.excerpt || article.content.substring(0, 160),
        images: article.featured_image ? [{ url: article.featured_image }] : [],
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
