// src/theme/BlogPostItem/index.tsx

import React, { type ReactNode } from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import type BlogPostItemType from "@theme/BlogPostItem";
import type { WrapperProps } from "@docusaurus/types";
import Comments from "@site/src/components/comments";
import { useLocation } from "@docusaurus/router";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { ImageZoomProvider } from "@site/src/theme/ImageZoomContext";

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const location = useLocation();
  const isBlogListPage =
    location.pathname === "/blog" || location.pathname === "/blog/";
  const shouldShowComments =
    location.pathname.startsWith("/blog/") && !isBlogListPage;

  return (
    // BlogPostItem 컴포넌트를 ImageZoomProvider의 자식으로 넣어줍니다.
    <ImageZoomProvider>
      <BlogPostItem {...props} />
      {shouldShowComments && <BrowserOnly>{() => <Comments />}</BrowserOnly>}
    </ImageZoomProvider>
  );
}
