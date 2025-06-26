import { notFound } from 'next/navigation'
import { fetchPostBySlug } from '@/shared/lib/fetchPost'

export default async function BlogDetailPage(props: {
  params: { slug: string }
}) {
  const { slug } = await props.params
  const post = await fetchPostBySlug(slug)

  if (!post) return notFound()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* 헤더 */}
        <header className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {(post.published_at || post.created_at) && (
              <time>
                {new Date(
                  post.published_at || post.created_at
                ).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {post.reading_time && <span>• {post.reading_time}분 읽기</span>}
          </div>
        </header>

        {/* 콘텐츠 */}
        <article className="blog-content">
          <div
            dangerouslySetInnerHTML={{
              __html:
                post.html ||
                '<p class="text-gray-500 italic">내용이 없습니다.</p>',
            }}
          />
        </article>

        {/* 태그 */}
        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                태그
              </span>
              {post.tags.map((tag: any, index: number) => (
                <span
                  key={tag.id || index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
