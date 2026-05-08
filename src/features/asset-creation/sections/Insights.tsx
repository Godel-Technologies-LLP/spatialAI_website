import React from 'react';
import { motion } from 'motion/react';

export const InsightsContent = () => (
  <div className="space-y-6 text-gray-700 text-lg font-serif leading-relaxed">
    <p className="leading-loose mb-16">
      This project reinforced several key principles. Refactoring cluttered code is not just a cleanup; it <strong className="text-black">democratizes the tool</strong>, making it more accessible.
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
    </div>
  </div>
);
