import React from "react";
import type { ComponentProps } from "react";
import OriginalImg from "@theme-original/MDXComponents/Img";
import { useImageZoom } from "@site/src/theme/ImageZoomContext";

type Props = ComponentProps<typeof OriginalImg>;

export default function Img(props: Props): JSX.Element {
  const { openModal } = useImageZoom();
  const { src, alt } = props;

  // 🖱️ 이미지를 '클릭'했을 때 실행될 함수
  const handleImageClick = () => {
    if (typeof src === "string") {
      openModal({ src, alt: alt ?? "" });
    }
  };

  return (
    <OriginalImg
      {...props}
      // 실제 클릭 이벤트를 여기에 바인딩합니다.
      onClick={handleImageClick}
    />
  );
}
