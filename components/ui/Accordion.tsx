
import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { ChevronDown } from '../icons';

type AccordionContextType = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const Accordion: FC<{ children: ReactNode; type: 'single'; collapsible: boolean }> = ({ children }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (value: string) => {
    setOpenItem(prev => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className="space-y-4">{children}</div>
    </AccordionContext.Provider>
  );
};

type AccordionItemContextType = {
  value: string;
};

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

export const AccordionItem: FC<{ children: ReactNode; value: string; className?: string }> = ({ children, value, className }) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={className}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within AccordionItem');
  }

  const { openItem, toggleItem } = accordionContext;
  const { value } = itemContext;
  const isOpen = openItem === value;

  return (
    <button
      onClick={() => toggleItem(value)}
      className={`flex justify-between items-center w-full text-left ${className}`}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
};

export const AccordionContent: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionContent must be used within AccordionItem');
  }

  const { openItem } = accordionContext;
  const { value } = itemContext;
  const isOpen = openItem === value;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className={className}>{children}</div>
    </div>
  );
};
