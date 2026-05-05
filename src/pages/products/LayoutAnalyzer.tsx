import { motion } from "motion/react";
import { Clock } from "lucide-react";
import Layout from "../../components/layout/Layout";
import { TechnicalLabel } from "../../components/ui/Typography";

const LayoutAnalyzer = () => {
  return (
    <Layout>
      <main className="bg-white min-h-screen pt-32 md:pt-48 pb-32">
        <section className="px-6 md:px-12 lg:px-32 relative max-w-5xl mx-auto mb-16 text-center">
          <TechnicalLabel className="mb-4 opacity-40">Pre-Processing Tool</TechnicalLabel>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase leading-[0.9] mb-6">
            Document Layout <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">Analyzer</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 font-medium mx-auto max-w-2xl">
            Visualize what the machine sees. Scan complex PDFs and map geometric relationships before data extraction.
          </p>
        </section>

        <section className="px-6 md:px-12 lg:px-32 max-w-7xl mx-auto">
          <div className="p-8 md:p-12 lg:p-20 border border-black/5 rounded-[40px] bg-gray-50/50 flex flex-col items-center justify-center min-h-[50vh] shadow-xl">
            <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-8 shadow-inner">
               <Clock className="w-10 h-10 text-black/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter uppercase mb-4 text-center">To Be Updated</h2>
            <p className="text-xl text-black/60 max-w-lg text-center leading-relaxed">
              We are currently finalizing the visualizer and feature set for the Layout Analyzer. Check back soon for the full interactive experience.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default LayoutAnalyzer;
