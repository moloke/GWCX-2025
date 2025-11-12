import React from "react";
import { Button } from "../ui/Button";
import { ArrowRight, Users } from "../icons";
import { useInView } from "../../hooks/useInView";

interface FinalCTABannerProps {
    onRegisterClick: () => void;
}

export default function FinalCTABanner({ onRegisterClick }: FinalCTABannerProps) {
    // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
    const [containerRef, isContainerInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-slate-950">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/final-banner/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            </div>
            
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div
                    ref={containerRef}
                    className={`text-center scroll-anim scroll-anim-scale ${isContainerInView ? 'in-view' : ''}`}
                >
                    
                    <h2
                        className={`text-4xl md:text-7xl font-black text-white mb-6 leading-tight transition-all duration-500 ${isContainerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        style={{transitionDelay: '300ms'}}
                    >
                        Step into your new year
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-400 to-amber-300">
                            with purpose
                        </span>
                    </h2>
                    
                    <p
                        className={`text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${isContainerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        style={{transitionDelay: '400ms'}}
                    >
                        3000 of us counting down to 2026 in faith, joy, and unity.
                    
                    </p>
                    
                    <div className={`transition-all duration-500 ${isContainerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '500ms'}}>
                        <Button
                            onClick={onRegisterClick}
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xl px-12 py-8 rounded-full shadow-2xl shadow-amber-500/40 transform hover:scale-105 transition-all group animate-pulse-glow"
                        >
                            Register Now
                            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
