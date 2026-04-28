import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowDown, Activity, Clock, Users, ArrowUp, MapPin, Database, Layers } from 'lucide-react';

const BackgroundContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      Our client is a leader in GIS data analytics and government policy consulting, working to create a centralised repository of farmland details. Their expertise bridges advanced geospatial technology with practical policy implementation.
    </p>
    <div className="mt-12 p-8 bg-gray-50 border border-gray-200 border-l-4 border-l-[#FF4A22] rounded-r-xl">
      <p className="italic text-gray-500 font-sans text-base">
        "Modernising agriculture starts with digitising farmlands. Integrating satellite imagery and on-ground measurements enables governments to make data-driven policies."
      </p>
    </div>
  </div>
);

const ChallengeContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      Satellite data provides macro-level insights, while on-field data offers granular details about individual land parcels. The primary challenges in unifying these were:
    </p>
    <ul className="list-none space-y-6 my-8 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Misaligned Boundaries:</strong> Satellite-based farmland boundaries, extracted via image processing, are approximate and often misaligned with ground realities.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Contextual Gaps:</strong> On-field measurements are more precise but collected for individual plots, lacking context about neighbouring farmlands.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Structural Differences:</strong> The two datasets differ in structure and granularity, making direct integration complex.
      </li>
    </ul>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <MapPin className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase">Align Boundaries</span>
      </div>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Layers className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase">Bridge Datasets</span>
      </div>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Database className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase leading-tight">Unify Data</span>
      </div>
    </div>
  </div>
);

const ObjectivesContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>To formulate better policies, allocate subsidies, and drive rural development, the project aimed to:</p>
    <ul className="list-none space-y-4 mt-6 mb-12 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Merge satellite and on-field farmland data into a single, accurate geospatial repository.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Automate the matching process to reduce manual effort and ensure consistency.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Enable hierarchical mapping from district to individual farmland level.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Provide actionable insights for government policy and resource allocation.
      </li>
    </ul>

    <div className="flex flex-col items-center py-16 bg-gray-50 border border-gray-200 rounded-2xl font-sans">
      <div className="grid grid-cols-2 gap-x-16 gap-y-12 relative max-w-[500px] w-full px-8">
        <div className="absolute top-[35px] left-[180px] right-[180px] h-0.5 bg-gray-300" />
        <div className="absolute bottom-[35px] left-[180px] right-[180px] h-0.5 bg-gray-300" />
        <div className="absolute right-[80px] top-[70px] bottom-[70px] w-0.5 bg-gray-300" />
        <div className="absolute left-[80px] top-[70px] bottom-[70px] w-0.5 bg-gray-300" />
        
        <ArrowRight className="absolute top-[25px] left-1/2 -translate-x-1/2 w-6 h-6 text-gray-400" />
        <ArrowDown className="absolute right-[68px] top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <ArrowRight className="absolute bottom-[25px] left-1/2 -translate-x-1/2 w-6 h-6 text-gray-400 rotate-180" />
        <ArrowUp className="absolute left-[68px] top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />

        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50">
          Data Collection
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50">
          Feature<br/>Extraction
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50 row-start-2">
          Validation &<br/>Integration
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50 row-start-2 col-start-2">
          Similarity<br/>Matching
        </div>
      </div>
      <p className="mt-16 text-xs italic text-center text-gray-500 max-w-sm font-sans">
        The matching pipeline extracts geometry embeddings to cross-reference multiple massive datasets.
      </p>
    </div>
  </div>
);

const SolutionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The solution converts each farmland’s geometry into a polyline, then transforms these into embedding vectors by considering attributes like edge angles, area, and other shape factors. A similarity search algorithm matches on-field and satellite data, enabling robust, automated alignment of farmland boundaries.
    </p>
    <p className="mt-8 mb-6 font-sans font-medium text-black">Key features:</p>
    <div className="space-y-6 mt-6 font-sans text-base">
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Automated Shape Matching</h4>
        <p className="text-gray-600">
          Reduces manual annotation and subjective errors, streamlining the traditionally intensive mapping process.
        </p>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Embedding-based Similarity</h4>
        <p className="text-gray-600">
          Captures nuanced geometric differences for highly accurate matching across varying resolutions and topographies.
        </p>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Consistent Labelling</h4>
        <p className="text-gray-600">
          Ensures uniform results across annotators and datasets.
        </p>
      </div>
    </div>
  </div>
);

const ImplementationContent = () => (
  <div className="space-y-6 font-sans">
    <div className="bg-[#1A4F4A] text-[#FDF4E3] p-8 md:p-16 rounded-3xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase text-[#FDF4E3]">Implementation</h3>
      </div>
      
      <div className="flex flex-col items-start gap-8 relative z-10 font-sans pl-4 border-l-2 border-[#326B63]">
        <div className="relative mb-6">
          <div className="absolute w-4 h-4 rounded-full bg-[#E56336] -left-[25px] top-1" />
          <h4 className="text-xl font-headline uppercase font-bold text-white mb-2">Data Collection & Preprocessing</h4>
          <p className="text-gray-300">Gather satellite imagery and on-field measurements. Simplify polylines by merging nearly collinear edges.</p>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute w-4 h-4 rounded-full bg-[#E56336] -left-[25px] top-1" />
          <h4 className="text-xl font-headline uppercase font-bold text-white mb-2">Feature Extraction</h4>
          <p className="text-gray-300">Convert farmland boundaries into embedding vectors using geometric attributes.</p>
        </div>

        <div className="relative mb-6">
          <div className="absolute w-4 h-4 rounded-full bg-[#E56336] -left-[25px] top-1" />
          <h4 className="text-xl font-headline uppercase font-bold text-white mb-2">Similarity Search & Matching</h4>
          <p className="text-gray-300">Run automated similarity search between datasets to identify corresponding farmlands.</p>
        </div>

        <div className="relative mb-6">
          <div className="absolute w-4 h-4 rounded-full bg-[#E56336] -left-[25px] top-1" />
          <h4 className="text-xl font-headline uppercase font-bold text-white mb-2">Hierarchical Mapping</h4>
          <p className="text-gray-300">Organize matched data at district, block, village, and plot levels.</p>
        </div>

        <div className="relative">
          <div className="absolute w-4 h-4 rounded-full bg-[#E56336] -left-[25px] top-1" />
          <h4 className="text-xl font-headline uppercase font-bold text-white mb-2">Validation & Integration</h4>
          <p className="text-gray-300">Validate matches, perform spot checks, and integrate into the centralised repository.</p>
        </div>
      </div>
    </div>
  </div>
);

const ArchitectureContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>The system is built on a robust geospatial technology stack to handle the massive data scale (hundreds of thousands of farmlands per state) and shape complexity:</p>
    <ul className="list-none space-y-3 mt-6 mb-10 pl-6 font-sans text-base">
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-gray-400">
        <strong className="text-black">Visualization:</strong> QGIS for visualization and manual corrections.
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-gray-400">
        <strong className="text-black">Spatial Data:</strong> GeoPandas for spatial data manipulation and analysis.
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-gray-400">
        <strong className="text-black">Custom Algorithms:</strong> Custom shape matching and embedding algorithms for automated data integration.
      </li>
    </ul>
    
    <p>
      Hierarchical data organization ensures efficient navigation from macro to micro levels. Edge simplification merges nearly collinear edges to harmonize shapes, and optimized algorithms handle the immense dataset size without compromising precision.
    </p>

    <div className="w-full flex flex-col md:flex-row justify-center items-center py-16 gap-12 overflow-hidden bg-gray-50 border border-gray-200 rounded-3xl mt-12 mb-8 relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
      
      <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 z-10">
        <span className="font-headline font-bold uppercase tracking-widest text-[#FF4A22] text-sm text-center">Satellite<br/>Data</span>
      </div>

      <div className="flex flex-col items-center">
        <ArrowRight className="w-10 h-10 text-gray-300" />
        <span className="font-label text-[10px] tracking-widest uppercase text-gray-400 mt-2">Embeddings</span>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 z-10">
        <span className="font-headline font-bold uppercase tracking-widest text-[#4A90E2] text-sm text-center">On-field<br/>Data</span>
      </div>
    </div>
  </div>
);

const ResultsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="mb-8">
      The deployment of the unified geospatial repository brought tremendous improvements to policy-driven agriculture workflows:
    </p>
    <ul className="list-none space-y-8 pl-6 mb-16 font-sans text-base">
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">70% Manual Effort Reduction</strong> Automated matching cuts annotation time by over 70%, enabling teams to process thousands of farmlands daily instead of getting bogged down in manual cross-referencing.
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">Consistent Data Quality</strong> Standardized algorithms eliminate inter-annotator variability, creating a ground truth that is highly reliable for policy making.
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">Scalable Solution</strong> Hierarchical mapping supports seamless expansion across states and districts, adapting to varying geographical complexities.
      </li>
    </ul>
  </div>
);

const InsightsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <div className="space-y-8">
      <div>
        <h4 className="font-headline font-bold text-black uppercase tracking-tighter text-xl mb-2">Key Learning</h4>
        <p>Preprocessing polylines to merge small-angle edges is critical for accurate matching, as satellite and on-field data often differ in edge count. Cleaning the data at the shape-level prevents down-stream matching errors.</p>
      </div>
      <div>
        <h4 className="font-headline font-bold text-black uppercase tracking-tighter text-xl mb-2">Obstacle</h4>
        <p>Handling the sheer volume of data required robust, scalable algorithms and hierarchical processing. District-wide macro analyses had to be broken down intelligently.</p>
      </div>
      <div>
        <h4 className="font-headline font-bold text-black uppercase tracking-tighter text-xl mb-2">Best Practice</h4>
        <p>Embedding-based similarity search proved more effective than traditional shape-matching for complex, noisy boundaries, successfully correlating disparate data inputs.</p>
      </div>
    </div>
  </div>
);

const ConclusionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="leading-loose mb-16">
      This project demonstrates how advanced geospatial analytics can unify disparate farmland datasets, driving efficiency and accuracy for government policy-making. The centralized repository lays the groundwork for smarter subsidies, targeted interventions, and comprehensive rural development. Next, the focus will be on integrating real-time crop monitoring and expanding coverage to new territories.
    </p>
  </div>
);

const SECTIONS = [
  { id: 'background', title: 'Client Background', component: BackgroundContent },
  { id: 'challenge', title: 'Challenge & Problem', component: ChallengeContent },
  { id: 'objectives', title: 'Objectives', component: ObjectivesContent },
  { id: 'solution', title: 'Solution Overview', component: SolutionContent },
  { id: 'architecture', title: 'Architecture', component: ArchitectureContent },
  { id: 'implementation', title: 'Implementation', component: ImplementationContent },
  { id: 'results', title: 'Results & Impact', component: ResultsContent },
  { id: 'insights', title: 'Insights', component: InsightsContent },
  { id: 'conclusion', title: 'Conclusion & Next Steps', component: ConclusionContent },
];

const DigitisingFarmlands = () => {
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
              Digitising Farmlands
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl font-serif">
              Building a Unified Geo-spatial Repository for Policy-Driven Agriculture.
            </p>
          </motion.div>

          {/* Main Layout: Sidebar + Content */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
            
            {/* Vertical Navigation Sidebar */}
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
                        layoutId="caseStudy2ActiveTab"
                        className="hidden md:block absolute h-full w-[3px] top-0 left-[-1.5px] bg-[#FF4A22]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
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

export default DigitisingFarmlands;
