import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import BentoVisual from "../../BentoVisual";
import { HOME_METRICS, HOME_EXPERTISE } from "../../../data/home";
import { SectionHeading } from "../../common/Typography";

export const Metrics = () => {
  return (
    <section id="metrics" className="px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-white rounded-[40px] p-8 md:p-20 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {HOME_METRICS.map((m, i) => (
            <motion.div 
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="text-4xl md:text-6xl font-medium tracking-tighter">{m.value}</span>
              <span className="text-xs md:text-sm font-semibold text-white/40 uppercase tracking-widest">{m.label}</span>
              <span className="text-[10px] text-white/40 font-medium leading-tight">{m.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Expertise = () => {
  return (
    <section id="expertise" className="px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Our Expertise" 
          subtitle="Specialized GIS, Point Cloud, and CAD engines for Architecture, Agritech, and Manufacturing." 
        />

        <div className="grid md:grid-cols-3 gap-8">
          {HOME_EXPERTISE.map((s, i) => {
            const Icon = LucideIcons[s.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div 
                key={s.title}
                whileHover={{ y: -10 }}
                className="bento-card flex flex-col justify-between min-h-[450px]"
              >
                <div>
                  <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-8">
                    {Icon && <Icon className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-medium mb-4 leading-tight">{s.title}</h3>
                  <p className="text-black/60 leading-relaxed mb-8">{s.desc}</p>
                </div>
                <div className="relative h-48 overflow-hidden rounded-2xl bg-black/5 flex items-center justify-center">
                  <BentoVisual type={s.visualType as any} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
