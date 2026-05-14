import { useState, useEffect, useRef, useCallback } from "react";
import { SAMPLES } from "../data/mock";
import { analyzePdf } from "../lib/pdfAnalyzer";
import { supabase } from "../lib/supabase";

export const useLayoutAnalysis = () => {
  const [currentStep, setCurrentStep] = useState('product'); // product, upload, analyzing, results
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [currentKind, setCurrentKind] = useState('vector');
  const [currentPage, setCurrentPage] = useState(1);
  const [analysisPct, setAnalysisPct] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRealFile, setIsRealFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('godel.dark') === '1';
    setIsDarkMode(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('godel.dark', next ? '1' : '0');
  }, [isDarkMode]);

  const go = useCallback((step: string) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const startAnalysis = useCallback((kind: string) => {
    const sample = (SAMPLES as any)[kind] || SAMPLES.vector;

    setIsRealFile(false);
    setCurrentResult(sample);
    setCurrentKind(kind);
    setCurrentPage(1);
    setAnalysisPct(0);
    setAnalysisStatus('Parsing pages…');
    go('analyzing');

    let pct = 0;
    const stageMsgs = ['Parsing primitives…', 'Measuring geometry…', 'Normalizing scores…', 'Classifying file…'];

    const timer = setInterval(() => {
      pct = Math.min(100, pct + Math.random() * 8 + 4);
      setAnalysisPct(pct);
      const stageIdx = Math.min(3, Math.floor(pct / 26));
      setAnalysisStatus(stageMsgs[stageIdx]);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => go('results'), 380);
      }
    }, 140);
  }, [go]);

  const processFile = useCallback(async (file: File, leadData?: any) => {
    setIsRealFile(true);
    setCurrentResult(null);
    setAnalysisPct(0);
    setAnalysisStatus('Reading file…');
    go('analyzing');

    try {
      const result = await analyzePdf(file, (pct, status) => {
        setAnalysisPct(pct);
        setAnalysisStatus(status);
      });

      setAnalysisPct(100);
      setAnalysisStatus('Analysis complete');

      // Save analytics to Supabase
      if (leadData) {
        try {
          const { error } = await supabase.from('document_analytics').insert([
            {
              name: leadData.name,
              email: leadData.email,
              company: leadData.company || null,
              document_name: file.name,
              verdict: result.verdict,
              raw_metrics: result
            }
          ]);

          if (error) {
            console.error("Failed to save analytics to Supabase:", error);
          } else {
            console.log("Analytics saved successfully to Supabase for:", leadData.email);
          }
        } catch(e) {
          console.error("Failed to save analytics:", e);
        }
      }

      setTimeout(() => {
        setCurrentResult(result);
        setCurrentKind(
          result.verdict === 'good'
            ? 'vector'
            : result.composition.image > result.composition.text
              ? 'image'
              : 'text'
        );
        setCurrentPage(1);
        go('results');
      }, 400);
    } catch (err) {
      console.error('PDF analysis failed:', err);
      alert(
        err instanceof Error
          ? `Could not analyze this PDF: ${err.message}`
          : 'Could not analyze this PDF.'
      );
      go('upload');
    }
  }, [go]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, leadData?: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file, leadData);
  }, [processFile]);

  return {
    currentStep,
    currentResult,
    currentKind,
    currentPage,
    analysisPct,
    analysisStatus,
    isDarkMode,
    isRealFile,
    fileInputRef,
    toggleTheme,
    go,
    startAnalysis,
    processFile,
    handleFileUpload,
    setCurrentPage,
  };
};
