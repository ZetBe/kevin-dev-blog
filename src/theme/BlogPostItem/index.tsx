import React, { type ReactNode } from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'
import type BlogPostItemType from '@theme/BlogPostItem'
import type { WrapperProps } from '@docusaurus/types'
import Comments from '@site/src/components/comments'
import { useLocation } from '@docusaurus/router'

type Props = WrapperProps<typeof BlogPostItemType>

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const location = useLocation()

  const isBlogListPage =
    location.pathname === '/blog' || location.pathname === '/blog/'

  const shouldShowComments =
    location.pathname.startsWith('/blog/') && !isBlogListPage

  return (
    <>
      <BlogPostItem {...props} />
      {shouldShowComments && (
        <div className="margin-top--lg">
          <Comments />
        </div>
      )}
    </>
  )
}
