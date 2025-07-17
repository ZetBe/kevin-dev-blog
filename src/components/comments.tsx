import Giscus from '@giscus/react'

export default function Comments() {
  const theme = localStorage.getItem('theme')
  console.log(process.env.REACT_APP_GISCUS_REPO_ID)
  return (
    <Giscus
      id="comments"
      repo="ZetBe/kevin-dev-blog"
      repoId={process.env.REACT_APP_GISCUS_REPO_ID}
      category="General"
      categoryId={process.env.REACT_APP_GISCUS_CATEGORY_ID}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="ko"
    />
  )
}
