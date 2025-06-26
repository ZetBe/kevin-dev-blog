// app/page.tsx
import api from '@/shared/lib/ghost'
import Link from 'next/link'

export default async function Home() {
  const posts = await api.posts.browse({ limit: 10, include: 'authors' })

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 블로그</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(post.published_at!).toLocaleDateString('ko-KR')} ·{' '}
                  {post.primary_author?.name}
                </p>
                <p className="mt-2 text-gray-700">{post.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
