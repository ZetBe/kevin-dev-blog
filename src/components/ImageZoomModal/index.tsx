import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './styles.module.css';

const ImageZoomModal = ({ src, alt, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <TransformWrapper>
          <TransformComponent>
            <img src={src} alt={alt} className={styles.modalImage} />
          </TransformComponent>
        </TransformWrapper>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ImageZoomModal;
