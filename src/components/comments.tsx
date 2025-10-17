import React, { useState, useEffect } from "react"; // useState와 useEffect를 import 합니다.
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function Comments() {
  const { colorMode } = useColorMode();

  // 1. Giscus에 전달할 테마를 저장할 state를 만듭니다. 초기값은 null입니다.
  const [giscusTheme, setGiscusTheme] = useState(null);

  // 2. useEffect를 사용하여 클라이언트 사이드에서만 테마를 설정합니다.
  useEffect(() => {
    // Docusaurus의 현재 colorMode 값을 giscusTheme state에 설정합니다.
    // 이 코드는 브라우저에서 React가 초기 렌더링(hydration)을 마친 후에만 실행됩니다.
    setGiscusTheme(colorMode);
  }, [colorMode]); // colorMode가 변경될 때마다 이 효과를 다시 실행합니다.

  // 3. giscusTheme이 아직 설정되지 않았다면(서버 렌더링 시점), 아무것도 렌더링하지 않습니다.
  if (!giscusTheme) {
    return null;
  }

  // 4. giscusTheme이 설정된 후에 Giscus 컴포넌트를 렌더링합니다.
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
      // state에 저장된 안전한 테마 값을 사용합니다.
      theme={giscusTheme}
      lang="ko"
      loading="lazy"
    />
  );
}
