import React, { useState, lazy, Suspense } from "react";
import TileComponent from "../core/TileComponent";

// Demonstrate lazy loaded components
const LazyExpensiveChart = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => (
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="text-md font-medium mb-3">
                Expensive Chart Component
              </h3>
              <div className="h-48 bg-white rounded p-3">
                <div className="h-full flex items-end space-x-1">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-blue-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {`Bundle size: ~120KB (simulated)`}
              </div>
            </div>
          ),
        });
      }, 1500);
    })
);

const LazyUserProfile = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => (
            <div className="p-4 bg-green-50 rounded">
              <h3 className="text-md font-medium mb-3">
                User Profile Component
              </h3>
              <div className="bg-white rounded p-4">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500">Premium User</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Member since:</span>
                    <span>March 2022</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last login:</span>
                    <span>Today at 9:41 AM</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {`Bundle size: ~80KB (simulated)`}
              </div>
            </div>
          ),
        });
      }, 1000);
    })
);

const LazySettings = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => (
            <div className="p-4 bg-purple-50 rounded">
              <h3 className="text-md font-medium mb-3">Settings Component</h3>
              <div className="bg-white rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <div className="w-12 h-6 bg-purple-200 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notifications</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto-save</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {`Bundle size: ~60KB (simulated)`}
              </div>
            </div>
          ),
        });
      }, 800);
    })
);

const ssrContent = `
<div class="p-4 bg-yellow-50 rounded">
  <h3 class="text-md font-medium mb-3">SSR Content (Pre-rendered)</h3>
  <div class="bg-white rounded p-4">
    <p class="mb-2">This content was rendered on the server for faster initial load.</p>
    <div class="flex justify-between mb-3">
      <div class="w-32 h-8 bg-gray-200 rounded"></div>
      <div class="w-24 h-8 bg-gray-200 rounded"></div>
    </div>
    <div class="h-16 bg-gray-200 rounded mb-3"></div>
    <div class="flex space-x-2">
      <div class="flex-1 h-6 bg-gray-200 rounded"></div>
      <div class="flex-1 h-6 bg-gray-200 rounded"></div>
      <div class="flex-1 h-6 bg-gray-200 rounded"></div>
    </div>
  </div>
</div>
`;

function BundleOptimizationDemo() {
  const [activeTab, setActiveTab] = useState("ssr");
  const [loadedComponents, setLoadedComponents] = useState(["ssr"]);
  const [networkInfo, setNetworkInfo] = useState({
    initialLoad: {
      time: "~120ms",
      size: "~20KB",
    },
    totalLoaded: {
      components: 1,
      size: "~20KB",
    },
  });

  const loadComponent = (component) => {
    if (!loadedComponents.includes(component)) {
      setLoadedComponents((prev) => [...prev, component]);

      setNetworkInfo((prev) => {
        const newInfo = { ...prev };

        // Simulated bundle sizes
        const sizes = {
          chart: "120KB",
          profile: "80KB",
          settings: "60KB",
        };

        newInfo.totalLoaded.components += 1;
        newInfo.totalLoaded.size = `~${
          parseInt(prev.totalLoaded.size.replace(/[^0-9]/g, "")) +
          parseInt(sizes[component].replace(/[^0-9]/g, ""))
        }KB`;

        return newInfo;
      });
    }

    setActiveTab(component);
  };

  const LoadingFallback = () => (
    <div className="py-12 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
      <p className="mt-2 text-gray-600">Loading component...</p>
    </div>
  );

  return (
    <TileComponent>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Bundle Optimization & SSR Hydration
        </h2>

        <div className="mb-6 bg-blue-50 rounded-lg p-3 flex flex-wrap justify-between">
          <div>
            <span className="text-sm text-gray-500">Initial Load (SSR):</span>
            <div className="font-medium">
              {networkInfo.initialLoad.time} / {networkInfo.initialLoad.size}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Components Loaded:</span>
            <div className="font-medium">
              {networkInfo.totalLoaded.components} / 4
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Total JS Loaded:</span>
            <div className="font-medium">{networkInfo.totalLoaded.size}</div>
          </div>
        </div>

        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("ssr")}
            className={`py-2 px-4 ${
              activeTab === "ssr"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            SSR Content
          </button>

          <button
            onClick={() => loadComponent("chart")}
            className={`py-2 px-4 ${
              activeTab === "chart"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Chart
          </button>

          <button
            onClick={() => loadComponent("profile")}
            className={`py-2 px-4 ${
              activeTab === "profile"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            User Profile
          </button>

          <button
            onClick={() => loadComponent("settings")}
            className={`py-2 px-4 ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
          </button>
        </div>

        <div className="border rounded-lg p-4 min-h-[300px]">
          {activeTab === "ssr" && (
            <div dangerouslySetInnerHTML={{ __html: ssrContent }} />
          )}

          {activeTab === "chart" && (
            <Suspense fallback={<LoadingFallback />}>
              <LazyExpensiveChart />
            </Suspense>
          )}

          {activeTab === "profile" && (
            <Suspense fallback={<LoadingFallback />}>
              <LazyUserProfile />
            </Suspense>
          )}

          {activeTab === "settings" && (
            <Suspense fallback={<LoadingFallback />}>
              <LazySettings />
            </Suspense>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
          <h3 className="font-semibold mb-2">
            Optimization Techniques Demonstrated:
          </h3>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-blue-700">
                1. Server-Side Rendering (SSR)
              </h4>
              <p className="ml-4 text-gray-600">
                Initial HTML is pre-rendered on the server for faster First
                Contentful Paint
              </p>
            </div>

            <div>
              <h4 className="font-medium text-blue-700">2. Code Splitting</h4>
              <p className="ml-4 text-gray-600">
                Components are split into separate chunks and loaded on demand
              </p>
            </div>

            <div>
              <h4 className="font-medium text-blue-700">3. Lazy Loading</h4>
              <p className="ml-4 text-gray-600">
                React.lazy and Suspense are used to load components only when
                needed
              </p>
            </div>

            <div>
              <h4 className="font-medium text-blue-700">
                4. Progressive Hydration
              </h4>
              <p className="ml-4 text-gray-600">
                Client-side JavaScript attaches to server-rendered HTML
                progressively
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded">
            <p className="text-gray-600">
              In a real app, these optimizations would be implemented using
              tools like Next.js, React Router, dynamic imports, and Webpack
              configuration. This demo simulates these concepts in a simplified
              way.
            </p>
          </div>
        </div>
      </div>
    </TileComponent>
  );
}

export default BundleOptimizationDemo;
