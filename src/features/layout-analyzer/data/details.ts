import { Layers, Database, Maximize } from "lucide-react";

export const LAYOUT_ANALYZER_DETAILS = {
  id: "layout-analyzer",
  name: "Document Layout Analyzer",
  label: "Pre-Processing Tool",
  headline: "Know if a PDF is <em>worth vectorizing</em> before you spend a cycle.",
  subheadline: "Our structural analysis engine classifies documents based on vector density, raster fragmentation, and semantic layers—giving you the 'go/no-go' signal for your geometry pipeline.",
  cta_primary: "Analyze your document",
  cta_secondary: "Read Whitepaper",
  features: [
    { title: "Complex PDF Processing", desc: "Engineered to handle engineering drawings, technical diagrams, and heavy layout-based files with ease.", icon: Layers },
    { title: "Structural Analysis", desc: "Determines if a document is suitable for geometric vectorization based on primitive density.", icon: Database },
    { title: "Layout-Aware Intelligence", desc: "Understands the physical relationships between elements—not just OCR, but structural comprehension.", icon: Maximize }
  ],
  howItWorks: {
    title: "How it works",
    label: "Proprietary Pipeline",
    steps: [
      { "n": "01", "title": "Ingest", "desc": "Multi-threaded stream processing of PDF primitives." },
      { "n": "02", "title": "Measure", "desc": "Quantifying line types, hatches and curves." },
      { "n": "03", "title": "Normalize", "desc": "Density assessment against relative page area." },
      { "n": "04", "title": "Classify", "desc": "Heuristic-based suitability determination." }
    ]
  },
  technicalSpecs: {
    title: "Technical Specs",
    desc: "Built for high-fidelity geometric extraction at scale.",
    items: [
      { "label": "Resolution", "title": "Sub-pixel Precision", "desc": "Coordinates tracked to 1/100th of a point." },
      { "label": "Engine", "title": "PyMuPDF Core", "desc": "High-performance C++ backend for lightning analysis." },
      { "label": "Scale", "title": "Unlimited Pages", "desc": "Stream-processing handles documents of any size." }
    ]
  }
};
