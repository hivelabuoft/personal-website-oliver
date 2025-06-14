'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PdfTeaser.module.css';

export default function PdfTeaser({ pdfUrl, title }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Generate the screenshot URL based on the PDF URL
  const getScreenshotUrl = (pdfUrl) => {
    // Extract the filename without extension
    const filename = pdfUrl.split('/').pop().replace('.pdf', '');
    return `/static/uploads/pdf/screenshot/${filename}.png`;
  };
  
  const screenshotUrl = getScreenshotUrl(pdfUrl);

  // Fallback component for when image fails to load
  const ImageFallback = () => (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallbackContent}>
        <div className={styles.pdfIcon}>PDF</div>
        <p className={styles.fallbackText}>{title || 'View PDF'}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.pdfTeaser}>
      <div className={styles.imageContainer}>
        <Image
          src={screenshotUrl}
          alt={`Preview of ${title}`}
          width={180}
          height={240}
          onLoad={() => {
            setLoading(false);
            setError(false);
          }}
          onError={() => {
            console.error('Failed to load image:', screenshotUrl);
            setError(true);
            setLoading(false);
          }}
          className={styles.teaserImage}
        />
        
        {/* Show fallback if image fails to load */}
        {error && <ImageFallback />}
        
        {/* Loading spinner overlay */}
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
}
