import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import DynamicSVGViewer from './DynamicSVGViewer';
import { getPdfSVG } from '../data/mock';

interface AnalysisResultsProps {
  currentResult: any;
  currentKind: string;
  currentPage: number;
  isRealFile: boolean;
  onGo: (step: string) => void;
  onSetCurrentPage: (updater: (p: number) => number) => void;
  apiBase: string;
}

const AnalysisResults = ({ 
  currentResult, 
  currentKind, 
  currentPage, 
  isRealFile, 
  onGo, 
  onSetCurrentPage, 
  apiBase 
}: AnalysisResultsProps) => {

  const renderDonut = (composition: any) => {
    const Circ = 2 * Math.PI * 44;
    let off = 0;
    const segs = [
      { val: composition.vector, color: '#000000' },
      { val: composition.hatch, color: '#7a5af8' },
      { val: composition.image, color: '#c2410c' },
      { val: composition.text, color: '#6b6b6d' },
    ];

    return segs.map((seg, i) => {
      const len = (seg.val / 100) * Circ;
      const dash = `${len} ${Circ - len}`;
      const offset = -off;
      off += len;
      return (
        <circle 
          key={i}
          cx="60" cy="60" r="44" 
          fill="none" 
          stroke={seg.color} 
          strokeWidth="14" 
          strokeDasharray={dash} 
          strokeDashoffset={offset} 
        />
      );
    });
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="page-section"
    >
      <div className="wrap">
        <div className="results-header">
          <div className="tech-label mb-6">Analysis Report Complete</div>
          <h1>{currentResult.headline}</h1>
          <div className={`verdict-badge ${currentResult.verdict === 'good' ? 'good' : 'bad'}`}>
            {currentResult.verdict === 'good' ? 'SUITABLE' : 'NOT SUITABLE'}
          </div>
          <p className="text-xl text-black/60 max-w-2xl mx-auto mt-8">{currentResult.sub}</p>
          
          <div className="flex justify-center gap-12 mt-16 max-w-4xl mx-auto p-10 bg-white rounded-3xl border border-black/5 shadow-sm">
            <div className="text-left">
              <div className="tech-label">Dominant Layer</div>
              <div className="font-headline font-bold text-3xl mt-1">{currentResult.verdict === 'good' ? 'VECTOR' : currentKind.toUpperCase()}</div>
            </div>
            <div className="w-px bg-black/5" />
            <div className="text-left">
              <div className="tech-label">Vector Density</div>
              <div className="font-headline font-bold text-3xl mt-1">{(currentResult.composition.vector + currentResult.composition.hatch).toFixed(2)}%</div>
            </div>
            <div className="w-px bg-black/5" />
            <div className="text-left">
              <div className="tech-label">Confidence Score</div>
              <div className="font-headline font-bold text-3xl mt-1">{currentResult.confidence}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card-base">
            <div className="flex justify-between items-baseline mb-10">
              <h3 className="font-headline font-bold text-xl uppercase tracking-tight">Composition</h3>
              <div className="tech-label opacity-40">Global Distribution</div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="donut-container">
                <svg className="-rotate-90 w-full h-full" viewBox="0 0 120 120">
                  <g>{renderDonut(currentResult.composition)}</g>
                </svg>
                <div className="donut-label">
                  <div className="v">{Math.max(currentResult.composition.vector + currentResult.composition.hatch, currentResult.composition.image, currentResult.composition.text).toFixed(1)}</div>
                  <div className="l">% Peak</div>
                </div>
              </div>
              
              <div className="flex-1 w-full space-y-4">
                {[
                  { label: 'Vector', val: currentResult.composition.vector, color: 'bg-black' },
                  { label: 'Hatch Area', val: currentResult.composition.hatch, color: 'bg-[#7a5af8]' },
                  { label: 'Image', val: currentResult.composition.image, color: 'bg-[#c2410c]' },
                  { label: 'Selectable Text', val: currentResult.composition.text, color: 'bg-[#6b6b6d]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                    <div className="flex-1 text-xs font-bold uppercase tracking-widest text-black/40">{item.label}</div>
                    <div className="font-mono text-sm font-bold">{item.val.toFixed(2)}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-black/5">
               {currentResult.metrics.slice(0, 6).map((m: any, i: number) => (
                 <div className="p-4 bg-gray-50/50 rounded-xl" key={i}>
                   <div className="tech-label text-[8px] opacity-40 mb-1">{m[0]}</div>
                   <div className="font-headline font-bold text-lg leading-none">{m[1]}</div>
                   <div className="font-mono text-[9px] text-black/30 mt-2">{m[2]}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="card-base flex flex-col">
            <div className="flex justify-between items-baseline mb-10">
              <h3 className="font-headline font-bold text-xl uppercase tracking-tight">Page Inspection</h3>
              <div className="tech-label opacity-40">{currentResult.pages} Pages Analyzed</div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-1">
                {currentResult.perPage.map((p: any, idx: number) => {
                  const comp = Array.isArray(p) ? p : p.composition;
                  const dom = Array.isArray(p) ? p[4] : p.composition[4];
                  const domColors: any = { v: 'text-black bg-black/5', i: 'text-orange-600 bg-orange-50', t: 'text-gray-500 bg-gray-50' };
                  
                  return (
                    <div className="pg-row" key={idx}>
                       <span className="font-mono text-[10px] font-bold text-black/30 tracking-tighter">P.{String(idx+1).padStart(2,'0')}</span>
                       <div className="pg-bar">
                         <i style={{ width: `${comp[0]}%`, backgroundColor: '#000000' }} />
                         <i style={{ width: `${comp[1]}%`, backgroundColor: '#7a5af8' }} />
                         <i style={{ width: `${comp[2]}%`, backgroundColor: '#c2410c' }} />
                         <i style={{ width: `${comp[3]}%`, backgroundColor: '#6b6b6d' }} />
                       </div>
                       <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest text-center ${domColors[dom] || 'bg-gray-100'}`}>
                         {dom === 'v' ? 'VEC' : dom === 'i' ? 'IMG' : 'TXT'}
                       </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="border border-black/10 rounded-3xl overflow-hidden bg-white">
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            <div>
              <div className="font-headline font-bold uppercase tracking-tight">{currentResult.name}</div>
              <div className="tech-label opacity-40 mt-1">{currentResult.meta}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button 
                  className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all disabled:opacity-20"
                  onClick={() => onSetCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-mono text-xs font-bold w-24 text-center">
                  {currentPage} / {currentResult.pages}
                </span>
                <button 
                  className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all disabled:opacity-20"
                  onClick={() => onSetCurrentPage(p => Math.min(currentResult.pages, p + 1))}
                  disabled={currentPage >= currentResult.pages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="w-px h-6 bg-black/10" />
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <Download size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#fcfcfc] aspect-video relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />
            </div>
            {isRealFile ? (
              <img 
                src={`${apiBase}/thumbnail/${encodeURIComponent(currentResult.name)}/${currentPage}`}
                alt={`Page ${currentPage}`}
                className="max-h-[85%] max-w-[85%] object-contain shadow-2xl border border-black/10"
              />
            ) : (
              <div className="w-[85%] h-[85%] shadow-2xl border border-black/10 bg-white">
                <DynamicSVGViewer svgString={getPdfSVG(currentKind, currentPage)} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
           <button 
            className="h-14 px-10 border border-black/10 rounded-full font-bold hover:bg-black hover:text-white hover:border-black transition-all"
            onClick={() => onGo('upload')}
           >
            Analyze Another Document
           </button>
        </div>
      </div>
    </motion.main>
  );
};

export default AnalysisResults;
