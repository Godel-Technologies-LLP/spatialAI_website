import { motion } from "motion/react";
import { FileText, Database, ArrowRight } from "lucide-react";
import Layout from "../../components/layout/Layout";
import { TechnicalLabel, SectionHeading } from "../../components/common/Typography";
import { SITE_CONFIG } from "../../data/config";
import { GEOM_TO_TEXT_DETAILS } from "./data/details";

const ProductVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-md lg:max-w-xl mx-auto flex items-center justify-center">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-3/4 h-3/4 border border-black/5 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-1/2 h-1/2 border border-black/10 rounded-full"
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="p-6 bg-white border border-black/10 rounded-2xl shadow-xl"
        >
          <FileText className="w-12 h-12 text-black" />
          <div className="absolute -top-2 -right-2 bg-[#FF4A22] text-white text-[8px] font-bold px-2 py-1 rounded-sm tracking-widest">PDF</div>
        </motion.div>

        <div className="flex flex-col gap-1 items-center">
          <motion.div 
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-black to-transparent"
          />
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 30px rgba(0,0,0,0.1)", "0 0 0px rgba(0,0,0,0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="p-6 bg-black text-white rounded-2xl shadow-2xl relative"
        >
          <Database className="w-12 h-12" />
          <div className="absolute -top-2 -right-2 bg-white text-black border border-black/10 text-[8px] font-bold px-2 py-1 rounded-sm tracking-widest">DATA</div>
          
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -left-4 top-1/4 w-2 h-2 bg-black rounded-full" />
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="absolute -right-4 top-2/3 w-2 h-2 bg-black rounded-full" />
        </motion.div>
      </div>

      <div className="absolute top-10 left-10 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Extracting Logic...</div>
      <div className="absolute bottom-10 right-10 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Structured Output...</div>
    </div>
  );
};

const GeometryToText = () => {
  const content = GEOM_TO_TEXT_DETAILS;

  return (
    <Layout>
      <main className="bg-white min-h-screen pt-32 md:pt-48 pb-32">
        
        {/* Engine Hero Details */}
        <section className="px-6 md:px-12 lg:px-32 max-w-7xl mx-auto mb-20">
          <div className="grid xl:grid-cols-2 gap-16 items-center">
            <div>
              <TechnicalLabel className="mb-4 opacity-40">{content.label}</TechnicalLabel>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase leading-[0.9] mb-6" dangerouslySetInnerHTML={{ __html: content.headline }} />
              <p className="text-xl text-black/60 font-medium mb-8 leading-relaxed">
                {content.subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={SITE_CONFIG.calendlyLink} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-all flex items-center gap-2 group shadow-xl shadow-black/10">
                  {content.cta_primary} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <ProductVisual />
          </div>
        </section>

        {/* Geometry Logic and Video */}
        <section className="py-24 px-6 md:px-12 bg-black text-white rounded-[40px] mx-4 md:mx-12 lg:mx-32 relative overflow-hidden shadow-2xl mb-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <SectionHeading title="The Geometry Logic" subtitle="Why traditional OCR isn't enough for complex documents." light />
              </div>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed font-serif">
                <p>Most tools treat PDFs as a stream of characters. Our Geometry to Text Engine treats them as a **physical layout**.</p>
                <p>By analyzing the geometric relationships between lines, text blocks, and shapes, the engine recreates the logical structure of the document. This means a table remains a table, a technical label stays attached to its component, and complex diagrams become searchable, editable data.</p>
              </div>
            </div>
            <div className="mt-16 relative aspect-video rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/APVdaQKvoyg" title="Geometry to Text Engine Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0"></iframe>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 md:px-12 lg:px-32 max-w-7xl mx-auto">
          <SectionHeading title="Key Features" subtitle="Built for the most demanding technical documentation." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature, i) => (
              <div key={i} className="p-8 bg-white border border-black/5 rounded-[32px] hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium tracking-tighter uppercase mb-3">{feature.title}</h3>
                <p className="text-black/50 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default GeometryToText;
