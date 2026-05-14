import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME_ECOSYSTEM, HOME_ECOSYSTEM_TEXT } from "../../../data/home";
import { TechnicalLabel } from "../../common/Typography";

const MotionLink = motion(Link);

const SolutionsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
      className="w-48 h-48 border border-black/5 rounded-3xl relative"
    >
      {[...Array(2)].map((_, i) => (
        <div key={i} className="absolute inset-4 border border-black/10 rounded-2xl" style={{ transform: `rotate(${i * 45}deg)` }} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)]" />
      </div>
    </motion.div>
    <div className="absolute inset-0 grid-bg opacity-5 scale-150 rotate-12" />
  </div>
);

const CaseStudiesIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="relative w-48 h-48">
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i} 
          animate={{ rotate: 360 }} 
          transition={{ duration: 25, delay: i * 2, repeat: Infinity, ease: "linear" }} 
          className="absolute inset-0 border border-black/10 rounded-full" 
          style={{ transform: `scale(${0.8 + i * 0.1})` }} 
        />
      ))}
    </div>
    <div className="absolute inset-0 dot-bg opacity-10" />
  </div>
);

const ProductsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="relative w-48 h-48">
      {[...Array(2)].map((_, i) => (
        <motion.div 
          key={i} 
          animate={{ rotate: -360 }} 
          transition={{ duration: 40, delay: i * 3, repeat: Infinity, ease: "linear" }} 
          className="absolute inset-4 border border-black/10 rounded-[30%]" 
        />
      ))}
    </div>
  </div>
);

export const ExplorationHub = () => {
  return (
    <section id="explore" className="px-6 md:px-12 py-32 bg-brand-gray/30 border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <TechnicalLabel className="mb-4 opacity-40">{HOME_ECOSYSTEM_TEXT.label}</TechnicalLabel>
          <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-8 uppercase leading-none">{HOME_ECOSYSTEM_TEXT.title}</h2>
          <p className="text-lg md:text-xl text-black/50 max-w-xl font-medium">{HOME_ECOSYSTEM_TEXT.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {HOME_ECOSYSTEM.map((hub, i) => (
            <MotionLink
              key={hub.title} to={hub.link} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white rounded-[48px] p-10 md:p-14 border border-black/5 group overflow-hidden relative shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="flex flex-col h-full relative z-10">
                <span className="text-[10px] font-medium tracking-[0.4em] text-black/20 group-hover:text-black transition-colors mb-4 uppercase">{hub.tag}</span>
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 leading-[1.1] tracking-tighter-extra">{hub.title}</h3>
                <p className="text-lg text-black/40 mb-12 max-w-[280px]">{hub.desc}</p>
                <div className="mt-auto flex items-center gap-4">
                  <span className="font-medium text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">Explore Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {hub.visual === "solutions" ? <SolutionsIllustration /> : hub.visual === "products" ? <ProductsIllustration /> : <CaseStudiesIllustration />}
              </div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-[0.02] pointer-events-none" />
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
};

