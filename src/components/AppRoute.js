import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

import AsyncScheduler from "./AsyncScheduler";
import CachedFetchDemo from "./CachedFetchDemo";
import VirtualizedList from "./VirtualizedList";
import ErrorBoundaryDemo from "./ErrorBoundaryDemo";
import MicroFrontendRouter from "./MicroFrontendRouter";
import BundleOptimizationDemo from "./BundleOptimizationDemo";
import HelmChartDemo from "./HelmChartDemo";
import RequiredKeysDemo from "./RequiredKeysDemo";
import FunctionCompositionDemo from "./FunctionCompositionDemo";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/async-scheduler" element={<AsyncScheduler />} />
        <Route path="/required-keys" element={<RequiredKeysDemo />} />
        <Route
          path="/function-composition"
          element={<FunctionCompositionDemo />}
        />
        <Route path="/cached-fetch" element={<CachedFetchDemo />} />
        <Route path="/virtualized-list" element={<VirtualizedList />} />
        <Route path="/error-boundary" element={<ErrorBoundaryDemo />} />
        <Route path="/micro-frontend" element={<MicroFrontendRouter />} />
        <Route
          path="/bundle-optimization"
          element={<BundleOptimizationDemo />}
        />
        <Route path="/helm-chart" element={<HelmChartDemo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
