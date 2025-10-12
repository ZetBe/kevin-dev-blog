import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import ImageZoomModal from "@site/src/components/ImageZoomModal";

// 이미지 정보 타입
interface ImageInfo {
  src: string;
  alt: string;
}

// Context가 제공할 값의 타입
interface ImageZoomContextType {
  openModal: (image: ImageInfo) => void;
}

const ImageZoomContext = createContext<ImageZoomContextType | undefined>(
  undefined
);

// Provider props 타입
interface ImageZoomProviderProps {
  children: ReactNode;
}

// Provider: 모달 상태 관리 및 렌더링
export function ImageZoomProvider({ children }: ImageZoomProviderProps) {
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);

  const openModal = (image: ImageInfo) => {
    setSelectedImage(image);
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
  };

  return (
    <ImageZoomContext.Provider value={{ openModal }}>
      {children}
      {selectedImage && (
        <ImageZoomModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={closeModal}
        />
      )}
    </ImageZoomContext.Provider>
  );
}

// Custom Hook
export function useImageZoom() {
  const context = useContext(ImageZoomContext);
  if (context === undefined) {
    throw new Error("useImageZoom must be used within a ImageZoomProvider");
  }
  return context;
}
