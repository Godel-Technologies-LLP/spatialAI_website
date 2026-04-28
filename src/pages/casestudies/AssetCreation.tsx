import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowDown, Activity, Clock, Users, ArrowUp } from 'lucide-react';

const BackgroundContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The client specializes in creating high-fidelity 3D digital twins of industrial components for precise wear and tear measurement. Their competitive edge lies in an end-to-end automated pipeline that allows field operators to simply capture video footage of an object with a standard smartphone. 
    </p>
    <p>
      This video is then processed automatically to produce a detailed 3D asset, streamlining a traditionally complex process.
    </p>
    <div className="mt-12 p-8 bg-gray-50 border border-gray-200 border-l-4 border-l-[#FF4A22] rounded-r-xl">
      <p className="italic text-gray-500 font-sans text-base">
        "Manual interventions and process restarts led to significant delays and wasted resources."
      </p>
    </div>
  </div>
);

const ChallengeContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The client's automated pipeline was built on a single, monolithic script. While functional, it was rigid and inefficient. The primary challenges were:
    </p>
    <ul className="list-none space-y-6 my-8 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Frequent Failures:</strong> Processing runs often failed or produced low-accuracy models due to suboptimal input parameters or poor video quality.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Wasted Compute Time:</strong> When a run failed, the entire process had to be restarted from the beginning, consuming significant compute resources.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-[#FF4A22] before:font-bold">
        <strong className="text-black block mb-1">Manual Intervention:</strong> In the headless processing mode, designers had to manually sift through dense log files to diagnose issues, tweak parameters, and relaunch the job. This iterative, trial-and-error approach created a major bottleneck, demanding extensive human oversight and causing operator fatigue.
      </li>
    </ul>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Clock className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase">Reduce Time</span>
      </div>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Activity className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase">Improve Accuracy</span>
      </div>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <Users className="w-10 h-10 text-[#4A90E2] mb-4 stroke-[1.5]" />
        <span className="font-bold text-xs font-label tracking-widest text-[#4A90E2] uppercase leading-tight">Increase Operator <br/>Efficiency</span>
      </div>
    </div>
  </div>
);

const ObjectivesContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>The project was initiated to overhaul the existing pipeline with the following goals:</p>
    <ul className="list-none space-y-4 mt-6 mb-12 pl-6 font-sans text-base">
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Significantly reduce the compute time required for generating 3D assets.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Minimise the need for manual operator intervention and reduce human error.
      </li>
      <li className="relative before:content-['>'] before:absolute before:-left-6 before:text-gray-400 before:font-bold">
        Create a flexible and modular framework that allows for greater control and experimentation.
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
          Data Ingest
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50">
          Point Cloud<br/>Alignment
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50 row-start-2">
          Optimization
        </div>
        <div className="bg-white text-black font-label text-xs uppercase text-center p-5 rounded-lg z-10 shadow-sm border border-gray-200 ring-4 ring-gray-50 row-start-2 col-start-2">
          Model<br/>Generation
        </div>
      </div>
      <p className="mt-16 text-xs italic text-center text-gray-500 max-w-sm font-sans">
        The new Object-Oriented framework breaks the monolithic process into independent, manageable stages.
      </p>
    </div>
  </div>
);

const SolutionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p>
      The monolithic script was re-architected into a modular, Object-Oriented Programming (OOP) framework. This new system dismantled the single, linear process into a series of independent, interoperable stages.
    </p>
    <p className="mt-8 mb-6 font-sans font-medium text-black">The key features of the solution include:</p>
    <div className="space-y-6 mt-6 font-sans text-base">
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Modular Process Control</h4>
        <p className="text-gray-600">
          The new framework allows operators to start, stop, and resume the workflow from any individual step. If an error occurs during mesh generation, for example, the operator can adjust parameters for that specific stage and rerun it without reprocessing the initial, time-consuming steps.
        </p>
      </div>
      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <h4 className="text-black font-bold mb-3 uppercase font-label tracking-widest text-xs">Parallel Experimentation</h4>
        <p className="text-gray-600">
          The solution enables a <strong className="text-black">Design of Experiments (DoE)</strong> approach. Operators can run multiple versions of a single stage in parallel with different custom configurations, allowing them to quickly identify the optimal parameters for the highest quality output.
        </p>
      </div>
    </div>
  </div>
);

