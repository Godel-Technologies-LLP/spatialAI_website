import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Layers, 
  Cpu, 
  Box, 
  Activity,
  ChevronRight
} from "lucide-react";
import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import Header from "../components/Header";
import BentoVisual from "../components/BentoVisual";
import logo from "../assets/logo.png";

const SpatialVisual = lazy(() => import("../SpatialVisual"));

// --- Components ---

const InteractiveHeroHeading = () => {
  const words = "Your Strategic Partner for AI-Driven Spatial Intelligence Solutions".split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
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
            whileHover={{ 
              scale: 1.05, 
              color: "#000",
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            className={`cursor-default transition-all duration-300 ${isHighlight ? 'text-black' : 'text-black/20 font-light'}`}
          >
            {isHighlight ? word : word.toLowerCase()}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <InteractiveHeroHeading />
            <p className="text-xl md:text-2xl text-black/60 leading-relaxed mb-12 max-w-xl text-balance">
              We convert complex spatial technology into measurable business outcomes for founders and leaders.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{ y: y1 }}
          className="relative aspect-square lg:aspect-auto lg:h-[800px] flex items-center justify-center"
        >
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
            animate={{ 
              y: [-48, 48],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-0 left-0 w-full h-8 bg-black/40"
          />
        </div>
      </motion.div>

      {/* Background Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-black/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-black/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

const Metrics = () => {
  const metrics = [
    { 
      label: "Successful Deployments", 
      value: "25+", 
      desc: "End-to-end industrial applications" 
    },
    { 
      label: "Turnaround Time", 
      value: "4-8 Weeks", 
      desc: "From concept to production" 
    },
    { 
      label: "Compute Cost Reduction", 
      value: "55%", 
      desc: "Driven by code-level GPU orchestration" 
    },
    { 
      label: "Manual Work Decrease", 
      value: "80%", 
      desc: "Human-in-the-loop automation" 
    },
  ];

  return (
    <section id="metrics" className="px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-white rounded-[40px] p-12 md:p-20 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((m, i) => (
            <motion.div 
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="text-4xl md:text-6xl font-medium tracking-tighter">{m.value}</span>
              <span className="text-xs md:text-sm font-semibold text-white/40 uppercase tracking-widest">{m.label}</span>
              <span className="text-[10px] text-white/20 font-medium leading-tight">{m.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const services: { title: string; desc: string; icon: React.ReactNode; visualType: 'hourglass' | 'torus' | 'waveform' }[] = [
    {
      title: "Scalable Enterprise Platforms",
      desc: "Integrate point cloud processing with DNN based image retrieval while the whole product has a LLM based chat-interface entirely hosted on-premise.",
      icon: <Box className="w-8 h-8" />,
      visualType: "hourglass"
    },
    {
      title: "Workflow Optimisation",
      desc: "Remove the bottle-necks by automating critical components of your production workflow using custom spatial primitives.",
      icon: <Activity className="w-8 h-8" />,
      visualType: "torus"
    },
    {
      title: "Deep Tech Prototyping",
      desc: "Translate ambitious R&D into working industrial prototypes, making breakthrough tech ready for large-scale operations.",
      icon: <Cpu className="w-8 h-8" />,
      visualType: "waveform"
    }
  ];

  return (
    <section id="expertise" className="px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6 uppercase tracking-tighter-extra">Our Expertise</h2>
          <p className="text-xl text-black/60 max-w-2xl">
            Specialized <strong>GIS</strong>, <strong>Point Cloud</strong>, and <strong>CAD</strong> engines for Architecture, Agritech, and Manufacturing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              whileHover={{ y: -10 }}
              className="bento-card flex flex-col justify-between min-h-[450px]"
            >
              <div>
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-8">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-medium mb-4 leading-tight">{s.title}</h3>
                <p className="text-black/60 leading-relaxed mb-8">{s.desc}</p>
              </div>
              <div className="relative h-48 overflow-hidden rounded-2xl bg-black/5 flex items-center justify-center">
                <BentoVisual type={s.visualType} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{ 
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-48 h-48 border border-black/5 rounded-3xl relative"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 4, delay: i * 1.3, repeat: Infinity }}
          className="absolute inset-4 border border-black/10 rounded-2xl"
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)]" />
      </div>
    </motion.div>
    {/* Scanline Effect */}
    <motion.div 
      animate={{ y: [-100, 300] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-[1px] bg-black/5 z-10"
    />
  </div>
);

const CaseStudiesIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="relative w-48 h-48">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            rotateY: [0, 180, 360],
            rotateX: [0, 180, 360],
          }}
          transition={{ duration: 15, delay: i * 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border border-black/10 rounded-full"
          style={{ transform: `rotate(${i * 45}deg)` }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-black/20 rounded-full" 
        />
      </div>
    </div>
  </div>
);

const ExplorationHub = () => {
  const hubs = [
    {
      title: "Industrial Solutions",
      desc: "Architecting the core logic of spatial intelligence.",
      link: "/solutions",
      tag: "SYSTEMS",
      Illustration: SolutionsIllustration
    },
    {
      title: "Project Case Studies",
      desc: "Deep dives into deployment-ready engineering.",
      link: "/case-studies",
      tag: "DELIVERY",
      Illustration: CaseStudiesIllustration
    }
  ];

  return (
    <section id="explore" className="px-6 md:px-12 py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-headline font-medium tracking-tighter-extra mb-6 uppercase">
            The Ecosystem
          </h2>
          <p className="text-xl text-black/60 max-w-xl">
            From algorithmic foundations to global deployments—explore our technical universe.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 font-headline">
          {hubs.map((hub, i) => (
            <motion.a
              key={hub.title}
              href={hub.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 group overflow-hidden relative"
            >
              <div className="flex flex-col h-full relative z-10">
                <span className="text-[10px] font-medium tracking-[0.4em] text-black/20 group-hover:text-black transition-colors mb-4 uppercase">
                  {hub.tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-medium mb-6 leading-[1.1] tracking-tighter-extra">
                  {hub.title}
                </h3>
                <p className="text-lg text-black/40 mb-12 max-w-[280px]">
                  {hub.desc}
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <span className="font-medium text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                    Explore Now
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
                </div>
              </div>

              {/* Background Illustration Area */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <hub.Illustration />
              </div>

              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-[0.02] pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          whileHover={{ scale: 0.99 }}
          className="bg-black text-white rounded-[60px] p-12 md:p-32 text-center relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 text-balance leading-[0.9]">
              Stop Drafting. <br/>
              Start Engineering.
            </h2>
            <a 
              href="https://calendly.com/vishwa-godeltech/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-12 py-6 rounded-full font-medium text-xl hover:scale-110 transition-transform active:scale-95 inline-block text-center"
            >
              Collaborate & Scale your Vision
            </a>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1E8BXqYkCPP3P9t9mkIPWzfISKgL7-GvaCIvK1n7BdbZbBnkagC6Ds4OVN0DgdsxHTmZh-sQfPvIRuZKiZq8mBc7tObEklG2r9mlBIy7s1puOk4MEChma4qCOrhgGQyqyoostFf2DSvlV7YFWxN6zxPAe4FSQ633VAeMcnd7DsRKU5LEsRy8uNvzVRyKUQxQM6K01sIBOk_zZ36cWal6uQvmUGXr1hnVKo35IhmFJzfsHMtq3QDg6osqH0_g6crRFaDY5_05zwVw" 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="px-6 md:px-12 py-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3 bg-white p-2 rounded-xl">
        <img src={logo} alt="Godel Tech Logo" className="w-8 h-8 object-contain" />
        <span className="text-xl font-medium tracking-tighter text-black whitespace-nowrap">Godel Technologies</span>
      </div>
      <div className="flex gap-8 text-sm font-medium text-black/40">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        <a href="mailto:info@godeltech.in" className="hover:text-black transition-colors">info@godeltech.in</a>
      </div>
      <p className="text-sm font-medium text-black/20">
        © {new Date().getFullYear()} Godel Tech. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- Main App ---

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Expertise />
        <ExplorationHub />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
