import React from "react";
import { useInView } from "../../hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

const faqs = [
  {
    question: "What time does it start and end?",
    answer: "Date: Tuesday, 31 December 2025 | Time: 9PM till 12:15AM"
  },
  {
    question: "Do I need a ticket?",
    answer: "Yes - entry is free, but registration helps us manage seating and welcome you properly."
  },
  {
    question: "Can I bring friends and family?",
    answer: "Absolutely! The more, the merrier. Please ensure you select the right number of tickets for your family and friends."
  },
  {
    question: "Where exactly is the service being held?",
    answer: "Kent Event Centre (also known as Kent Showground), Maidstone, ME14 3JF"
  },
  {
    question: "Is there parking available?",
    answer: "Yes, free parking is available on-site."
  },
  {
    question: "Will transport be provided?",
    answer: "Yes, a 200-seater coach will be available from select locations. If you would like to reserve a seat, you can do so during registration."
  },
  {
    question: "What should I wear?",
    answer: "Come comfortable or come dressed for celebration. Either way, come ready to have an exciting night!"
  }
];

export default function FAQSection() {
  // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
  const [titleRef, isTitleInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
  const [accordionRef, isAccordionInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  // FIX: Explicitly type useInView for HTMLDivElement to match the ref target.
  const [contactRef, isContactInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section 
      id="faq" 
      className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-anim scroll-anim-up ${isTitleInView ? 'in-view' : ''}`}
        >
          <div className="text-amber-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400">
            Everything you need to know about GWC Crossover Night 2025
          </p>
        </div>
        
        <div
          ref={accordionRef}
          className={`scroll-anim scroll-anim-up ${isAccordionInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl px-6 hover:border-purple-500/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-white font-semibold text-lg py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div
          ref={contactRef}
          className={`text-center mt-12 scroll-anim ${isContactInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-slate-400">
            Still have questions?{" "}
            <a href="https://gatewaychapel.org.uk/find-us" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 font-semibold underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
