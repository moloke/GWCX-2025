import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ImageCarouselProps {
  images: string[];
  autoScrollInterval?: number;
  className?: string;
}

export default function ImageCarousel({
  images,
  autoScrollInterval = 3000,
  className = '',
}: ImageCarouselProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Preload visible and adjacent images
  useEffect(() => {
    // Load first few images immediately
    const initialLoad = [0, 1, 2, 3, 4].filter(i => i < images.length);
    initialLoad.forEach(index => {
      const img = new Image();
      img.src = images[index];
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
      };
    });
  }, [images]);

  // Lazy load images as they come into view
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (!loadedImages.has(index)) {
              const img = new Image();
              img.src = images[index];
              img.onload = () => {
                setLoadedImages(prev => new Set([...prev, index]));
              };
            }
          }
        });
      },
      {
        root: container,
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    const imageElements = container.querySelectorAll('[data-index]');
    imageElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [images, loadedImages]);

  // Auto-scroll functionality
  const scrollToNext = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector('[data-index]')?.clientWidth || 0;
    const gap = 16; // gap-4 = 16px
    const scrollAmount = cardWidth + gap;

    // Check if we're at the end
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (currentScroll >= maxScroll - 10) {
      // Reset to beginning
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Scroll to next image
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Auto-scroll timer
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollTimerRef.current = setInterval(scrollToNext, autoScrollInterval);
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, autoScrollInterval, scrollToNext]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    setIsAutoScrolling(false);
    container.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const container = scrollContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      const container = scrollContainerRef.current;
      if (container) {
        container.style.cursor = 'grab';
      }
    }
    setIsAutoScrolling(true);
  };

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const scrollToPrevious = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector('[data-index]')?.clientWidth || 0;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    setIsAutoScrolling(false);
  };

  const scrollToNextManual = () => {
    scrollToNext();
    setIsAutoScrolling(false);
  };

  return (
    <div className={`w-full relative ${className}`}>
      {/* Navigation Arrows */}
      <button
        onClick={scrollToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
        aria-label="Scroll to previous images"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollToNextManual}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
        aria-label="Scroll to next images"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none py-4"
        style={{
          scrollBehavior: isDragging.current ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        role="region"
        aria-label="Image carousel"
      >
        {images.map((image, index) => (
          <div
            key={index}
            data-index={index}
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[350px] sm:h-[400px] md:h-[450px] relative group"
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{
                transform: 'perspective(1000px) rotateY(-2deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {loadedImages.has(index) ? (
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable="false"
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator/gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}