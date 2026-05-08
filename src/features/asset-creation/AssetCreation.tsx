import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';

// Section Imports
import { BackgroundContent } from './sections/Background';
import { ChallengeContent } from './sections/Challenge';
import { ObjectivesContent } from './sections/Objectives';
import { SolutionContent } from './sections/Solution';
import { PipelineContent } from './sections/Pipeline';
import { ArchitectureContent } from './sections/Architecture';
import { ResultsContent } from './sections/Results';
import { InsightsContent } from './sections/Insights';
import { ConclusionContent } from './sections/Conclusion';

const SECTIONS = [
  { id: 'background', title: 'Client Background', component: BackgroundContent },
  { id: 'challenge', title: 'Challenge & Problem', component: ChallengeContent },
  { id: 'objectives', title: 'Objectives', component: ObjectivesContent },
  { id: 'solution', title: 'Solution Overview', component: SolutionContent },
  { id: 'pipeline', title: 'Smart Pipeline', component: PipelineContent },
  { id: 'architecture', title: 'Architecture', component: ArchitectureContent },
  { id: 'results', title: 'Results & Impact', component: ResultsContent },
  { id: 'insights', title: 'Insights', component: InsightsContent },
  { id: 'conclusion', title: 'Conclusion', component: ConclusionContent },
];

const AssetCreation = () => {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const ActiveComponent = SECTIONS.find(s => s.id === activeTab)?.component || BackgroundContent;

  return (
    <Layout>
      <div className="pt-20 pb-32 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <header className="mb-12 md:mb-16">
            <span className="text-[#FF4A22] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Case Study</span>
            <h1 className="text-4xl md:text-5xl font-headline font-medium tracking-tighter uppercase">Optimising 3D Asset Creation</h1>
          </header>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
            <nav className="md:w-1/4">
              <div className="md:sticky top-32 flex flex-row flex-wrap md:flex-col gap-2 md:border-l border-gray-100">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`text-left px-6 py-4 text-[10px] uppercase tracking-widest transition-all ${
                      activeTab === section.id ? 'text-black font-bold border-l-2 border-[#FF4A22] -ml-[2px]' : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </nav>

            <main className="md:w-3/4 min-h-[600px] pb-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-headline font-medium uppercase tracking-tighter mb-10 pb-6 border-b border-gray-100">
                    {SECTIONS.find(s => s.id === activeTab)?.title}
                  </h2>
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssetCreation;
