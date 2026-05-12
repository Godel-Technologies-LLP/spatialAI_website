import React from 'react';
import { motion } from 'motion/react';
import { Upload, Layers, ImageIcon, FileText, ShieldCheck, Lock } from 'lucide-react';

interface UploaderAreaProps {
  onGo: (step: string) => void;
  onStartAnalysis: (kind: string) => void;
  onProcessFile: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploaderArea = ({ 
  onGo, 
  onStartAnalysis, 
  onProcessFile, 
  fileInputRef, 
  handleFileUpload 
}: UploaderAreaProps) => {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="page-section"
    >
      <div className="wrap">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-10">
          <button onClick={() => onGo('product')} className="hover:text-black">Platform</button> 
          <span className="opacity-30">/</span> 
          <b className="text-black">Upload</b>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div 
            className="uploader-area"
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-active'); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-active'); }}
            onDrop={(e) => { 
              e.preventDefault(); 
              e.currentTarget.classList.remove('drag-active'); 
              const file = e.dataTransfer.files?.[0];
              if (file && file.type === 'application/pdf') {
                onProcessFile(file);
              } else if (file) {
                alert('Please upload a PDF file.');
              }
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mx-auto mb-6">
              <ShieldCheck size={12} className="text-emerald-700" strokeWidth={2.5} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Processed in your browser · Data remains local
              </span>
            </div>
            <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-black/5 flex items-center justify-center mx-auto mb-6 text-black/40">
              <Upload size={24} />
            </div>
            <h2 className="font-headline font-bold text-3xl uppercase tracking-tight mb-4">Upload PDF for Analysis</h2>
            <p className="text-black/50 text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Drop your engineering drawings, surveys, or spec sheets here to evaluate suitability for geometric vectorization. Files are analyzed locally — we never see your documents.
            </p>
            <div className="flex justify-center">
              <button 
                className="h-12 px-8 bg-black text-white rounded-full font-bold hover:bg-black/80 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{display:'none'}} 
                accept=".pdf" 
                onChange={handleFileUpload}
              />
            </div>
            <div className="flex justify-center gap-10 mt-12 pt-8 border-t border-black/5">
              <div className="tech-label">Max 100MB</div>
              <div className="tech-label">Multi-page support</div>
              <div className="tech-label flex items-center gap-1.5">
                <Lock size={9} strokeWidth={2.5} />
                100% On-Device
              </div>
            </div>
          </div>

          <div className="card-base">
            <h4 className="font-headline font-bold text-lg uppercase mb-2">Try a sample</h4>
            <p className="text-black/40 text-xs mb-8">Select a document type to see the engine in action.</p>
            
            <div className="space-y-3">
              {[
                { id: 'vector', name: 'Floor Plan B', meta: 'Vector Asset', icon: Layers, color: 'text-black' },
                { id: 'image', name: 'Site Scan 04', meta: 'Raster Scan', icon: ImageIcon, color: 'text-orange-600' },
                { id: 'text', name: 'Spec Sheet', meta: 'Text/Data', icon: FileText, color: 'text-gray-500' },
              ].map((sample) => (
                <div 
                  key={sample.id}
                  onClick={() => onStartAnalysis(sample.id)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-black/5 hover:bg-black/[0.02] hover:border-black/20 cursor-pointer transition-all group"
                >
                  <div className={`w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center ${sample.color}`}>
                    <sample.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm uppercase tracking-tight">{sample.name}</div>
                    <div className="tech-label text-[8px] opacity-60 mt-1">{sample.meta}</div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black transition-colors">
                    <span className="text-[10px]">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default UploaderArea;
