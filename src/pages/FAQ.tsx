import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, FAQItem } from '../data/faq';

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-black/10 last:border-none hover:bg-black/[0.02] transition-colors duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-start py-8 px-4 text-left group transition-colors"
      >
        <div className="flex-1">
          <h4 className={`text-lg md:text-[22px] tracking-tight transition-colors ${isOpen ? 'text-black' : 'text-black/80 group-hover:text-black'}`}>
            {item.question}
          </h4>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pt-6 text-black/60 text-sm md:text-base leading-relaxed max-w-4xl pr-12">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].title);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const activeData = FAQ_DATA.find(c => c.title === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Layout>
      <div className="pt-32 pb-32 min-h-screen bg-brand-gray/30 text-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl tracking-tight text-black mb-8">
              Frequently Asked Questions
            </h1>
          </div>

          {/* Tabs Nav */}
          <div className="flex overflow-x-auto hide-scrollbar mb-12 relative border-b border-black/10">
            {FAQ_DATA.map((category) => (
              <button
                key={category.title}
                onClick={() => {
                  setActiveCategory(category.title);
                  setOpenItems(new Set()); // Close accordions on tab switch
                }}
                className={`relative px-8 py-5 text-sm md:text-base whitespace-nowrap transition-colors ${
                  activeCategory === category.title
                    ? 'text-[#FF4A22]' // Bright red-orange from screenshot
                    : 'text-black/50 hover:text-black'
                }`}
              >
                {category.title}
                {activeCategory === category.title && (
                  <motion.div
                    layoutId="faqTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4A22]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Questions Content */}
          <div className="space-y-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeData?.items.map(item => (
                  <AccordionItem 
                    key={item.id} 
                    item={item} 
                    isOpen={openItems.has(item.id)}
                    onClick={() => toggleItem(item.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
