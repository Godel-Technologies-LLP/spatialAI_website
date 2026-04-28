import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, FAQItem } from '../data/faq';

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => {
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(item.answer);

  return (
    <div className="border-b border-black/10 last:border-none hover:bg-black/[0.02] transition-colors duration-300 px-4">
      <button
        onClick={onClick}
        className="w-full flex items-start py-8 text-left group transition-colors"
      >
        <h4 className={`text-lg md:text-[22px] tracking-tight transition-colors flex-1 ${isOpen ? 'text-black' : 'text-black/80 group-hover:text-black'}`}>
          {item.question}
        </h4>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-black/60 text-sm md:text-base leading-relaxed max-w-4xl pr-12">
              {videoId ? (
                <div className="relative w-full max-w-3xl pt-[56.25%] rounded-xl overflow-hidden shadow-xl border border-black/10 bg-black/5">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.answer }} className="space-y-4" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Sidebar / Categories */}
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
              <div className="md:sticky md:top-32 flex flex-row flex-wrap md:flex-col gap-2 pb-4 md:pb-0 border-b md:border-b-0 border-black/10 md:pr-4">
                {FAQ_DATA.map((category) => (
                  <button
                    key={category.title}
                    onClick={() => {
                      setActiveCategory(category.title);
                      setOpenItems(new Set()); // Close accordions on tab switch
                    }}
                    className={`relative text-left px-4 md:px-5 py-2.5 md:py-4 rounded-xl text-sm md:text-base transition-all duration-300 group flex items-center justify-between ${
                      activeCategory === category.title
                        ? 'bg-white text-black font-medium shadow-sm border border-black/5'
                        : 'bg-black/5 md:bg-transparent text-black/60 hover:bg-black/10 md:hover:bg-black/5 hover:text-black border border-transparent'
                    }`}
                  >
                    <span>{category.title}</span>
                    {activeCategory === category.title && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#FF4A22]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Content */}
            <div className="flex-1 w-full">
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
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
