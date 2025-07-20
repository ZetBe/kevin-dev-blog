import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'

export default function Comments() {
  if (!ExecutionEnvironment.canUseDOM) {
    return null
  }
  const theme = localStorage.getItem('theme')

  return (
    <Giscus
      id="comments"
      repo="ZetBe/kevin-dev-blog"
      repoId="R_kgDOPGn5Og"
      category="General"
      categoryId="DIC_kwDOPGn5Os4Csk6U"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="ko"
    />
  )
}
