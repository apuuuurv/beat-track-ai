import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Layout from "@/components/layout/Layout";

import Dashboard from "./pages/Dashboard";

import Prediction from "./pages/Prediction";

import ClinicalResources from "./pages/ClinicalResources";

import Preloader from "./components/Preloader"; // Make sure to create this file!

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. The Preloader handles its own exit animation */}

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. The main app only renders once loading is done */}

      {!isLoading && (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/prediction" element={<Prediction />} />

              <Route path="/resources" element={<ClinicalResources />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
