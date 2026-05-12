import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
  IllusComplexPdf,
  IllusStructuralAnalysis,
  IllusLayoutAware,
  StepIngest,
  StepMeasure,
  StepNormalize,
  StepClassify,
} from './Illustrations';

const FEATURE_ILLUSTRATIONS = [IllusComplexPdf, IllusStructuralAnalysis, IllusLayoutAware];
const STEP_ILLUSTRATIONS = [StepIngest, StepMeasure, StepNormalize, StepClassify];

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
        <div className="min-h-[85vh] flex flex-col justify-center relative pb-16">
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
              <a
                href="/layout-analyzer-whitepaper.pdf"
                download="Layout_Analyzer_Whitepaper.pdf"
                className="h-14 px-8 bg-transparent text-black border-2 border-black/10 rounded-full font-bold flex items-center justify-center hover:border-black/30 hover:bg-black/5 transition-all"
              >
                {content.cta_secondary}
              </a>
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

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
          >
            <p className="text-[10px] text-black/30 font-bold tracking-[0.2em] uppercase mb-3">Scroll to discover</p>
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-black/15 rounded-full flex justify-center p-1"
            >
              <div className="w-1 h-1.5 bg-black/30 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
        
        {content.features && (
          <div className="mt-24 mb-24">
            {content.featuresTitle && (
              <div className="flex items-baseline justify-between mb-16">
                <h3 className="font-headline font-bold text-3xl uppercase">{content.featuresTitle}</h3>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 border border-black/5 rounded-3xl overflow-hidden">
              {content.features.map((feature: any, i: number) => {
                const Illus = FEATURE_ILLUSTRATIONS[i];
                return (
                  <motion.div
                    key={i}
                    className="bg-white p-10 flex flex-col items-start text-black"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-full h-24 mb-8 text-black/70">{Illus && <Illus />}</div>
                    <h3 className="font-headline font-bold text-base uppercase tracking-tight mb-2">{feature.title}</h3>
                    <p className="text-black/50 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {content.howItWorks && (
          <div className="border-t border-black/10 pt-20 pb-20">
            <div className="flex items-baseline justify-between mb-16">
              <h3 className="font-headline font-bold text-3xl uppercase">{content.howItWorks.title}</h3>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-black/15" />
              {content.howItWorks.steps.map((step: any, i: number) => {
                const Illus = STEP_ILLUSTRATIONS[i];
                return (
                  <motion.div
                    key={i}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="relative z-10 w-20 h-20 bg-white border border-black/10 rounded-full flex items-center justify-center text-black mb-6 shadow-sm">
                      {Illus && <Illus />}
                    </div>
                    <div className="font-mono text-[10px] text-black/30 font-bold mb-2">{step.n}</div>
                    <h4 className="font-headline font-bold text-base uppercase mb-2">{step.title}</h4>
                    <p className="text-black/50 text-xs leading-relaxed max-w-[200px]">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-black rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="font-headline font-bold text-3xl md:text-4xl text-white uppercase leading-tight mb-4">
              Want to know the correct extraction strategy for your PDF?
            </h3>
            <p className="text-white/60 text-base max-w-xl">
              Stop guessing. Start understanding what your PDFs are made of and choose the right extraction strategy with confidence.
            </p>
          </div>
          <a 
            href="https://calendly.com/vishwa-godeltech/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-10 bg-white text-black rounded-full font-bold flex items-center justify-center hover:bg-white/90 transition-colors shrink-0" 
          >
            CONTACT US
          </a>
        </div>
      </div>
    </motion.main>
  );
};

export default ProductOverview;
