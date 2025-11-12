import React, { useEffect } from "react";
import { CheckCircle } from "../icons";
import { useInView } from "../../hooks/useInView";
import '../../types';

export default function RegistrationSection() {
  // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
  const [titleRef, isTitleInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
  const [widgetRef, isWidgetInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
  const [footerRef, isFooterInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  
  useEffect(() => {
    // Load Eventbrite widget script
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.co.uk/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.EBWidgets) {
        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: '1961620141649', // Example Event ID
          iframeContainerId: 'eventbrite-widget-container-1961620141649',
          iframeContainerHeight: 425,
          onOrderComplete: () => {
            console.log('Order complete!');
          }
        });
      }
    };

    return () => {
      // Clean up script
      const scriptElement = document.querySelector('script[src="https://www.eventbrite.co.uk/static/widgets/eb_widgets.js"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <section 
      id="registration" 
      className="py-24 bg-slate-950 relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-12 scroll-anim scroll-anim-up ${isTitleInView ? 'in-view' : ''}`}
        >
          <div className="text-amber-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Secure Your Spot
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Register Now
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Entry is completely free. Registration helps us prepare the best experience for you.
          </p>
          
          <div
                        className={`mt-12 flex flex-wrap justify-center gap-8 text-slate-500 text-sm transition-opacity duration-500`}
                        style={{transitionDelay: '600ms'}}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Free Entry</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Family Friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Free Parking</span>
                        </div>
                    </div>
        </div>
        
        <div
          ref={widgetRef}
          className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 md:p-12 scroll-anim scroll-anim-up ${isWidgetInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div id="eventbrite-widget-container-1961620141649" className="min-h-[425px]"></div>
        </div>
        
        <div
          ref={footerRef}
          className={`text-center mt-8 scroll-anim ${isFooterInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-xl md:text-3xl font-black text-white mb-6">
            Wondering how you'll get there?
          </p>
          <p className="text-md text-slate-500">
            
            <a href="#faq" className="text-amber-500 hover:text-amber-400 underline">
              Get in touch
            </a>{" "}
            so we can assist with free transportation.
          </p>
        </div>
      </div>
    </section>
  );
}