const PipelineContent = () => (
  <div className="space-y-6 font-sans">
    <div className="bg-[#FDF4E3] text-[#1E3F3C] p-8 md:p-16 rounded-3xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase text-[#1E3F3C]">Smart</h3>
        <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase text-[#1E3F3C]">Pipeline</h3>
      </div>
      
      <div className="flex flex-col items-center gap-8 relative z-10 font-sans">
        <div className="relative">
          <div className="w-2 h-16 bg-[#1A4F4A] mx-auto mb-2 rounded-full" />
          <div className="bg-[#1A4F4A] text-white p-6 rotate-45 rounded-lg shadow-xl w-48 h-48 flex items-center justify-center transform hover:scale-105 transition-transform cursor-crosshair">
            <div className="-rotate-45 text-center font-bold text-sm tracking-wide leading-relaxed px-4 font-headline uppercase tracking-tighter">
              Reconstruction <br /> Error {'>'} <br /> Threshold?
            </div>
          </div>
          
          <div className="absolute top-[80px] -left-[180px] w-[220px] h-3 bg-[#E56336] rounded-l-full" />
          <div className="absolute top-[80px] -left-[180px] w-3 h-[200px] bg-[#E56336]" />
          <div className="absolute top-[280px] -left-[180px] w-[140px] h-3 bg-[#E56336] rounded-r-xl" />
          <ArrowRight className="absolute top-[270px] -left-[50px] w-6 h-6 text-[#E56336]" />

          <div className="absolute top-[80px] -right-[180px] w-[220px] h-3 bg-[#326B63] rounded-r-full" />
          <div className="absolute top-[80px] -right-[180px] w-3 h-[200px] bg-[#326B63]" />
          <div className="absolute top-[280px] -right-[180px] w-[140px] h-3 bg-[#326B63] rounded-l-xl" />
          <ArrowRight className="absolute top-[270px] -right-[50px] w-6 h-6 text-[#326B63] rotate-180" />
        </div>

        <div className="grid grid-cols-2 gap-16 md:gap-32 mt-24">
          <div className="bg-[#E56336] text-white font-headline text-lg uppercase tracking-tighter font-bold p-6 rounded-xl text-center shadow-lg relative ml-[-30px]">
            <span>Remove<br/>Points &<br/>Re-Optimize</span>
            <div className="absolute top-1/2 -right-[60px] md:-right-[120px] w-[60px] md:w-[120px] h-2 bg-[#1A4F4A] -translate-y-1/2" />
            <ArrowRight className="absolute top-1/2 -right-[10px] md:-right-[20px] w-6 h-6 md:w-8 md:h-8 text-[#1A4F4A] -translate-y-1/2" />
          </div>

          <div className="bg-[#1A4F4A] text-white font-headline text-lg uppercase tracking-tighter font-bold p-6 rounded-xl text-center shadow-lg flex items-center justify-center md:mr-[-40px]">
            <span>Proceed<br/>to Meshing</span>
          </div>
        </div>
        
        <div className="w-4 h-16 md:h-24 bg-[#1A4F4A] mt-4 ml-[160px] md:ml-[220px] rounded-full" />
      </div>
    </div>
    <p className="mt-8 text-xs italic text-center text-gray-500 font-sans">
      Dynamic decision-making was programmed into the workflow to automate optimization.
    </p>
  </div>
);

const ArchitectureContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border border-gray-200 rounded-2xl mb-8">
      <div className="flex items-baseline gap-4">
        <span className="text-[#FF9900] text-5xl font-extrabold tracking-tight">aws</span>
        <span className="text-[#333] text-4xl font-headline font-bold uppercase">AWS</span>
      </div>
    </div>
    <p className="text-xs italic text-center text-gray-500 mb-12 max-w-sm mx-auto font-sans">
      The solution was built on a robust stack of open-source and proprietary technologies hosted on AWS.
    </p>

    <p>The solution is built on a modern, scalable tech stack:</p>
    <ul className="list-none space-y-3 mt-6 mb-10 pl-6 font-sans text-base">
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-gray-400">
        <strong className="text-black">Platform:</strong> AWS, Linux
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-gray-400">
        <strong className="text-black">Core Language:</strong> Python
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-gray-400">
        <strong className="text-black">Key APIs & Packages:</strong> Agisoft Metashape, ColMAP, OpenCV, Pandas
      </li>
    </ul>
    <p>
      The architecture follows a unidirectional graph paradigm. This structure provides users with fine-grained control over all available parameters for each processing step while ensuring a logical, forward-moving workflow. The revamped logging module feeds directly into the graph's decision points, and key log data is converted into plots to give operators an immediate visual understanding of process quality, making decision-making faster and more intuitive.
    </p>

    <div className="w-full flex flex-col md:flex-row justify-center items-center py-16 gap-12 overflow-hidden bg-gray-50 border border-gray-200 rounded-3xl mt-12 mb-8 relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={`clutter-${i}`}
            animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8], borderRadius: ["20%", "50%", "20%"] }} 
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }} 
            className="absolute inset-0 border border-black/20"
          />
        ))}
        <span className="font-headline font-bold uppercase tracking-widest text-black/40 z-10 bg-white/90 px-3 py-1 rounded-full shadow-sm text-sm">Legacy</span>
      </div>

      <ArrowRight className="w-10 h-10 text-gray-300 md:rotate-0 rotate-90" />

      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full h-full p-4 relative z-10">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={`mod-${i}`}
              animate={{ scale: [1, 0.9, 1], opacity: [0.5, 1, 0.5] }} 
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }} 
              className="w-full h-full bg-[#10B981] rounded-lg shadow-sm"
            />
          ))}
        </div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-10px] border border-dashed border-gray-300 rounded-full" />
        <span className="font-headline font-bold uppercase tracking-widest text-[#10B981] absolute -bottom-10 bg-white/90 px-3 py-1 rounded-full shadow-sm text-sm z-10">Modular</span>
      </div>
    </div>
    
    <p className="text-xs italic text-center text-gray-500 mt-8 max-w-md mx-auto font-sans">
      Streamlining the codebase was key to improving efficiency and enabling future development
    </p>
  </div>
);

const ResultsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="mb-8">
      The implementation of the new framework yielded significant and measurable improvements:
    </p>
    <ul className="list-none space-y-8 pl-6 mb-16 font-sans text-base">
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">55% Reduction in Compute Time</strong> By eliminating the need for full restarts, the optimized workflow cut machine processing time by more than half. On AWS, this translates to a direct compute cost saving of approximately 55% for the instances used (e.g., those with 16GB VRAM and 32GB DRAM).
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">80-85% Reduction in Human Operator Time</strong> Automating the diagnosis and restart process freed up designers from tedious log analysis and manual intervention, drastically reducing fatigue and allowing them to focus on higher-value tasks.
      </li>
    </ul>

    <div className="w-full h-[400px] bg-gray-50 border border-gray-200 rounded-3xl mt-16 mb-8 relative flex flex-col md:flex-row items-end justify-center md:items-center px-12 md:px-16 pb-12 md:pb-0 gap-8">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
      
      {/* Compute Optimization Bar */}
      <div className="w-full md:w-32 h-24 md:h-full flex md:flex-col items-center justify-end relative z-10 px-4 md:px-0 md:pb-12">
        <motion.div 
          initial={{ height: "100%", width: "100%" }}
          animate={{ height: ["100%", "45%", "45%"], width: ["100%", "45%", "45%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-full md:w-full h-full md:h-auto bg-[#FF4A22] border-2 border-black/10 rounded-xl md:rounded-t-xl md:rounded-b-none relative flex items-center md:items-start justify-center p-4 md:pt-6 shadow-[0_0_30px_rgba(255,74,34,0.2)] md:origin-bottom origin-right"
        >
          <span className="text-white font-headline md:text-xl font-bold uppercase tracking-tighter text-center leading-none">-55%<br className="hidden md:block"/><span className="text-[10px] md:text-xs">Compute</span></span>
        </motion.div>
      </div>
      
      {/* Time Optimization Bar */}
      <div className="w-full md:w-32 h-24 md:h-full flex md:flex-col items-center justify-end relative z-10 px-4 md:px-0 md:pb-12">
        <motion.div 
          initial={{ height: "100%", width: "100%" }}
          animate={{ height: ["100%", "15%", "15%"], width: ["100%", "15%", "15%"] }}
          transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full md:w-full h-full md:h-auto bg-[#4A90E2] border-2 border-black/10 rounded-xl md:rounded-t-xl md:rounded-b-none relative flex items-center md:items-start justify-center p-4 md:pt-6 shadow-[0_0_30px_rgba(74,144,226,0.2)] md:origin-bottom origin-right"
        >
          <span className="text-white font-headline md:text-xl font-bold uppercase tracking-tighter text-center leading-none">-85%<br className="hidden md:block"/><span className="text-[10px] md:text-xs">Time</span></span>
        </motion.div>
      </div>

      <div className="absolute top-12 md:top-auto md:bottom-12 md:left-16 text-center md:text-left">
        <span className="font-label text-xs uppercase tracking-widest text-[#FF4A22]">Impact Metrics</span>
        <h4 className="text-3xl font-headline font-black uppercase text-black">Dramatic<br/>Reduction</h4>
      </div>
    </div>
  </div>
);

const InsightsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="leading-loose mb-16">
      This project reinforced several key principles of scalable software development. First, refactoring cluttered, monolithic code is not just a cleanup exercise; it <strong className="text-black">democratizes the tool</strong>, making it more accessible and accelerating future development cycles. Second, when a company scales, the default solution is often to horizontally scale the number of machines, which can lead to massive and unsustainable cloud computing bills. This project proved that <strong className="text-black">periodically revamping core processes for algorithmic efficiency</strong> is a far more cost-effective and sustainable strategy for growth.
    </p>

    <div className="w-full aspect-square md:aspect-video bg-white border border-gray-200 overflow-hidden relative flex flex-col items-center justify-center p-8 mt-12 mb-8 rounded-[40px] shadow-sm">
      <div className="absolute inset-0 bg-gray-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200/50 via-gray-50 to-white"></div>
      
      <div className="relative z-10 w-full max-w-lg mb-8">
        <h4 className="font-label text-xs tracking-widest uppercase text-gray-500 mb-8 text-center bg-white px-4 py-2 rounded-full shadow-sm max-w-[240px] mx-auto border border-gray-100">Live Optimization</h4>
        <div className="flex gap-4 md:gap-8 mb-8 h-48 items-end justify-center">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={`node-${i}`}
              animate={{ height: ["100%", "20%", "60%", "100%"], backgroundColor: ["#10B981", "#e5e7eb", "#4A90E2", "#10B981"] }}
              transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 rounded-t-xl shadow-lg border-x-2 border-t-2 border-white"
            />
          ))}
        </div>
      </div>
      
      {/* Orbiting background elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-20%] md:inset-[-50%] border-2 border-dashed border-gray-200 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[10%] md:inset-[-20%] border border-gray-200 rounded-full pointer-events-none"
      />
    </div>
  </div>
);

const ConclusionContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="leading-loose mb-16">
      By transforming a rigid, inefficient script into a modular and intelligent framework, we delivered immediate and substantial value to the client. The project not only achieved its primary objectives of reducing compute and operator time but also established a robust, scalable foundation for future innovation. The next steps could involve integrating machine learning to predict optimal parameters based on initial video quality analysis, further reducing the need for any human-guided experimentation and moving towards a fully autonomous system.
    </p>

    <div className="pt-12 mt-16 border-t border-gray-200 font-sans">
      <h2 className="text-2xl md:text-3xl font-headline font-black uppercase text-black mb-2 tracking-tighter">Appendix</h2>
      <p className="text-gray-500 font-serif italic mb-10">Step-wise Time Distribution and Failure Rates detailed metrics.</p>
      
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Pipeline Step</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Typical Time %</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Failure Rate</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Computational Intensity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { step: 'Feature Detection', time: '10-15%', failure: '~5%', intensity: 'Low-Medium' },
              { step: 'Feature Matching', time: '15-20%', failure: '~15-20%', intensity: 'Medium' },
              { step: 'Sparse Cloud', time: '15-20%', failure: '~10-15%', intensity: 'Medium' },
              { step: 'Depth Map', time: '20-25%', failure: '~10%', intensity: 'High' },
              { step: 'Dense Reconstruction', time: '25-35%', failure: '~8-10%', intensity: 'Very High' },
              { step: 'Model Builder', time: '10-15%', failure: '~5%', intensity: 'Medium' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-black">{row.step}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{row.time}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{row.failure}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    row.intensity === 'Very High' ? 'bg-red-50 text-red-600' :
                    row.intensity === 'High' ? 'bg-orange-50 text-orange-600' :
                    row.intensity === 'Medium' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {row.intensity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  </div>
);

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
      <div className="pt-32 pb-32 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mb-12 mt-8 md:mb-16"
          >
            <span className="text-[#FF4A22] text-[10px] md:text-xs uppercase tracking-[0.3em] font-label font-bold block mb-4">Case Study</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-medium tracking-tighter leading-tight text-black mb-4 uppercase">
              Optimising 3D Asset Creation
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl font-serif">
              Automating photogrammetry workflows through object-oriented spatial pipelines.
            </p>
          </motion.div>

          {/* Main Layout: Sidebar + Content */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
            
            {/* Vertical Navigation Sidebar */}
            <div className="md:w-1/4">
              {/* Sticky container offset from top to account for header */}
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
                        layoutId="caseStudyActiveTab"
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
                  {/* Title heading for current section */}
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

export default AssetCreation;
