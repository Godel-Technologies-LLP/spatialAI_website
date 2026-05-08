import React from 'react';
import { motion } from 'motion/react';

interface StatusProgressProps {
  analysisPct: number;
  analysisStatus: string;
  currentResultName?: string;
}

const StatusProgress = ({ analysisPct, analysisStatus, currentResultName }: StatusProgressProps) => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-section"
    >
      <div className="wrap">
        <div className="max-w-2xl mx-auto py-24 text-center">
          <div className="relative w-32 h-32 mx-auto mb-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="46" 
                fill="none" stroke="currentColor" strokeWidth="4" 
                className="text-black/5" 
              />
              <circle 
                cx="50" cy="50" r="46" 
                fill="none" stroke="currentColor" strokeWidth="4" 
                strokeDasharray="289" 
                strokeDashoffset={289 * (1 - analysisPct / 100)} 
                className="text-black transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-headline font-bold text-3xl tracking-tighter">
              {Math.round(analysisPct)}<span className="text-sm opacity-30">%</span>
            </div>
          </div>

          <h2 className="font-headline font-bold text-3xl uppercase tracking-tight mb-4">
            {currentResultName || 'Analyzing Document...'}
          </h2>
          <p className="text-black/40 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            {analysisStatus}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {['Ingest', 'Measure', 'Normalize', 'Classify'].map((s, i) => {
              const stageIdx = Math.floor(analysisPct / 25);
              const isDone = i < stageIdx || analysisPct === 100;
              const isRun = i === stageIdx && analysisPct < 100;
              
              return (
                <div 
                  key={i} 
                  className={`stat-box text-left transition-all duration-500 ${
                    isDone ? 'bg-black text-white' : isRun ? 'border-black/30 bg-gray-50' : 'opacity-40'
                  }`}
                >
                  <div className={`tech-label mb-2 ${isDone ? 'text-white/40' : ''}`}>Stage 0{i+1}</div>
                  <div className="font-headline font-bold uppercase tracking-tight text-sm flex items-center justify-between">
                    {s}
                    {isDone && <span className="text-green-400">✓</span>}
                    {isRun && <div className="w-2 h-2 bg-black rounded-full animate-pulse" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default StatusProgress;
