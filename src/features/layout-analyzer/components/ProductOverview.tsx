import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface ProductOverviewProps {
  content: any;
  onGo: (step: string) => void;
}

const ProductOverview = ({ content, onGo }: ProductOverviewProps) => {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="page-section"
    >
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-header">
            <div className="pill mb-4">{content.label}</div>
            <h1 dangerouslySetInnerHTML={{ __html: content.headline }} />
            <p className="text-xl text-black/60 leading-relaxed max-w-xl mb-6">{content.subheadline}</p>
            <div className="flex gap-4 items-center">
              <button
                className="h-14 px-8 bg-black text-white rounded-full font-bold flex items-center gap-3 hover:bg-black/80 transition-colors"
                onClick={() => onGo('upload')}
              >
                {content.cta_primary} <span className="opacity-40">→</span>
              </button>
            </div>
          </div>
          
          <div className="data-frame">
            <div className="data-visual">
              <div className="grid-overlay" />
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="w-full h-full bg-white rounded-xl shadow-lg border border-black/5 flex overflow-hidden">
                  <div className="flex-1 border-r border-dashed border-black/10 p-6 flex flex-col gap-3">
                    <div className="w-full h-3 bg-black/5 rounded" />
                    <div className="w-2/3 h-3 bg-black/5 rounded" />
                    <div className="w-full h-12 bg-black/5 rounded" />
                  </div>
                  <div className="flex-1 bg-gray-50/50 p-6 flex flex-col gap-3 items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-16 rounded-full border-4 border-green-500/30 flex items-center justify-center text-green-600"
                    >
                      <Check size={32} strokeWidth={3} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-box"><div className="label">Vector</div><div className="value">66%</div></div>
              <div className="stat-box"><div className="label">Verdict</div><div className="value text-green-600">PASS</div></div>
              <div className="stat-box"><div className="label">Confidence</div><div className="value">98%</div></div>
            </div>
          </div>
        </div>
        
        {content.features && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 mb-24">
            {content.features.map((feature: any, i: number) => (
              <div className="card-base" key={i}>
                <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={22} />
                </div>
                <h3 className="font-headline font-bold text-xl uppercase mb-3">{feature.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

        {content.howItWorks && (
          <div className="border-t border-black/10 pt-20 pb-20">
            <div className="flex items-baseline justify-between mb-12">
              <h3 className="font-headline font-bold text-3xl uppercase">{content.howItWorks.title}</h3>
              <div className="tech-label">{content.howItWorks.label}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {content.howItWorks.steps.map((step: any, i: number) => (
                <div className="stat-box group hover:border-black/30 transition-colors" key={i}>
                  <div className="font-mono text-[10px] text-black/30 font-bold mb-4">{step.n}</div>
                  <h4 className="font-headline font-bold text-lg uppercase mb-2">{step.title}</h4>
                  <p className="text-black/50 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-black rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="font-headline font-bold text-3xl md:text-4xl text-white uppercase leading-tight mb-4">
              {content.headline.replace(/<\/?[^>]+(>|$)/g, "")}
            </h3>
            <p className="text-white/60 text-base max-w-xl">
              Stop guessing. Start measuring document quality before you commit to vectorization.
            </p>
          </div>
          <button 
            className="h-14 px-10 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-colors shrink-0" 
            onClick={() => onGo('upload')}
          >
            Start Analyzing Now
          </button>
        </div>
      </div>
    </motion.main>
  );
};

export default ProductOverview;
