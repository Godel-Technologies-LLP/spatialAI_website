import { motion } from "motion/react";

const StoryVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <motion.div
        animate={{ 
          rotateY: [0, 360],
          rotateX: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative preserve-3d"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-60">
          <defs>
            <linearGradient id="blueprint-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 200,50 L 350,150 L 350,250 L 200,350 L 50,250 L 50,150 Z"
            fill="none"
            stroke="black"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          <line x1="200" y1="50" x2="200" y2="350" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="50" y1="150" x2="350" y2="250" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="50" y1="250" x2="350" y2="150" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
          <motion.circle
            cx="200" cy="200" r="10"
            fill="black"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.circle
              key={i}
              r="3"
              fill="black"
              animate={{ 
                cx: 200 + 120 * Math.cos(angle * Math.PI / 180),
                cy: 200 + 120 * Math.sin(angle * Math.PI / 180),
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </svg>
      </motion.div>
      <div className="absolute top-0 left-0 technical-label !text-[8px] opacity-20">SYSTEM_CORE_V2.0</div>
      <div className="absolute bottom-0 right-0 technical-label !text-[8px] opacity-20 whitespace-nowrap">COORDINATE_SYSTEM: SPATIAL_AI</div>
      <motion.div 
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-black/5"
      />
    </div>
  );
};

export default StoryVisual;
