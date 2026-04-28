import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowDown, ArrowUp, MessageSquare, Layout as LayoutIcon, Shield, Zap, Target, Lightbulb, Github, Video } from 'lucide-react';

const BackgroundContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      Architecture firms face persistent challenges in accommodating the countless customisations requested by clients during the floor plan design process. Traditional workflows leave architects fatigued and often lead to premature design freeze, limiting client satisfaction and design potential.
    </p>
    <div className="mt-12 p-8 bg-gray-50 border border-gray-200 border-l-4 border-l-[#FF4A22] rounded-r-xl">
      <p className="italic text-gray-500 font-sans text-base">
        "We have developed a web-based chatbot solution that empowers clients to make real-time, constraint-aware adjustments to floor plans, dramatically accelerating iterations and reducing the architect’s workload."
      </p>
    </div>
  </div>
);

const ChallengeContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The manual customization of floor plans was a significant bottleneck in the architectural workflow:
    </p>
    <ul className="list-none space-y-6 my-8 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Time-Consuming Iterations:</strong> Frequent changes were exhausting for architects and slowed project timelines.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Premature Design Freeze:</strong> Designers often stopped revisions early to avoid endless cycles, sacrificing potential improvements.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Input Quality Issues:</strong> Imperfect input drawings required heavy manual preparation.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Scalability Concerns:</strong> Complexity increased exponentially with multi-dimensional designs and more features.
      </li>
    </ul>
  </div>
);

const ObjectivesContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>The project focused on streamlining customization through conversational AI:</p>
    <ul className="list-none space-y-4 mt-6 mb-12 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Enable rapid, user-driven floor plan customizations via a chatbot interface.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Reduce architects’ workload by shifting basic design edits to the customer.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Ensure all changes respect architectural constraints and maintain design integrity.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Provide a seamless, web-based user experience requiring minimal training.
      </li>
    </ul>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 font-sans">
      <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-4">
        <Target className="w-8 h-8 text-[#FF4A22] shrink-0" />
        <span className="text-sm font-medium uppercase tracking-wider">Streamline Customization</span>
      </div>
      <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-4">
        <Zap className="w-8 h-8 text-[#FF4A22] shrink-0" />
        <span className="text-sm font-medium uppercase tracking-wider">Accelerate Iterations</span>
      </div>
    </div>
  </div>
);

const SolutionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      We developed a web-based chatbot interface that allows clients to interact directly with their floor plans. The system is loaded with architectural constraints for each component, ensuring that all changes are valid and feasible.
    </p>

    <div className="my-12">
      <img 
        src="/casestudy3_overview.png" 
        alt="Conversational interface and floor plan customisation examples" 
        className="w-full rounded-3xl border border-gray-100 shadow-lg"
      />
      <p className="mt-4 text-xs italic text-center text-gray-500 font-sans">
        Real-time, constraint-aware design adjustments via chatbot interface.
      </p>
    </div>

    <div className="space-y-6 mt-8 font-sans text-base">
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Conversational Interface</h4>
        <p className="text-gray-600">Users can request edits in plain language (e.g., “Move the door to the right”).</p>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs flex items-center gap-2"><Shield className="w-4 h-4"/> Constraint Validation</h4>
        <p className="text-gray-600">The system checks each request against predefined rules (e.g., doors can only slide along walls, minimum clearances).</p>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs flex items-center gap-2"><LayoutIcon className="w-4 h-4"/> Visual Feedback</h4>
        <p className="text-gray-600">Updated floor plan images are generated and sent to the user after each approved change.</p>
      </div>
    </div>
  </div>
);

const ImplementationContent = () => (
  <div className="space-y-8 text-gray-700 text-lg font-serif leading-relaxed">
    <div className="grid md:grid-cols-2 gap-8 font-sans">
      <div className="space-y-4">
        <h4 className="text-black font-bold uppercase tracking-widest text-xs">1. CAD Model Prep</h4>
        <p className="text-sm text-gray-600">Standardized naming, layering, and movement range definitions (e.g., 0-1 slide range for doors).</p>
      </div>
      <div className="space-y-4">
        <h4 className="text-black font-bold uppercase tracking-widest text-xs">2. Chatbot Dev</h4>
        <p className="text-sm text-gray-600">Web-based interface supporting text/voice with real-time image streaming and NLU integration.</p>
      </div>
      <div className="space-y-4">
        <h4 className="text-black font-bold uppercase tracking-widest text-xs">3. Backend Engine</h4>
        <p className="text-sm text-gray-600">Constraint validation in Python (ezdxf) with programmatic image generation.</p>
      </div>
      <div className="space-y-4">
        <h4 className="text-black font-bold uppercase tracking-widest text-xs">4. Deployment</h4>
        <p className="text-sm text-gray-600">Standalone web application with publicly accessible API and concurrent user load testing.</p>
      </div>
    </div>
  </div>
);

const ResultsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <div className="grid md:grid-cols-2 gap-12 mb-16 font-sans">
      <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="text-4xl font-headline font-bold text-[#FF4A22] mb-2">Days to Minutes</div>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Revision Cycle Reduction</p>
      </div>
      <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="text-4xl font-headline font-bold text-[#FF4A22] mb-2">~0%</div>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Customization Error Rate</p>
      </div>
    </div>
    <ul className="list-none space-y-4 font-sans text-base">
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#FF4A22]">
        Client satisfaction improved with direct control over design choices.
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#FF4A22]">
        Foundation established for expanding to multi-dimensional edits.
      </li>
    </ul>
  </div>
);

const InsightsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <div className="mb-12">
      <blockquote className="text-2xl md:text-3xl text-black font-headline tracking-tighter leading-tight italic text-center max-w-3xl mx-auto">
        "Automating routine edits frees up architects for higher-value design work, but success depends on robust constraint management."
      </blockquote>
    </div>
    <div className="grid md:grid-cols-2 gap-8 font-sans">
      <div className="p-8 bg-gray-50 rounded-2xl">
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-[#FF4A22]"/> Input Data Quality</h4>
        <p className="text-sm text-gray-600">Ensuring CAD drawings were properly formatted required upfront investment and clear guidelines for designers.</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-2xl">
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-[#FF4A22]"/> User Guidance</h4>
        <p className="text-sm text-gray-600">Minimal training was needed, but clear onboarding and in-app guidance proved essential for rapid adoption.</p>
      </div>
    </div>
  </div>
);

const ConclusionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      This project demonstrates how conversational AI can revolutionize architectural design workflows—empowering clients, streamlining design iterations, and allowing architects to focus on innovation.
    </p>
    <div className="pt-12 mt-16 border-t border-gray-200 font-sans flex flex-col md:flex-row gap-6 items-center justify-between">
      <div className="flex gap-4">
        <a 
          href="https://github.com/Godel-Technologies-LLP/cad-bot.git" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
        >
          <Github className="w-4 h-4" /> Repository
        </a>
        <a 
          href="https://drive.google.com/file/d/1Z_sP-mznzHwOeoDUUB76OBgvzlBabowu/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
        >
          <Video className="w-4 h-4" /> Demo Video
        </a>
      </div>
      <a href="mailto:info@godeltech.in" className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#FF4A22] transition-colors">
        Get in touch
      </a>
    </div>
  </div>
);

const SECTIONS = [
  { id: 'background', title: 'Executive Summary', component: BackgroundContent },
  { id: 'challenge', title: 'Challenge & Problem', component: ChallengeContent },
  { id: 'objectives', title: 'Objectives', component: ObjectivesContent },
  { id: 'solution', title: 'Solution Overview', component: SolutionContent },
  { id: 'implementation', title: 'Implementation', component: ImplementationContent },
  { id: 'results', title: 'Results & Impact', component: ResultsContent },
  { id: 'insights', title: 'Lessons Learned', component: InsightsContent },
  { id: 'conclusion', title: 'Conclusion & Next Steps', component: ConclusionContent },
];

const ConversationalAI = () => {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const ActiveComponent = SECTIONS.find(s => s.id === activeTab)?.component || BackgroundContent;

  return (
    <Layout>
      <div className="pt-32 pb-32 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mb-12 mt-8 md:mb-16"
          >
            <span className="text-[#FF4A22] text-[10px] md:text-xs uppercase tracking-[0.3em] font-label font-bold block mb-4">Case Study</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-medium tracking-tighter leading-tight text-black mb-4 uppercase">
              Conversational AI for Floor Plan Customisation
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl font-serif">
              Empowering architects with conversational design tools for constraint-aware adjustments.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
            <div className="md:w-1/4">
              <div className="md:sticky top-32 flex flex-row flex-wrap md:flex-col gap-2 md:gap-0 hide-scrollbar pb-6 md:pb-0 md:border-l border-gray-200">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`relative text-left px-4 md:px-6 py-2.5 md:py-5 font-label text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 rounded-xl md:rounded-none ${
                      activeTab === section.id
                        ? 'bg-white md:bg-transparent text-black font-bold shadow-sm md:shadow-none border border-black/5 md:border-transparent'
                        : 'bg-black/5 md:bg-transparent text-gray-500 hover:text-black hover:bg-black/10 md:hover:bg-transparent md:hover:pl-8 border border-transparent'
                    }`}
                  >
                    {section.title}
                    {activeTab === section.id && (
                      <motion.div
                        layoutId="caseStudy3ActiveTab"
                        className="hidden md:block absolute h-full w-[3px] top-0 left-[-1.5px] bg-[#FF4A22]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:w-3/4 min-h-[600px] pb-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="text-3xl md:text-4xl font-headline font-medium text-black uppercase tracking-tighter mb-10 pb-6 border-b border-gray-100">
                    {SECTIONS.find(s => s.id === activeTab)?.title}
                  </h2>
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConversationalAI;
