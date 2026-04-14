import { motion, useScroll, useTransform } from "motion/react";
import { Suspense, lazy } from "react";
import { SOCIAL_LINKS } from "../../../constants/links";
import { HOME_HERO } from "../../../data/home";

const SpatialVisual = lazy(() => import("../../../SpatialVisual"));

const InteractiveHeroHeading = () => {
  const words = HOME_HERO.heading.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.h1 
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-4xl md:text-6xl lg:text-[72px] font-headline font-medium leading-[1] tracking-tighter-extra mb-8 text-balance flex flex-wrap gap-x-3 gap-y-1"
    >
      {words.map((word, index) => {
        const isHighlight = word.toLowerCase().includes("ai-driven") || word.toLowerCase().includes("spatial") || word.toLowerCase().includes("intelligence");
        return (
          <motion.span
            key={index}
            variants={child}
            whileHover={{ scale: 1.05, color: "#000", opacity: 1, transition: { duration: 0.2 } }}
            className={`cursor-default transition-all duration-300 ${isHighlight ? 'text-black' : 'text-black/20 font-light'}`}
          >
            {isHighlight ? word : word.toLowerCase()}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <InteractiveHeroHeading />
            <p className="text-xl md:text-2xl text-black/60 leading-relaxed mb-12 max-w-xl text-balance">
              {HOME_HERO.subheading}
            </p>
          </motion.div>
        </div>

        <motion.div style={{ y: y1 }} className="relative aspect-square lg:aspect-auto lg:h-[800px] flex items-center justify-center">
          <Suspense fallback={<div className="w-full h-full bg-black/5 animate-pulse rounded-full" />}>
            <SpatialVisual />
          </Suspense>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer z-50 pointer-events-auto"
        onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-label text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors font-bold whitespace-nowrap">SCROLL TO SYSTEM OVERVIEW</span>
        <div className="w-[1px] h-8 md:h-12 bg-black/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [-48, 48], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-8 bg-black/40"
          />
        </div>
      </motion.div>
    </section>
  );
};

export const CTA = () => {
  return (
    <section id="contact" className="px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div whileHover={{ scale: 0.99 }} className="bg-black text-white rounded-[60px] p-12 md:p-32 text-center relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 text-balance leading-[0.9]">
              Stop Drafting. <br/> Start Engineering.
            </h2>
            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-12 py-6 rounded-full font-medium text-xl hover:scale-110 transition-transform active:scale-95 inline-block text-center">
              Collaborate & Scale your Vision
            </a>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1E8BXqYkCPP3P9t9mkIPWzfISKgL7-GvaCIvK1n7BdbZbBnkagC6Ds4OVN0DgdsxHTmZh-sQfPvIRuZKiZq8mBc7tObEklG2r9mlBIy7s1puOk4MEChma4qCOrhgGQyqyoostFf2DSvlV7YFWxN6zxPAe4FSQ633VAeMcnd7DsRKU5LEsRy8uNvzVRyKUQxQM6K01sIBOk_zZ36cWal6uQvmUGXr1hnVKo35IhmFJzfsHMtq3QDg6osqH0_g6crRFaDY5_05zwVw" 
              alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
