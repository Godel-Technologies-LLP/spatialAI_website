import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CASE_STUDIES_DATA } from '../data/caseStudies';

const CaseStudies = () => {
  const CardContent = ({ c }: { c: any }) => (
    <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden mb-6 md:mb-8 bg-white border border-black/10 group hover:shadow-xl transition-all duration-500">
      {c.visual}
      <div className="absolute inset-x-0 bottom-0 p-6 pt-16 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col justify-end min-h-[70%] z-20 pointer-events-none">
        <h3 className="text-lg md:text-xl font-headline font-normal text-black/80 tracking-tighter leading-tight mb-0 line-clamp-2">
          {c.title}
        </h3>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="pt-24 min-h-screen bg-white">
        <main className="w-full max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Section */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8"
          >
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-headline font-normal text-black/80 tracking-tighter leading-[0.9]">
                Our Case Studies
              </h1>
              <p className="text-base md:text-lg text-black/40 mt-6 font-normal max-w-xl">
                Explore how we apply Spatial AI to solve complex technical challenges and automate high-precision industrial workflows.
              </p>
            </div>
          </motion.header>

          {/* Case Studies Grid */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-24"
          >
            {CASE_STUDIES_DATA.map((c, i) => (
              c.isInternal ? (
                <Link 
                  key={i} 
                  to={c.link} 
                  className="group cursor-pointer block"
                >
                  <CardContent c={c} />
                </Link>
              ) : (
                <a 
                  key={i}
                  href={c.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group cursor-pointer block"
                >
                  <CardContent c={c} />
                </a>
              )
            ))}
          </motion.section>

        </main>
      </div>
    </Layout>
  );
};

export default CaseStudies;
