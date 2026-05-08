import React from 'react';
import { motion } from 'motion/react';

export const ResultsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="mb-8">
      The implementation yielded significant improvements:
    </p>
    <ul className="list-none space-y-8 pl-6 mb-16 font-sans text-base">
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">55% Reduction in Compute Time</strong>
      </li>
      <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-[#4A90E2] before:text-xl">
        <strong className="text-black block mb-2 font-headline uppercase tracking-tighter text-xl">80-85% Reduction in Human Operator Time</strong>
      </li>
    </ul>

    <div className="w-full h-[400px] bg-gray-50 border border-gray-200 rounded-3xl mt-16 mb-8 relative flex flex-col md:flex-row items-end justify-center md:items-center px-12 md:px-16 pb-12 md:pb-0 gap-8">
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
