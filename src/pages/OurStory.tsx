import { useState, useEffect } from "react";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import Layout from "../components/layout/Layout";
import StoryVisual from "../components/features/visuals/StoryVisual";
import { TechnicalLabel } from "../components/ui/Typography";
import { STORY_CHAPTERS, LEADERSHIP_EXPERTISE } from "../data/story";

const OurStory = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    STORY_CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Side Navigation - Desktop */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8">
        {STORY_CHAPTERS.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 text-left"
          >
            <div className={`h-[1px] transition-all duration-500 ${
              activeSection === chapter.id ? 'w-12 bg-black' : 'w-4 bg-black/20 group-hover:w-8 group-hover:bg-black/40'
            }`} />
            <div className="flex flex-col">
              <span className={`technical-label !text-[8px] transition-colors duration-500 ${
                activeSection === chapter.id ? 'text-black' : 'text-black/20'
              }`}>
                {chapter.label}
              </span>
              <span className={`text-[10px] font-bold tracking-tight transition-colors duration-500 ${
                activeSection === chapter.id ? 'text-black' : 'text-black/20 group-hover:text-black/40'
              }`}>
                {chapter.title}
              </span>
            </div>
          </button>
        ))}
      </nav>

      <main className="pt-32 md:pt-48 pb-12">
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TechnicalLabel className="mb-6">Introduction</TechnicalLabel>
              <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 uppercase leading-[0.9] tracking-tighter-extra">
                Our <br/> Story
              </h1>
              <p className="text-2xl md:text-3xl text-black/80 font-medium leading-tight text-balance">
                Pioneering the intersection of <span className="text-black/40 italic">Computational Geometry</span> and <span className="text-black/40 italic">Artificial Intelligence</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-gray/30 border border-black/5 shadow-2xl group flex items-center justify-center"
            >
              <StoryVisual />
              
              <div className="absolute bottom-12 left-12 right-12 text-black/80 pointer-events-none">
                <TechnicalLabel className="!text-black/30 mb-2">Internal Visualization</TechnicalLabel>
                <div className="text-xs font-bold tracking-widest uppercase pb-4 mb-4">Godel-Core V1.0</div>
                <p className="text-[10px] text-black/40 leading-relaxed font-mono uppercase tracking-widest">Architecting spatial foundations with surgical precision.</p>
              </div>
            </motion.div>
          </div>

          <div className="max-w-4xl space-y-24 lg:ml-24">
            {/* Chapters Mapping */}
            {STORY_CHAPTERS.map((chapter) => {
              const isSpatial = chapter.id === "spatial";
              const isLeadership = chapter.id === "leadership";

              if (isSpatial) {
                return (
                  <motion.section 
                    key={chapter.id}
                    id={chapter.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    className="relative bg-brand-black text-white rounded-[60px] p-12 md:p-24 overflow-hidden"
                  >
                    <div className="relative z-10">
                      <TechnicalLabel className="!text-white/40 mb-8">Technical Definition</TechnicalLabel>
                      <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-12 uppercase leading-none">
                        {chapter.heading}
                      </h2>
                      <p className="text-xl md:text-3xl text-white/60 leading-relaxed font-medium mb-12">
                        {chapter.definition?.split("Spatial AI").map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="text-white">Spatial AI</span>}
                          </span>
                        ))}
                      </p>
                      <p className="text-lg md:text-xl text-white/40 leading-relaxed">
                        {chapter.subtext}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none grid-bg" />
                  </motion.section>
                );
              }

              return (
                <motion.section 
                  key={chapter.id}
                  id={chapter.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  className="relative"
                >
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-16 uppercase pb-8">
                    {chapter.heading?.split("<br/>").map((part, i) => <span key={i}>{part}{i === 0 && <br/>}</span>)}
                  </h2>
                  
                  {chapter.paragraphs && (
                    <div className="space-y-8 text-xl md:text-2xl text-black/60 leading-relaxed font-medium">
                      {chapter.paragraphs.map((p, i) => (
                        <p key={i} className={i === 0 ? "text-black" : ""}>{p}</p>
                      ))}
                    </div>
                  )}

                  {isLeadership && (
                    <>
                      <p className="text-2xl font-medium text-black/80 mb-16 max-w-2xl leading-tight mt-16">
                        {chapter.intro}
                      </p>
                      <div className="grid gap-6">
                        {LEADERSHIP_EXPERTISE.map((item, i) => {
                          const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType;
                          return (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 0.99, x: 10 }}
                              className="p-8 rounded-3xl border border-black/5 bg-white/50 backdrop-blur-sm group transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5"
                            >
                              <div className="flex items-start gap-6">
                                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                                  {Icon && <Icon className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                  <TechnicalLabel className="mb-2">Expertise Block {i+1}</TechnicalLabel>
                                  <h4 className="text-xl font-bold mb-3 tracking-tight uppercase">{item.title}</h4>
                                  <p className="text-black/60 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="mt-24 pt-12">
                        <p className="text-xl italic text-black/40 font-medium leading-relaxed">
                          "{chapter.quote}"
                        </p>
                      </div>
                    </>
                  )}
                </motion.section>
              );
            })}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default OurStory;
