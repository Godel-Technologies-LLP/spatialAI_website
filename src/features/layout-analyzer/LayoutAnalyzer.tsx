import React from "react";
import { AnimatePresence } from "motion/react";
import { Moon, Sun, Code2 } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { CONTACT_METADATA } from "../../constants/links";
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
            />
          )}
        </AnimatePresence>



        {/* AGPL source-availability footer (per license obligations) */}
        <footer className="analyzer-license-footer">
          <div className="wrap flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-8 border-t border-black/10">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
              PDF Vetter Tool · Processed entirely in your browser
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
              <a
                href={`mailto:${CONTACT_METADATA.EMAIL}?subject=${encodeURIComponent("Source-code request — spatialAI_website (AGPL-3.0)")}&body=${encodeURIComponent("Hello,\n\nUnder the terms of the AGPL-3.0 license, I am requesting access to the complete corresponding source code for the version of spatialAI_website currently deployed.\n\nThank you.")}`}
                className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <Code2 size={11} strokeWidth={2} />
                Request source
              </a>
              <span className="opacity-30">·</span>
              <a
                href="https://www.gnu.org/licenses/agpl-3.0.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                Licensed under AGPL-3.0
              </a>
            </div>
          </div>
        </footer>

      </div>
    </Layout>
  );
};

export default LayoutAnalyzer;
