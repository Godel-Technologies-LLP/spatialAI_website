import { Layers, Database, Maximize, Zap, Globe, ShieldCheck } from "lucide-react";

export const GEOM_TO_TEXT_DETAILS = {
  id: "geom-to-text",
  name: "Geometry to Text Engine",
  label: "Core Enterprise Engine",
  headline: "GEOMETRY TO <br/> <em>TEXT ENGINE</em>",
  subheadline: "Once you've analyzed the layout, our engine converts those complex PDFs into perfectly structured, machine-readable JSON or Excel outputs.",
  cta_primary: "Schedule Demo",
  cta_secondary: "View API Docs",
  features: [
    { title: "Complex PDF Processing", desc: "Engineered to handle engineering drawings, technical diagrams, and heavy layout-based files with ease.", icon: Layers },
    { title: "Structured Data Extraction", desc: "Turns raw visual information into machine-readable JSON/Excel outputs while maintaining logic.", icon: Database },
    { title: "Layout-Aware Intelligence", desc: "Understands the physical relationships between elements—not just OCR, but structural comprehension.", icon: Maximize },
    { title: "Fast & Scalable", desc: "Optimized for high-volume processing, handling large files without performance degradation.", icon: Zap },
    { title: "Easy to Integrate", desc: "Connects seamlessly to your existing workflows via secure API or on-premise deployment.", icon: Globe },
    { title: "Enterprise Security", desc: "Built with security in mind, ensuring your sensitive technical data remains protected and private.", icon: ShieldCheck }
  ]
};
