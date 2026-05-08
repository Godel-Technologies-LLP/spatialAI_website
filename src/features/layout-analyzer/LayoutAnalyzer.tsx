import React from "react";
import { AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { LAYOUT_ANALYZER_DETAILS } from "./data/details";
import { useLayoutAnalysis } from "./hooks/useLayoutAnalysis";

import ProductOverview from "./components/ProductOverview";
import UploaderArea from "./components/UploaderArea";
import StatusProgress from "./components/StatusProgress";
import AnalysisResults from "./components/AnalysisResults";

import "./styles.css";

/**
 * LayoutAnalyzer - Container Component
 * Refactored using the Container/Presenter pattern.
 * Logic is handled by the useLayoutAnalysis hook.
 * UI is broken down into modular presentational components.
 */
const LayoutAnalyzer = () => {
  const {
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
  } = useLayoutAnalysis();

  return (
    <Layout showDotGrid={false}>
      <div className={`layout-analyzer-page ${isDarkMode ? 'dark' : ''}`}>
        
        <AnimatePresence mode="wait">
          {currentStep === 'product' && (
            <ProductOverview 
              content={LAYOUT_ANALYZER_DETAILS} 
              onGo={go} 
            />
          )}

          {currentStep === 'upload' && (
            <UploaderArea 
              onGo={go}
              onStartAnalysis={startAnalysis}
              onProcessFile={processFile}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
            />
          )}

          {currentStep === 'analyzing' && (
            <StatusProgress 
              analysisPct={analysisPct}
              analysisStatus={analysisStatus}
              currentResultName={currentResult?.name}
            />
          )}

          {currentStep === 'results' && currentResult && (
            <AnalysisResults 
              currentResult={currentResult}
              currentKind={currentKind}
              currentPage={currentPage}
              isRealFile={isRealFile}
              onGo={go}
              onSetCurrentPage={setCurrentPage}
              apiBase={API_BASE}
            />
          )}
        </AnimatePresence>

        {/* Theme Toggle Floating Button */}
        <button 
          className="theme-btn" 
          style={{position:'fixed', bottom: 32, right: 32, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

      </div>
    </Layout>
  );
};

export default LayoutAnalyzer;
