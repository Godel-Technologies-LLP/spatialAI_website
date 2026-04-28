import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import * as LucideIcons from "lucide-react";
import Layout from "../components/layout/Layout";
import StoryVisual from "../components/features/visuals/StoryVisual";
import { STORY_CHAPTERS, LEADERSHIP_EXPERTISE, STORY_MANIFESTO } from "../data/story";
import { SITE_CONFIG } from "../data/config";

const OurStory = () => {
  const [activeSection, setActiveSection] = useState("genesis");
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    STORY_CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Immersive Vertical Navigation */}
      <nav className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-12">
        {STORY_CHAPTERS.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => {
              const el = document.getElementById(chapter.id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="group flex flex-col items-start gap-3 relative"
          >
            <div className={`text-[9px] font-mono tracking-[0.2em] transition-all duration-500 uppercase ${
              activeSection === chapter.id ? 'text-[#FF4A22]' : 'text-gray-400 group-hover:text-gray-600'
            }`}>
              {chapter.label}
            </div>
            <div className="flex items-center gap-4">
              <div className={`h-[1px] transition-all duration-700 ease-out ${
                activeSection === chapter.id ? 'w-16 bg-[#FF4A22]' : 'w-4 bg-gray-300 group-hover:w-8 group-hover:bg-gray-400'
              }`} />
              <span className={`text-sm font-bold tracking-tight transition-colors duration-500 ${
                activeSection === chapter.id ? 'text-black' : 'text-gray-300 group-hover:text-gray-800'
              }`}>
                {chapter.title}
              </span>
            </div>
          </button>
        ))}
      </nav>

      {/* Cinematic Content */}
      <main className="bg-white min-h-screen pb-32">
        
        {/* Massive Hero */}
        <section className="pt-24 md:pt-48 px-6 md:px-12 lg:px-32 xl:px-48 max-w-7xl mx-auto relative z-10 mb-8 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-8 h-[2px] bg-[#FF4A22]"></span>
              <span className="text-[#FF4A22] text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase">{STORY_MANIFESTO.label}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-headline font-medium tracking-tighter text-black leading-[0.85] uppercase mb-8 md:mb-12 break-words hyphens-auto">
              {STORY_MANIFESTO.heading.split(' ').slice(0, -1).join(' ')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">{STORY_MANIFESTO.heading.split(' ').slice(-1)}</span>
            </h1>
          </motion.div>
        </section>

        {/* Dynamic Story Spine */}
        <div className="border-l border-gray-100/50 max-w-7xl mx-auto lg:pl-32 xl:pl-48">
          
          {/* Chapter 1: Genesis */}
          <section id="genesis" className="px-6 md:px-12 py-16 md:py-32 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Mobile Illustration */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:hidden h-[300px] w-full rounded-[32px] overflow-hidden shadow-xl mb-12 border border-black/5"
              >
                <StoryVisual />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" /> 
                  {STORY_CHAPTERS[0].label}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline tracking-tighter mb-12 uppercase leading-none break-words hyphens-auto">
                  {STORY_CHAPTERS[0].heading}
                </h2>
                <div className="space-y-8 text-xl font-serif text-gray-600 leading-relaxed">
                  {STORY_CHAPTERS[0].paragraphs?.map((p, i) => (
                    <p key={i} className={i === 2 ? "text-black font-medium text-2xl border-l-4 border-[#FF4A22] pl-6 py-2 bg-gray-50/50" : ""}>{p}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                style={{ y: yOffset }}
                className="sticky top-40 hidden lg:block h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
              >
                <StoryVisual />
              </motion.div>
            </div>
          </section>

          {/* Chapter 2: The Frontier (Inverted Dark Block) */}
          <section id="spatial" className="px-6 md:px-12 py-16 md:py-32 relative">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-black text-white rounded-[32px] md:rounded-[40px] lg:rounded-[60px] p-8 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF4A22]/40 via-black to-black pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="text-[10px] text-[#FF4A22] font-mono tracking-widest uppercase mb-6 md:mb-8 flex items-center gap-3">
                  <span className="animate-pulse w-3 h-3 bg-[#FF4A22] rounded-sm" /> 
                  {STORY_CHAPTERS[1].label}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline tracking-tighter mb-8 md:mb-12 uppercase leading-none text-white break-words hyphens-auto">
                  {STORY_CHAPTERS[1].heading}
                </h2>
                
                <p className="text-xl md:text-3xl lg:text-4xl leading-tight font-medium mb-8 md:mb-12 text-gray-300">
                  {STORY_CHAPTERS[1].definition}
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-500 font-serif border-t border-white/10 pt-8">
                  {STORY_CHAPTERS[1].subtext}
                </p>
              </div>
            </motion.div>
          </section>

          {/* Chapter 3: Architects */}
          <section id="leadership" className="px-6 md:px-12 py-16 md:py-32 relative">
            <div className="max-w-4xl">
              <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full" /> 
                {STORY_CHAPTERS[2].label}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-headline tracking-tighter mb-6 md:mb-8 uppercase leading-none break-words hyphens-auto">
                {STORY_CHAPTERS[2].heading}
              </h2>
              <p className="text-xl md:text-2xl font-serif text-gray-600 mb-12 md:mb-20 max-w-2xl leading-relaxed">
                {STORY_CHAPTERS[2].intro}
              </p>

              {/* Founder Dossier Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {LEADERSHIP_EXPERTISE.map((item, i) => {
                  const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType;
                  const isMain = i === 0;

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className={`p-8 rounded-[32px] border transition-all duration-500 ${
                        isMain 
                          ? 'lg:col-span-3 bg-gray-50 border-gray-200 grid lg:grid-cols-3 gap-12 items-center' 
                          : 'bg-white border-gray-100 hover:shadow-xl hover:border-gray-200'
                      }`}
                    >
                      {isMain ? (
                        <>
                          <div className="lg:col-span-1 border-r border-gray-200/50 pr-8">
                            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-4">Core Architect</div>
                            {item.link || (isMain && SITE_CONFIG.founder.linkedin) ? (
                              <a href={item.link || SITE_CONFIG.founder.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block hover:text-[#FF4A22] transition-colors">
                                <h3 className="text-3xl font-headline tracking-tighter uppercase mb-2">{item.title}</h3>
                              </a>
                            ) : (
                              <h3 className="text-3xl font-headline tracking-tighter uppercase mb-2">{item.title}</h3>
                            )}
                            <div className="text-[#FF4A22] text-sm font-bold uppercase tracking-widest">{item.role}</div>
                          </div>
                          <div className="lg:col-span-2">
                            <Icon className="w-8 h-8 text-gray-300 mb-6" />
                            <p className="text-xl text-gray-600 font-serif leading-relaxed">{item.desc}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-8 border border-gray-100">
                            {Icon && <Icon className="w-5 h-5" />}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-3">{item.role}</div>
                          <h4 className="text-2xl font-headline tracking-tighter uppercase mb-4">{item.title}</h4>
                          <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Closing Quotation */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-gray-100"
              >
                <div className="relative">
                  <span className="absolute -top-8 md:-top-12 -left-4 md:-left-6 text-7xl md:text-9xl text-gray-100 font-serif leading-none">"</span>
                  <p className="text-2xl sm:text-3xl md:text-5xl font-headline tracking-tighter leading-tight relative z-10 text-black max-w-3xl pt-4">
                    {STORY_CHAPTERS[2].quote}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
};

export default OurStory;
