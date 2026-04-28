import { useState, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { SolutionsFilter } from '../components/features/solutions/SolutionsFilter';
import { SOLUTIONS_DATA, SOLUTIONS_FILTERS, SolutionProject } from '../data/solutions';
import { TechnicalLabel } from '../components/ui/Typography';
import { ArrowUpRight } from 'lucide-react';

const SolutionCard = ({ project }: { project: SolutionProject }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group bg-white rounded-[32px] p-8 md:p-10 border border-black/5 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col h-full overflow-hidden relative"
  >
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <TechnicalLabel className="opacity-40">{project.tag}</TechnicalLabel>
        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 translate-x-2 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tighter group-hover:text-black transition-colors">
        {project.title}
      </h3>
      
      <p className="text-black/40 text-sm md:text-base mb-8 line-clamp-3">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        {project.skills.slice(0, 2).map((skill) => (
          <span key={skill} className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-black/40">
            {skill}
          </span>
        ))}
        {project.verticals.slice(0, 1).map((vertical) => (
          <span key={vertical} className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-black/40">
            {vertical}
          </span>
        ))}
      </div>
    </div>
    
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-[0.01] pointer-events-none" />
  </motion.div>
);

const Solutions = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [] as string[],
    verticals: [] as string[],
    applications: [] as string[]
  });

  const handleUpdateFilter = (category: string, item: string) => {
    setSelectedFilters(prev => {
      const current = prev[category as keyof typeof prev];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      skills: [],
      verticals: [],
      applications: []
    });
  };

  const filteredProjects = useMemo(() => {
    return SOLUTIONS_DATA.filter(project => {
      const skillsMatch = selectedFilters.skills.length === 0 || 
        selectedFilters.skills.some(s => project.skills.includes(s));
      const verticalsMatch = selectedFilters.verticals.length === 0 || 
        selectedFilters.verticals.some(v => project.verticals.includes(v));
      const appsMatch = selectedFilters.applications.length === 0 || 
        selectedFilters.applications.some(a => project.applications.includes(a));
      
      return skillsMatch && verticalsMatch && appsMatch;
    });
  }, [selectedFilters]);

  return (
    <Layout>
      <div className="pt-32 pb-32 min-h-screen bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <TechnicalLabel className="mb-4 opacity-40">System Logic</TechnicalLabel>
                <h1 className="text-4xl md:text-7xl font-medium tracking-tighter uppercase leading-none">
                  Industrial <br /> Solutions
                </h1>
                <p className="text-lg md:text-xl text-black/40 mt-8 font-medium">
                  Filter through our expertise across technical domains, industry verticals, and specific algorithmic applications.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="px-6 py-3 border border-black/10 rounded-full flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF4A22] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">To Be Updated</span>
                </div>
              </div>
            </div>

          {/* Filters */}
          <SolutionsFilter
            filters={SOLUTIONS_FILTERS}
            selected={selectedFilters}
            onUpdate={handleUpdateFilter}
            onClear={handleClearFilters}
          />

          {/* Results Area */}
          <div className="relative">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                <motion.div 
                  layout
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project) => (
                    <SolutionCard key={project.id} project={project} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col items-center justify-center py-40 text-center relative overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-sm"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/[0.02] via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">System Status</span>
                    <h3 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase mb-6">Database <br/> Expanding</h3>
                    <p className="text-black/40 text-lg md:text-xl font-medium max-w-md mx-auto">
                      Our repository of industrial solutions is currently being digitized and indexed for public release.
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF4A22] animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Live Updates in progress</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Solutions;
