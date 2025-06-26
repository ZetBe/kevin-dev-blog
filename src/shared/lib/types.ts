// types.ts
export type GhostPost = {
  id: string
  uuid: string
  slug: string
  title: string
  html?: string
  plaintext?: string
  excerpt?: string
  custom_excerpt?: string
  feature_image?: string
  featured?: boolean
  visibility?: string
  created_at: string
  updated_at?: string
  published_at: string
  tags?: {
    id: string
    name: string
    slug: string
    description?: string
  }[]
  primary_tag?: {
    id: string
    name: string
    slug: string
  }
  authors?: {
    id: string
    name: string
    slug: string
    profile_image?: string
    bio?: string
  }[]
}
