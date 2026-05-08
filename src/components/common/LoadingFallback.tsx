import React from 'react';
import { motion } from 'motion/react';

const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Animated background rings */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
            borderRadius: ["20%", "50%", "20%"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border border-black/10"
        />
        <motion.div 
          animate={{ 
            rotate: 360,
            borderRadius: ["50%", "20%", "50%"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-black/20"
        />
        
        {/* Central pulsing node */}
        <motion.div 
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 bg-black rounded-lg flex items-center justify-center shadow-xl"
        >
          <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 mb-2">Initializing Module</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-black rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;
