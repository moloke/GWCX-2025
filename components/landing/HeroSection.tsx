
import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Share2, ChevronDown } from "../icons";

interface HeroSectionProps {
  onRegisterClick: () => void;
  onShareClick: () => void;
}

export default function HeroSection({ onRegisterClick, onShareClick }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-12-31T21:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" />
        <img src="/images/gallery/DSC02115.JPG" alt="" class="mx-auto h-full w-full mix-blend-overlay"/>
      </div>
      
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm mb-8">
            <span className="text-amber-400 font-bold text-sm tracking-wider">#EXPLOSION2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            Where will you be
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 animate-pulse">
              this NYE?
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-300 font-light mb-4 max-w-4xl mx-auto leading-relaxed">
            
          </p>
          <p className="text-lg md:text-2xl text-slate-300 font-light mb-12 max-w-4xl mx-auto">
            Join us for a night that feels like home - full of music, praise, laughter, and the kind of joy that carries you into the new year
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-12" style={{ animation: 'scaleIn 0.8s 0.3s ease-out forwards', opacity: 0 }}>
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' }
          ].map((item, index) => (
            <div key={index} className="bg-slate-900/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-slate-400 text-sm md:text-base uppercase tracking-wider mt-2">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ animation: 'fadeInUp 0.8s 0.5s ease-out forwards', opacity: 0 }}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-300 mb-12 text-base md:text-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GWCX%202025%20NYE%20Celebration&details=A%20night%20of%20worship%2C%20prayer%2C%20and%20celebration%20-%20where%20gratitude%20meets%20new%20beginnings.%20Experience%20the%20countdown%20like%20never%20before.&location=Kent%20Event%20Centre&dates=20251231T210000Z%2F20260101T003000Z`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Tuesday, 31 December</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-600" />
            <div>9PM - 12:30AM</div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-600" />
            <a
              href="https://maps.google.com/?q=Kent+Event+Centre,+Kent+Showground,+Detling,+Maidstone+ME14+3JF"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Kent Event Centre</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </div>
        
          <p className="text-slate-400 text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ animation: 'fadeIn 0.8s 0.6s ease-out forwards', opacity: 0 }}>
            A night of worship, prayer, and celebration - where gratitude meets new beginnings.
            <br className="hidden md:block" />
            Experience the countdown like never before.
          </p>
        </div>
        
        <div style={{ animation: 'fadeInUp 0.8s 0.7s ease-out forwards', opacity: 0 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onRegisterClick}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-lg px-10 py-7 rounded-full shadow-2xl shadow-amber-500/30 transform hover:scale-105 transition-all"
          >
            Register Now (Free)
          </Button>
          <Button
            onClick={onShareClick}
            size="lg"
            variant="outline"
            className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 font-semibold text-lg px-10 py-7 rounded-full backdrop-blur-sm"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Invite a Friend
          </Button>
        </div>
        
        <div style={{ animation: 'fadeIn 1s 1s ease-out forwards', opacity: 0, animationIterationCount: 'infinite', animationDirection: 'alternate' }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </div>
      </div>
    </section>
  );
}
