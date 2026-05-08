import React from 'react';
import { ArrowRight } from 'lucide-react';

export const PipelineContent = () => (
  <div className="space-y-6 font-sans">
    <div className="bg-[#FDF4E3] text-[#1E3F3C] p-8 md:p-16 rounded-3xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase text-[#1E3F3C]">Smart</h3>
        <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase text-[#1E3F3C]">Pipeline</h3>
      </div>
      
      <div className="flex flex-col items-center gap-8 relative z-10 font-sans">
        <div className="relative">
          <div className="w-2 h-16 bg-[#1A4F4A] mx-auto mb-2 rounded-full" />
          <div className="bg-[#1A4F4A] text-white p-6 rotate-45 rounded-lg shadow-xl w-48 h-48 flex items-center justify-center transform hover:scale-105 transition-transform cursor-crosshair">
            <div className="-rotate-45 text-center font-bold text-sm tracking-wide leading-relaxed px-4 font-headline uppercase tracking-tighter">
              Reconstruction <br /> Error {'>'} <br /> Threshold?
            </div>
          </div>
          
          <div className="absolute top-[80px] -left-[180px] w-[220px] h-3 bg-[#E56336] rounded-l-full" />
          <div className="absolute top-[80px] -left-[180px] w-3 h-[200px] bg-[#E56336]" />
          <div className="absolute top-[280px] -left-[180px] w-[140px] h-3 bg-[#E56336] rounded-r-xl" />
          <ArrowRight className="absolute top-[270px] -left-[50px] w-6 h-6 text-[#E56336]" />

          <div className="absolute top-[80px] -right-[180px] w-[220px] h-3 bg-[#326B63] rounded-r-full" />
          <div className="absolute top-[80px] -right-[180px] w-3 h-[200px] bg-[#326B63]" />
          <div className="absolute top-[280px] -right-[180px] w-[140px] h-3 bg-[#326B63] rounded-l-xl" />
          <ArrowRight className="absolute top-[270px] -right-[50px] w-6 h-6 text-[#326B63] rotate-180" />
        </div>

        <div className="grid grid-cols-2 gap-16 md:gap-32 mt-24">
          <div className="bg-[#E56336] text-white font-headline text-lg uppercase tracking-tighter font-bold p-6 rounded-xl text-center shadow-lg relative ml-[-30px]">
            <span>Remove<br/>Points &<br/>Re-Optimize</span>
            <div className="absolute top-1/2 -right-[60px] md:-right-[120px] w-[60px] md:w-[120px] h-2 bg-[#1A4F4A] -translate-y-1/2" />
            <ArrowRight className="absolute top-1/2 -right-[10px] md:-right-[20px] w-6 h-6 md:w-8 md:h-8 text-[#1A4F4A] -translate-y-1/2" />
          </div>

          <div className="bg-[#1A4F4A] text-white font-headline text-lg uppercase tracking-tighter font-bold p-6 rounded-xl text-center shadow-lg flex items-center justify-center md:mr-[-40px]">
            <span>Proceed<br/>to Meshing</span>
          </div>
        </div>
        
        <div className="w-4 h-16 md:h-24 bg-[#1A4F4A] mt-4 ml-[160px] md:ml-[220px] rounded-full" />
      </div>
    </div>
    <p className="mt-8 text-xs italic text-center text-gray-500 font-sans">
      Dynamic decision-making was programmed into the workflow to automate optimization.
    </p>
  </div>
);
