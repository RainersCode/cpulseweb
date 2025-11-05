import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import ArticleForm from '@/components/admin/ArticleForm'
import { getArticleById } from '@/lib/articles'

export const metadata = {
  title: 'Edit Article | Admin',
  description: 'Edit article',
}

interface EditArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const session = await getServerSession(authOptions)
  const { id } = await params

  if (!session?.user) {
    redirect('/login')
  }

  try {
    const article = await getArticleById(id)

    if (!article) {
      redirect('/admin/articles')
    }

    // Check if user is the author
    if (article.author_id !== session.user.id) {
      redirect('/admin/articles')
    }

    return <ArticleForm initialData={article} />
  } catch (error) {
    redirect('/admin/articles')
  }
}
