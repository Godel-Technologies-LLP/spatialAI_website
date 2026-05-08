import { useState, useEffect, useRef, useCallback } from "react";
import { SAMPLES } from "../data/mock";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

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

  // Initial theme check
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

  const processFile = useCallback(async (file: File) => {
    setIsRealFile(true);
    setCurrentResult(null);
    setAnalysisPct(0);
    setAnalysisStatus('Uploading to engine…');
    go('analyzing');

    const formData = new FormData();
    formData.append('file', file);

    let pct = 0;
    const stageMsgs = ['Uploading to engine…', 'Parsing primitives…', 'Measuring geometry…', 'Normalizing scores…', 'Classifying file…'];
    const progressTimer = setInterval(() => {
      pct = Math.min(90, pct + Math.random() * 6 + 2);
      setAnalysisPct(pct);
      const stageIdx = Math.min(4, Math.floor(pct / 20));
      setAnalysisStatus(stageMsgs[stageIdx]);
    }, 200);

    try {
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressTimer);

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      
      setAnalysisPct(100);
      setAnalysisStatus('Analysis complete');

      setTimeout(() => {
        setCurrentResult(result);
        setCurrentKind(result.verdict === 'good' ? 'vector' : (result.composition.image > result.composition.text ? 'image' : 'text'));
        setCurrentPage(1);
        go('results');
      }, 500);

    } catch (err) {
      clearInterval(progressTimer);
      alert('Error connecting to analysis engine. Please try again in a moment.');
      go('upload');
    }
  }, [go]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
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
    API_BASE
  };
};
