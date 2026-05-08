import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const ArchitectureContent = () => (
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
    </ul>

    <div className="w-full flex flex-col md:flex-row justify-center items-center py-16 gap-12 overflow-hidden bg-gray-50 border border-gray-200 rounded-3xl mt-12 mb-8 relative">
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
  </div>
);
