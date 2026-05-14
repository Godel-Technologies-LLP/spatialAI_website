import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, Layers, ImageIcon, FileText, ShieldCheck, Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
interface UploaderAreaProps {
  onGo: (step: string) => void;
  onStartAnalysis: (kind: string) => void;
  onProcessFile: (file: File, leadData?: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, leadData?: any) => void;
}

const UploaderArea = ({ 
  onGo, 
  onStartAnalysis, 
  onProcessFile, 
  fileInputRef, 
  handleFileUpload 
}: UploaderAreaProps) => {
  const [leadData, setLeadData] = useState({ name: '', email: '', company: '' });
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setLeadData({
          name: session.user.user_metadata?.name || 'Verified User',
          email: session.user.email || '',
          company: session.user.user_metadata?.company || '',
        });
        setIsLeadSubmitted(true);
      }
    };
    checkSession();
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;
    
    // Check if Supabase env vars are set
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setErrorMsg('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setOtpCode(''); // Clear any previous codes
    
    const { error } = await supabase.auth.signInWithOtp({
      email: leadData.email,
      options: {
        emailRedirectTo: window.location.origin + '/products/layout-analyzer',
        data: {
          name: leadData.name,
          company: leadData.company,
        }
      }
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setOtpStep(true);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Supabase can generate different token types depending on whether it's a new user, 
    // an existing user, or whether "Confirm Email" is enabled in the dashboard.
    // Sanitize code by removing any spaces
    const cleanCode = otpCode.replace(/\s/g, '');
    const reqEmail = leadData.email.trim().toLowerCase();
    
    let result = await supabase.auth.verifyOtp({ email: reqEmail, token: cleanCode, type: 'email' });
    let lastErrorMsg = result.error?.message;
    
    if (result.error) {
      result = await supabase.auth.verifyOtp({ email: reqEmail, token: cleanCode, type: 'signup' });
      if (result.error) lastErrorMsg = result.error.message;
    }
    
    if (result.error) {
      result = await supabase.auth.verifyOtp({ email: reqEmail, token: cleanCode, type: 'magiclink' });
      if (result.error) lastErrorMsg = result.error.message;
    }

    setIsLoading(false);

    if (result.error) {
      console.error("Supabase Verify Error:", result.error);
      setErrorMsg(`Error: ${lastErrorMsg}`);
    } else if (result.data?.session) {
      setIsLeadSubmitted(true);
      setOtpStep(false);
    }
  };

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
          <div className="uploader-area">
            {!isLeadSubmitted ? (
              <div className="max-w-md mx-auto py-8">
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6 text-black">
                  <User size={24} />
                </div>
                <h2 className="font-headline font-bold text-2xl uppercase tracking-tight mb-2">
                  {otpStep ? "Verify Your Email" : "Access Analyzer"}
                </h2>
                <p className="text-black/50 text-sm mb-6 leading-relaxed">
                  {otpStep 
                    ? `We've sent a 6-digit verification code to ${leadData.email}.` 
                    : "Please provide your details to continue. Your document remains your property and is never uploaded to our servers."}
                </p>
                
                {!otpStep ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/60 mb-1.5">Name</label>
                      <input required type="text" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors" placeholder="Jane Doe" disabled={isLoading} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/60 mb-1.5">Email</label>
                      <input required type="email" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors" placeholder="jane@company.com" disabled={isLoading} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/60 mb-1.5">Company (Optional)</label>
                      <input type="text" value={leadData.company} onChange={e => setLeadData({...leadData, company: e.target.value})} className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors" placeholder="Acme Corp" disabled={isLoading} />
                    </div>
                    {errorMsg && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded">{errorMsg}</div>}
                    <button type="submit" disabled={isLoading} className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-black/80 transition-colors mt-6 disabled:opacity-50 flex items-center justify-center">
                      {isLoading ? "Sending..." : "Send Verification Code"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/60 mb-1.5">6-Digit Code</label>
                      <input required type="text" maxLength={6} autoComplete="one-time-code" value={otpCode} onChange={e => setOtpCode(e.target.value)} className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors text-center tracking-[0.5em] font-mono text-lg" placeholder="••••••" disabled={isLoading} />
                    </div>
                    {errorMsg && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded">{errorMsg}</div>}
                    <button type="submit" disabled={isLoading || otpCode.length < 6} className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-black/80 transition-colors mt-6 disabled:opacity-50 flex items-center justify-center">
                      {isLoading ? "Verifying..." : "Verify & Continue"}
                    </button>
                    <button type="button" onClick={() => setOtpStep(false)} disabled={isLoading} className="w-full text-xs text-black/40 hover:text-black transition-colors text-center mt-2 disabled:opacity-50">
                      ← Back to details
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div 
                className="w-full h-full flex flex-col items-center justify-center"
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.closest('.uploader-area')?.classList.add('drag-active'); }}
                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.closest('.uploader-area')?.classList.remove('drag-active'); }}
                onDrop={(e) => { 
                  e.preventDefault(); 
                  e.currentTarget.closest('.uploader-area')?.classList.remove('drag-active'); 
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type === 'application/pdf') {
                    onProcessFile(file, leadData);
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
                    onChange={(e) => handleFileUpload(e, leadData)}
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
            )}
          </div>

          <div className="card-base">
            <h4 className="font-headline font-bold text-lg uppercase mb-2">Try a sample</h4>
            <p className="text-black/40 text-xs mb-8">Select a document type to see the engine in action.</p>
            
            <div className="space-y-3">
              {[
                { id: 'vector', name: 'Industrial MEP', meta: 'High-Density HVAC', icon: Layers, color: 'text-blue-600' },
                { id: 'image', name: 'Legacy Blueprint', meta: '1950s Ammonia Scan', icon: ImageIcon, color: 'text-blue-900' },
                { id: 'text', name: 'Assembly BOM', meta: 'Massive Data Grid', icon: FileText, color: 'text-gray-500' },
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
