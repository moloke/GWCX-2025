
import React from "react";
import { MapPin } from "./components/icons";
import HeroSection from "./components/landing/HeroSection";
import AboutSection from "./components/landing/AboutSection";
import WhatToExpectSection from "./components/landing/WhatToExpectSection";
import RegistrationSection from "./components/landing/RegistrationSection";
import FAQSection from "./components/landing/FAQSection";
import FinalCTABanner from "./components/landing/FinalCTABanner";

export default function App() {
  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = () => {
    const text = "Join me at GWC Crossover Night 2025! 🎉 Let's step into 2026 with joy, faith, and power. Tuesday, 31 December | 9PM - Kent Event Centre";
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HeroSection 
        onRegisterClick={scrollToRegistration}
        onShareClick={handleShare}
      />
      
      <AboutSection />
      
      <WhatToExpectSection />
      
      <RegistrationSection />

      <div className="mb-6 flex">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-amber-500 mx-auto rounded-full" />
          </div>
      
      <FAQSection />
      
      <FinalCTABanner onRegisterClick={scrollToRegistration} />
      
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-amber-500" />
            <p className="text-slate-400 text-sm">
              Kent Event Centre, Maidstone, ME14 3JF
            </p>
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 Gateway Chapel Church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
