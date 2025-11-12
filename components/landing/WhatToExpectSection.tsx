import React from "react";
import { useInView } from "../../hooks/useInView";

const expectations = [
  {
    imageUrl: "/images/gallery/DSC01879.JPG",
    title: "Worship",
    description: "Powerful live worship that will lift your spirit and prepare your heart for the new year.",
  },
  {
    imageUrl: "/images/gallery/DSC02971.JPG",
    title: "Word",
    description: "Inspiring messages of hope, faith, and vision to launch you into 2026 with purpose.",
  },
  {
    imageUrl: "/images/gallery/DSC02758.JPG",
    title: "Wonder",
    description: "Experience the presence of God on a night you'll never forget - filled with joy and expectation.",
  }
];

const ExpectCard: React.FC<{ 
  imageUrl: string; 
  title: string; 
  description: string;
  delay: number;
}> = ({ imageUrl, title, description, delay }) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  
  return (
    <div
      ref={ref}
      className={`scroll-anim scroll-anim-up ${isInView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="group relative overflow-hidden rounded-lg shadow-lg h-[400px]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6">{title}</h3>
          <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WhatToExpectSection() {
  const [titleRef, isTitleInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-anim scroll-anim-up ${isTitleInView ? 'in-view' : ''}`}
        >
          <div className="text-amber-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            What to Expect
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {expectations.map((item, index) => (
            <ExpectCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
