import { motion } from "motion/react";
import { 
  Layers, 
  Cpu, 
  Activity, 
  Box
} from "lucide-react";
import Header from "../components/Header";
import logo from "../assets/logo.png";


const OurStory = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white font-body text-black overflow-x-hidden">
      <Header />
      <main className="pt-32 md:pt-48 pb-24">
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-7xl font-medium tracking-tighter mb-8 uppercase tracking-tighter-extra">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-medium text-balance">
                Godel Technologies was architected to solve the spatial execution gap, synthesizing a decade of aerospace-grade engineering into a Technical Co-Founding Engine that translates complex geometry into scalable industrial value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square rounded-[40px] overflow-hidden grayscale border border-gray-100 shadow-2xl"
            >
              <img 
                alt="Godel Engineering Blueprint" 
                className="w-full h-full object-cover opacity-80" 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=2000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>

          {/* Bottom Brand Bar */}
          <div className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] font-label tracking-widest text-black/20 font-semibold uppercase">
            <div className="flex items-center gap-3 group bg-white px-3 py-1.5 rounded-xl transition-all border border-gray-100/50 shadow-sm">
              <img src={logo} alt="Godel Technologies Logo" className="w-6 h-6 object-contain" />
              <span className="text-[10px] font-medium tracking-tight text-black whitespace-nowrap">Godel Technologies</span>
              <div className="ml-2">© 2024 ALL RIGHTS RESERVED.</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer className="px-6 md:px-12 py-12 border-t border-gray-100 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3 bg-white p-2 rounded-xl">
        <img src={logo} alt="Godel Technologies Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-medium tracking-tighter text-black whitespace-nowrap">Godel Technologies</span>
      </div>
      <div className="flex gap-8 text-sm font-medium text-black/40">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        <a href="mailto:info@godeltech.in" className="hover:text-black transition-colors">info@godeltech.in</a>
      </div>
      <p className="text-sm font-medium text-black/20">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  </footer>
);

export default OurStory;
