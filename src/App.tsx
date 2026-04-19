import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import OurStory from "./pages/OurStory";
import FAQ from "./pages/FAQ";
import AssetCreation from "./pages/casestudies/AssetCreation";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/casestudies" element={<CaseStudies />} />
        <Route path="/casestudies/asset-creation" element={<AssetCreation />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
