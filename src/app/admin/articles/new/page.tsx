import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import ArticleForm from '@/components/admin/ArticleForm'

export const metadata = {
  title: 'Create Article | Admin',
  description: 'Create a new article',
}

export default async function CreateArticlePage() {
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/login')
  }

  return <ArticleForm />
}
