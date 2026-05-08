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
        <motion.div whileHover={{ scale: 0.99 }} className="bg-black text-white rounded-[40px] md:rounded-[60px] px-6 py-16 md:p-32 text-center relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter mb-12 text-balance leading-[0.9] break-words">
              Stop Drafting. <br/> Start Engineering.
            </h2>
            <a href={SOCIAL_LINKS.CALENDLY} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-4 md:px-12 md:py-6 rounded-full font-medium text-lg md:text-xl hover:scale-110 transition-transform active:scale-95 inline-block text-center break-words max-w-full">
              Collaborate & Scale your Vision
            </a>
          </div>
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[60px]">
            {/* Base Layer */}
            <div className="absolute inset-0 bg-black" />
            
            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="interactive-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#interactive-grid)" />
              </svg>
            </div>

            {/* Glowing Ambient Orbs */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[50%] h-[80%] bg-[#FF4A22] rounded-full mix-blend-screen filter blur-[120px]"
            />
            
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -100, 100, 0],
                y: [0, 80, -80, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute top-[40%] -right-[10%] w-[60%] h-[70%] bg-[#10B981] rounded-full mix-blend-screen filter blur-[100px]"
            />

            {/* Moving Scanline */}
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent via-white/[0.15] to-transparent skew-y-[-10deg]"
            />
            
            {/* Vignette mask */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)] bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
