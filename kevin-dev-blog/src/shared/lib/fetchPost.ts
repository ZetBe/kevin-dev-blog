// src/api/fetch-post.ts
import api from './ghost'

export async function fetchPostBySlug(slug: string) {
  try {
    const post = await api.posts.read({ slug }, { include: 'authors' })
    return post
  } catch (error) {
    console.error('[Ghost API] 포스트 로딩 실패:', error)
    return null
  }
}
