export const SOLUTIONS_FILTERS = {
  skills: [
    "Computer Vision",
    "Dashboard Visualization",
    "Generative and Agentic AI",
    "Performance Monitoring",
    "Predictive Maintenance",
    "Predictive Modeling",
    "Process Analytics",
    "Process Modelling & Optimization"
  ],
  verticals: [
    "Automotive",
    "Energy",
    "Finance",
    "Healthcare",
    "Logistics",
    "Oil & Gas",
    "Others",
    "Process Industries",
    "Retail"
  ],
  applications: [
    "AI/ML",
    "AIP",
    "ANN",
    "AlgorithmDesign",
    "Automotive",
    "AutomotiveTech",
    "BipartiteMatching",
    "BlackBoxModeling"
  ]
};

export interface SolutionProject {
  id: string;
  title: string;
  description: string;
  skills: string[];
  verticals: string[];
  applications: string[];
  tag: string;
}

export const SOLUTIONS_DATA: SolutionProject[] = [];
// Add new solutions here. Each entry will automatically appear as a card on the Industrial Solutions page.
