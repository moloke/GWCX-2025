import React, { useState, useEffect } from 'react';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Preload images for better performance
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => [...prev, src]);
      };
    });
  }, [images]);

  // Close dialog when clicking anywhere
  useEffect(() => {
    const handleClick = () => {
      if (selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [selectedImage]);

  return (
    <>
      <div className="w-full flex justify-between h-[50vh] my-8 gap-1">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-full flex-1 transition-all duration-300 hover:flex-[3] group overflow-hidden"
            style={{ opacity: loadedImages.includes(image) ? 1 : 0 }}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="h-full w-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(image);
              }}
            />
          </div>
        ))}
      </div>

      {/* Full screen overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Expanded view"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}