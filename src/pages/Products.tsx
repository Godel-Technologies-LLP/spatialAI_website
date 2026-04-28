import { motion } from "motion/react";
import { FileText, Database, Layers, Zap, Maximize, Cpu, ArrowRight, ShieldCheck, Globe, Code } from "lucide-react";
import Layout from "../components/layout/Layout";
import { TechnicalLabel, SectionHeading } from "../components/ui/Typography";
import { SITE_CONFIG } from "../data/config";

const ProductVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Rotating Circles */}
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

      {/* Central Animation */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* PDF File Icon */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="p-6 bg-white border border-black/10 rounded-2xl shadow-xl"
        >
          <FileText className="w-12 h-12 text-black" />
          <div className="absolute -top-2 -right-2 bg-[#FF4A22] text-white text-[8px] font-bold px-2 py-1 rounded-sm tracking-widest">PDF</div>
        </motion.div>

        {/* Transition Arrows */}
        <div className="flex flex-col gap-1 items-center">
          <motion.div 
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-black to-transparent"
          />
        </div>

        {/* Structured Data Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 30px rgba(0,0,0,0.1)", "0 0 0px rgba(0,0,0,0)"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="p-6 bg-black text-white rounded-2xl shadow-2xl relative"
        >
          <Database className="w-12 h-12" />
          <div className="absolute -top-2 -right-2 bg-white text-black border border-black/10 text-[8px] font-bold px-2 py-1 rounded-sm tracking-widest">DATA</div>
          
          {/* Pulsing nodes */}
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -left-4 top-1/4 w-2 h-2 bg-black rounded-full" />
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="absolute -right-4 top-2/3 w-2 h-2 bg-black rounded-full" />
        </motion.div>
      </div>

      {/* Floating Labels */}
      <div className="absolute top-10 left-10 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Scanning Geometry...</div>
      <div className="absolute bottom-10 right-10 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Mapping Relationships...</div>
    </div>
  );
};

const Products = () => {
  const features = [
    { 
      title: "Complex PDF Processing", 
      desc: "Engineered to handle engineering drawings, technical diagrams, and heavy layout-based files with ease.",
      icon: Layers
    },
    { 
      title: "Structured Data Extraction", 
      desc: "Turns raw visual information into machine-readable JSON/Excel outputs while maintaining logic.",
      icon: Database
    },
    { 
      title: "Layout-Aware Intelligence", 
      desc: "Understands the physical relationships between elements—not just OCR, but structural comprehension.",
      icon: Maximize
    },
    { 
      title: "Fast & Scalable", 
      desc: "Optimized for high-volume processing, handling large files without performance degradation.",
      icon: Zap
    },
    { 
      title: "Easy to Integrate", 
      desc: "Connects seamlessly to your existing workflows via secure API or on-premise deployment.",
      icon: Globe
    },
    { 
      title: "Enterprise Security", 
      desc: "Built with security in mind, ensuring your sensitive technical data remains protected and private.",
      icon: ShieldCheck
    }
  ];

  const useCases = [
    { title: "Engineering PDFs", desc: "Complex blueprints, site plans, and schematic diagrams." },
    { title: "Technical Diagrams", desc: "P&IDs, flowcharts, and system architecture drawings." },
    { title: "Layout-Based PDFs", desc: "Forms, catalogs, and highly structured documents." },
    { title: "Structured Reports", desc: "Financial statements and data-heavy tables." }
  ];

  return (
    <Layout>
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 md:pt-48 px-6 md:px-12 lg:px-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <TechnicalLabel className="mb-6 opacity-40">Engine / V1.0</TechnicalLabel>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter uppercase leading-[0.9] mb-8">
                  Geometry to <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">Text Engine</span>
                </h1>
                <p className="text-xl md:text-2xl text-black/60 font-medium max-w-xl mb-12">
                  Convert complex PDFs into structured data. It understands layouts and relationships inside PDFs and turns them into usable outputs.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a href={SITE_CONFIG.calendlyLink} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-all flex items-center gap-2 group">
                    Schedule Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#features" className="border border-black/10 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all">
                    View Specifications
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <ProductVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section className="py-32 px-6 md:px-12 lg:px-32 bg-gray-50/50 mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <SectionHeading 
                  title="The Geometry Logic" 
                  subtitle="Why traditional OCR isn't enough for complex documents."
                />
              </div>
              <div className="space-y-8 text-lg md:text-xl text-black/60 leading-relaxed font-serif">
                <p>
                  Most tools treat PDFs as a stream of characters. Our Geometry to Text Engine treats them as a **physical layout**.
                </p>
                <p>
                  By analyzing the geometric relationships between lines, text blocks, and shapes, the engine recreates the logical structure of the document. This means a table remains a table, a technical label stays attached to its component, and complex diagrams become searchable, editable data.
                </p>
              </div>
            </div>

            {/* YouTube Video Embed */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-black/5 bg-black"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/APVdaQKvoyg" 
                title="Geometry to Text Engine Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6 md:px-12 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Key Features" 
              subtitle="Built for the most demanding technical documentation."
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 bg-white border border-black/5 rounded-[40px] hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tighter uppercase mb-4">{feature.title}</h3>
                  <p className="text-black/40 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-32 px-6 md:px-12 lg:px-32 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              title="Target Documents" 
              subtitle="If it has structure, we can extract it."
              light
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-all">
                  <TechnicalLabel className="mb-4 text-[#FF4A22]">Use Case 0{i+1}</TechnicalLabel>
                  <h4 className="text-2xl font-medium tracking-tighter uppercase mb-2">{useCase.title}</h4>
                  <p className="text-white/40 text-sm">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 md:px-12 lg:px-32 text-center">
          <div className="max-w-4xl mx-auto">
            <TechnicalLabel className="mb-8 opacity-40">Ready to start?</TechnicalLabel>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter uppercase leading-[0.9] mb-12">
              Turn your complex PDF <br/> into usable data
            </h2>
            <a 
              href={SITE_CONFIG.calendlyLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-black text-white px-12 py-6 rounded-full font-medium text-xl hover:scale-105 transition-transform active:scale-95"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Products;
