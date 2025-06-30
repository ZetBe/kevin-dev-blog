import { notFound } from 'next/navigation'
import { fetchPostBySlug } from '@/shared/lib/fetchPost'
import Link from 'next/link'

// Ghost Post 타입 정의
interface GhostTag {
  id: string
  name: string
  slug: string
  description?: string
}

interface GhostAuthor {
  id: string
  name: string
  slug: string
}

interface GhostPost {
  id: string
  title: string
  slug: string
  html?: string
  feature_image?: string
  feature_image_alt?: string
  feature_image_caption?: string
  custom_excerpt?: string
  published_at?: string
  created_at: string
  reading_time?: number
  primary_tag?: GhostTag
  primary_author?: GhostAuthor
  tags?: GhostTag[]
}

// Ghost API를 통해 시리즈(같은 primary_tag) 포스트들을 가져오는 함수
async function fetchSeriesPosts(
  primaryTag: string,
  currentSlug: string
): Promise<GhostPost[] | null> {
  try {
    // Ghost Content API 호출 예시
    // const posts = await ghostClient.posts.browse({
    //   filter: `primary_tag:${primaryTag}`,
    //   order: 'published_at ASC', // 또는 custom_excerpt에 시리즈 순서 정보 포함
    //   fields: 'id,title,slug,published_at,custom_excerpt'
    // })
    // return posts

    // 임시로 null 반환 (실제 구현 시 위 주석 해제)
    return null
  } catch (error) {
    console.error('Failed to fetch series posts:', error)
    return null
  }
}

export default async function BlogDetailPage(props: {
  params: { slug: string }
}) {
  const { slug } = await props.params
  const post = (await fetchPostBySlug(slug)) as GhostPost | null

  if (!post) return notFound()

  // Ghost에서 시리즈 판단 방법들:
  // 1. primary_tag가 시리즈명인 경우
  // 2. custom_excerpt에 시리즈 정보가 있는 경우
  // 3. 특정 태그 패턴 (예: series-react-tutorial)
  const isPartOfSeries =
    post.primary_tag && post.primary_tag.slug.startsWith('series-')
  const seriesTag = isPartOfSeries ? post.primary_tag : null

  // 시리즈 순서는 custom_excerpt나 제목에서 추출하거나, 발행일 기준으로 정렬
  const seriesOrder = extractSeriesOrder(post)
  const seriesPosts = seriesTag
    ? await fetchSeriesPosts(seriesTag.slug, slug)
    : null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Ghost 시리즈 정보 표시 */}
        {seriesTag && (
          <div className="mb-6 lg:mb-8 p-4 lg:p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              </div>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                시리즈
              </span>
            </div>

            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {seriesTag.name.replace('Series: ', '')}
            </h2>

            {seriesTag.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {seriesTag.description}
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              {seriesOrder && seriesPosts && (
                <span className="text-gray-500 dark:text-gray-400">
                  {seriesOrder}편 / {seriesPosts.length}편
                </span>
              )}

              {/* Ghost의 이전/다음 포스트 네비게이션 */}
              <div className="flex gap-2">
                {seriesPosts && (
                  <>
                    {getPreviousPost(seriesPosts, slug) && (
                      <Link
                        href={`/blog/${
                          getPreviousPost(seriesPosts, slug)?.slug
                        }`}
                        className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        ← 이전편
                      </Link>
                    )}
                    {getNextPost(seriesPosts, slug) && (
                      <Link
                        href={`/blog/${getNextPost(seriesPosts, slug)?.slug}`}
                        className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        다음편 →
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 진행률 바 */}
            {seriesOrder && seriesPosts && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    진행률
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {Math.round((seriesOrder / seriesPosts.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(seriesOrder / seriesPosts.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 헤더 */}
        <header className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight">
            {seriesTag && seriesOrder && (
              <span className="text-lg sm:text-xl font-normal text-blue-600 dark:text-blue-400 block mb-2">
                {seriesTag.name.replace('Series: ', '')} #{seriesOrder}
              </span>
            )}
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
            {post.primary_author && <span>• {post.primary_author.name}</span>}
          </div>
        </header>

        {/* Ghost 피처 이미지 */}
        {post.feature_image && (
          <div className="mb-8 lg:mb-12">
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
            />
            {post.feature_image_caption && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                {post.feature_image_caption}
              </p>
            )}
          </div>
        )}

        {/* 콘텐츠 */}
        <article className="blog-content prose prose-lg dark:prose-invert max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html:
                post.html ||
                '<p class="text-gray-500 italic">내용이 없습니다.</p>',
            }}
          />
        </article>

        {/* 시리즈 목록 */}
        {seriesPosts && seriesPosts.length > 1 && (
          <div className="mt-12 lg:mt-16 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              📚 {seriesTag?.name.replace('Series: ', '')} 시리즈 전체보기
            </h3>
            <div className="space-y-3">
              {seriesPosts.map((seriesPost: GhostPost, index: number) => {
                const postOrder = extractSeriesOrder(seriesPost) || index + 1
                return (
                  <div
                    key={seriesPost.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      seriesPost.slug === post.slug
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        seriesPost.slug === post.slug
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {postOrder}
                    </div>

                    <div className="flex-1">
                      {seriesPost.slug === post.slug ? (
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {seriesPost.title} (현재 글)
                        </span>
                      ) : (
                        <Link
                          href={`/blog/${seriesPost.slug}`}
                          className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {seriesPost.title}
                        </Link>
                      )}
                      {seriesPost.custom_excerpt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {seriesPost.custom_excerpt}
                        </p>
                      )}
                    </div>

                    {seriesPost.published_at && (
                      <time className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(seriesPost.published_at).toLocaleDateString(
                          'ko-KR',
                          {
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </time>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Ghost 태그들 */}
        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                태그
              </span>
              {post.tags
                .filter((tag) => !tag.slug.startsWith('series-')) // 시리즈 태그는 제외
                .map((tag: GhostTag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

// 유틸리티 함수들
function extractSeriesOrder(post: GhostPost): number | null {
  // 방법 1: 제목에서 "Part 1", "1편" 등 추출
  const titleMatch = post.title.match(/(?:Part\s*|파트\s*|편\s*)(\d+)/i)
  if (titleMatch) return parseInt(titleMatch[1])

  // 방법 2: custom_excerpt에서 순서 정보 추출
  if (post.custom_excerpt) {
    const excerptMatch = post.custom_excerpt.match(
      /(?:시리즈\s*)?(\d+)(?:편|부)/i
    )
    if (excerptMatch) return parseInt(excerptMatch[1])
  }

  // 방법 3: slug에서 숫자 추출
  const slugMatch = post.slug.match(/-(\d+)$/)
  if (slugMatch) return parseInt(slugMatch[1])

  return null
}

function getPreviousPost(
  posts: GhostPost[],
  currentSlug: string
): GhostPost | null {
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug)
  return currentIndex > 0 ? posts[currentIndex - 1] : null
}

function getNextPost(
  posts: GhostPost[],
  currentSlug: string
): GhostPost | null {
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug)
  return currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
}
