import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import LoadingFallback from "./components/common/LoadingFallback";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Solutions = lazy(() => import("./pages/Solutions"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const OurStory = lazy(() => import("./pages/OurStory"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Products = lazy(() => import("./pages/products"));

// Lazy-loaded modules
const LayoutAnalyzer = lazy(() => import("./features/layout-analyzer"));
const GeometryToText = lazy(() => import("./features/geometry-to-text"));
const AssetCreation = lazy(() => import("./features/asset-creation"));
const DigitisingFarmlands = lazy(() => import("./features/digitising-farmlands"));
const ConversationalAI = lazy(() => import("./features/conversational-ai"));

const AdminLeads = lazy(() => import("./features/layout-analyzer/AdminLeads"));

// ScrollToTop component to ensure pages start at the top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/layout-analyzer" element={<LayoutAnalyzer />} />
          <Route path="/products/geometry-to-text" element={<GeometryToText />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/casestudies" element={<CaseStudies />} />
          <Route path="/casestudies/asset-creation" element={<AssetCreation />} />
          <Route path="/casestudies/digitising-farmlands" element={<DigitisingFarmlands />} />
          <Route path="/casestudies/conversational-ai" element={<ConversationalAI />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/products/layout-analyzer/admin" element={<AdminLeads />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

