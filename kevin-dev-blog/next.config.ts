import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    url: process.env.GHOST_URL!,
    key: process.env.GHOST_API_KEY!,
  },
}

export default nextConfig
