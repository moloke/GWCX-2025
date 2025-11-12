import React from "react";
import { useInView } from "../../hooks/useInView";
import ImageCarousel from "../ImageCarousel";

const GALLERY_IMAGES = [
  "/images/gallery/DSC00172.JPG",
  "/images/gallery/DSC00959.JPG",
  "/images/gallery/DSC01845.JPG",
  "/images/gallery/DSC01879.JPG",
  "/images/gallery/DSC01943.JPG",
  "/images/gallery/DSC01971.JPG",
  "/images/gallery/DSC02115.JPG",
  "/images/gallery/DSC02398.JPG",
  "/images/gallery/DSC02415.JPG",
  "/images/gallery/DSC02462.JPG",
];

export default function AboutSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
      </div>
      
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={ref}
            className={`text-center scroll-anim scroll-anim-up ${isInView ? 'in-view' : ''}`}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Join us for a night of celebration
              <br />
              and worship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">
                #EXPLOSION2025
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
              More than just a countdown. This is where faith meets celebration,
              where community comes together, and where we step boldly into God's promises for 2026.
            </p>
          </div>
        </div>

        <div className="mt-16 relative">
          <ImageCarousel images={GALLERY_IMAGES} />
        </div>
      </div>
    </section>
  );
}
