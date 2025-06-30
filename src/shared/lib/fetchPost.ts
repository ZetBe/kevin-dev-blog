// @/shared/lib/fetchPost.ts
import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_API_KEY!,
  version: 'v5.0',
})

export async function fetchPostBySlug(slug: string) {
  return await api.posts.read(
    { slug },
    {
      include: ['tags', 'authors'],
      formats: ['html', 'plaintext'],
    }
  )
}

export async function fetchSeriesPosts(seriesSlug: string) {
  return await api.posts.browse({
    filter: `primary_tag:${seriesSlug}`,
    order: 'published_at ASC',
    include: ['tags'],
    fields: 'id,title,slug,published_at,custom_excerpt,primary_tag',
  })
}
