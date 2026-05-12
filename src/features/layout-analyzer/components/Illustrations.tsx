import { motion } from "motion/react";

// ─── Feature illustrations ──────────────────────────────────────────────────

export const IllusComplexPdf = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
    {[2, 1, 0].map((i) => (
      <motion.rect
        key={i}
        x={32 + i * 10}
        y={10 + i * 6}
        width="56"
        height="60"
        rx="3"
        stroke="currentColor"
        strokeOpacity={0.18 + i * 0.18}
        strokeWidth="1.2"
        fill="white"
        initial={{ y: 14 + i * 6, opacity: 0 }}
        animate={{ y: 10 + i * 6, opacity: 1 }}
        transition={{ delay: (2 - i) * 0.25, duration: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
      />
    ))}
    <motion.g
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <line x1="42" y1="26" x2="74" y2="26" stroke="currentColor" strokeWidth="1.2" />
      <line x1="42" y1="34" x2="64" y2="34" stroke="currentColor" strokeWidth="1.2" />
      <line x1="42" y1="42" x2="78" y2="42" stroke="currentColor" strokeWidth="1.2" />
      <line x1="42" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="1.2" />
    </motion.g>
  </svg>
);

export const IllusStructuralAnalysis = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
    <rect x="20" y="14" width="80" height="52" rx="3" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
    <line x1="30" y1="56" x2="50" y2="32" stroke="currentColor" strokeWidth="1.4" />
    <line x1="50" y1="32" x2="70" y2="48" stroke="currentColor" strokeWidth="1.4" />
    <line x1="70" y1="48" x2="90" y2="28" stroke="currentColor" strokeWidth="1.4" />
    <motion.circle cx="30" cy="56" r="2.5" fill="currentColor" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0 }} />
    <motion.circle cx="50" cy="32" r="2.5" fill="currentColor" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }} />
    <motion.circle cx="70" cy="48" r="2.5" fill="currentColor" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }} />
    <motion.circle cx="90" cy="28" r="2.5" fill="currentColor" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.6 }} />
    <motion.line
      x1="20" x2="100"
      stroke="currentColor"
      strokeOpacity="0.35"
      strokeWidth="0.8"
      strokeDasharray="2 3"
      animate={{ y1: [14, 66, 14], y2: [14, 66, 14] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

export const IllusLayoutAware = () => {
  const cells = [
    { x: 18, y: 14, w: 36, h: 22 },
    { x: 60, y: 14, w: 42, h: 22 },
    { x: 18, y: 42, w: 22, h: 24 },
    { x: 46, y: 42, w: 28, h: 24 },
    { x: 80, y: 42, w: 22, h: 24 },
  ];
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="2" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" fill="currentColor" fillOpacity="0.04" />
          <motion.rect
            x={c.x} y={c.y} width={c.w} height={c.h} rx="2"
            stroke="currentColor"
            strokeWidth="1.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
          />
        </g>
      ))}
    </svg>
  );
};

// ─── Step illustrations (smaller) ───────────────────────────────────────────

export const StepIngest = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full p-1.5" fill="none">
    <rect x="14" y="22" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.4" />
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx={20 + i * 10}
        cy="10"
        r="2.2"
        fill="currentColor"
        animate={{ cy: [10, 24, 10], opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
      />
    ))}
  </svg>
);

export const StepMeasure = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full p-1.5" fill="none">
    <line x1="10" y1="44" x2="50" y2="44" stroke="currentColor" strokeWidth="1.4" />
    <line x1="10" y1="40" x2="10" y2="48" stroke="currentColor" strokeWidth="1.4" />
    <line x1="50" y1="40" x2="50" y2="48" stroke="currentColor" strokeWidth="1.4" />
    {[16, 24, 32, 40].map((x) => (
      <line key={x} x1={x} y1="42" x2={x} y2="46" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
    ))}
    <motion.rect
      x="14" width="20" height="14"
      stroke="currentColor" strokeWidth="1.4" fill="white"
      animate={{ x: [14, 26, 14] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      y="22"
    />
  </svg>
);

export const StepNormalize = () => {
  const targetH = 24;
  const bars = [10, 30, 18, 38];
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-1.5" fill="none">
      <line x1="10" y1="46" x2="50" y2="46" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      {bars.map((startH, i) => (
        <motion.rect
          key={i}
          x={12 + i * 10}
          width="6"
          fill="currentColor"
          animate={{ height: [startH, targetH, startH], y: [46 - startH, 46 - targetH, 46 - startH] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
};

export const StepClassify = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full p-1.5" fill="none">
    <circle cx="30" cy="12" r="3" fill="currentColor" />
    <path d="M 30 15 L 30 28 L 16 44" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="2 2" />
    <path d="M 30 15 L 30 28 L 44 44" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="16" cy="48" r="3" fill="currentColor" />
    <circle cx="44" cy="48" r="3" stroke="currentColor" strokeWidth="1.4" fill="white" />
    <motion.circle
      r="2.5"
      fill="currentColor"
      animate={{ cx: [30, 44], cy: [28, 44], opacity: [1, 0] }}
      transition={{ duration: 1.6, repeat: Infinity }}
    />
  </svg>
);
