import { motion } from "motion/react";

const SpatialCoreNode = ({ angle, delay, radius }: { angle: number, delay: number, radius: number }) => {
  return (
    <motion.circle
      r={Math.random() > 0.5 ? "2" : "1"}
      fill="#FF4A22"
      animate={{ 
        cx: 200 + radius * Math.cos(angle * Math.PI / 180),
        cy: 200 + radius * Math.sin(angle * Math.PI / 180),
        opacity: [0.1, 0.8, 0.1],
        scale: [1, 1.5, 1]
      }}
      transition={{ duration: 3 + Math.random() * 2, delay: delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const StoryVisual = () => {
  const nodes = Array.from({ length: 24 }).map((_, i) => ({
    angle: i * 15,
    delay: i * 0.1,
    radius: 120 + Math.random() * 40
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 bg-black overflow-hidden group">
      
      {/* Intense Ambient Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#FF4A22] rounded-full mix-blend-screen filter blur-[100px]"
      />

      <motion.div
        animate={{ 
          rotateZ: [0, 360],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ 
          rotateZ: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-full h-full relative"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Target Reticle Outer */}
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 8" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          
          {/* Dynamic Grid Core */}
          <motion.path
            d="M 200,80 L 304,140 L 304,260 L 200,320 L 96,260 L 96,140 Z"
            fill="none"
            stroke="rgba(255, 74, 34, 0.5)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />

          <motion.path
            d="M 200,120 L 269,160 L 269,240 L 200,280 L 131,240 L 131,160 Z"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
            animate={{ rotate: 180, originX: "200px", originY: "200px" }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          />

          {/* Internal Crosshairs */}
          <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Connective Node Web */}
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${i}`}
              x1="200" y1="200"
              x2={200 + node.radius * Math.cos(node.angle * Math.PI / 180)}
              y2={200 + node.radius * Math.sin(node.angle * Math.PI / 180)}
              stroke="rgba(255, 74, 34, 0.15)"
              strokeWidth="1"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, delay: node.delay, repeat: Infinity }}
            />
          ))}

          {/* Floating Data Points */}
          {nodes.map((node, i) => (
            <SpatialCoreNode key={`node-${i}`} {...node} />
          ))}

          {/* Central Processor Matrix */}
          <motion.circle
            cx="200" cy="200" r="40"
            fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2"
            strokeDasharray="10 5"
            animate={{ rotate: -360, originX: "200px", originY: "200px" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="200" cy="200" r="10"
            fill="#FF4A22"
            animate={{ 
              scale: [1, 1.8, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Technical HUD Overlays */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-[#FF4A22] opacity-80 tracking-widest flex flex-col gap-1">
        <span>sys.initialize()</span>
        <span>sp_core // ON</span>
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[8px] text-white/40 opacity-80 tracking-widest text-right flex flex-col gap-1">
        <span>TGT_LOCK_ACQUIRED</span>
        <span>LAT: 12ms | REND_ENGINE: V3</span>
      </div>

      {/* Sweep Scanner */}
      <motion.div 
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#FF4A22]/10 to-transparent pointer-events-none"
      />
    </div>
  );
};

export default StoryVisual;
