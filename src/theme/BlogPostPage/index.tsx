import React, { type ReactNode } from 'react'
import BlogPostPage from '@theme-original/BlogPostPage'
import type BlogPostPageType from '@theme/BlogPostPage'
import type { WrapperProps } from '@docusaurus/types'
import Comments from '@site/src/components/comments'

type Props = WrapperProps<typeof BlogPostPageType>

export default function BlogPostPageWrapper(props: Props): ReactNode {
  return (
    <>
      <BlogPostPage {...props} />
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ marginTop: '48px' }}>
          <Comments />
          <p>댓글</p>
        </div>
      </div>
    </>
  )
}
