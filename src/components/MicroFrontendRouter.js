import React, { useState, useEffect, lazy, Suspense } from "react";
import TileComponent from "../core/TileComponent";

const microFrontends = {
  app1: {
    name: "User Dashboard",
    path: "/user-dashboard",
    component: lazy(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              default: () => (
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    User Dashboard Micro-Frontend
                  </h3>
                  <p className="mb-3">
                    This is the user dashboard app showing user stats and
                    activity.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-sm text-gray-500">Active Users</div>
                      <div className="text-xl font-medium">1,234</div>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-sm text-gray-500">New Sign-ups</div>
                      <div className="text-xl font-medium">56</div>
                    </div>
                  </div>
                </div>
              ),
            });
          }, 800);
        })
    ),
  },
  app2: {
    name: "Product Catalog",
    path: "/products",
    component: lazy(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              default: () => (
                <div className="p-4 bg-green-50 rounded-md">
                  <h3 className="text-lg font-medium text-green-800 mb-2">
                    Product Catalog Micro-Frontend
                  </h3>
                  <p className="mb-3">Browse our catalog of products below.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((id) => (
                      <div key={id} className="bg-white p-3 rounded shadow-sm">
                        <div className="w-full h-20 bg-gray-200 mb-2 rounded flex items-center justify-center text-gray-400">
                          Product Image
                        </div>
                        <div className="font-medium">Product {id}</div>
                        <div className="text-sm text-gray-500">$19.99</div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            });
          }, 1200);
        })
    ),
  },
  app3: {
    name: "Analytics",
    path: "/analytics",
    component: lazy(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              default: () => (
                <div className="p-4 bg-purple-50 rounded-md">
                  <h3 className="text-lg font-medium text-purple-800 mb-2">
                    Analytics Micro-Frontend
                  </h3>
                  <p className="mb-3">
                    View your site analytics and performance metrics.
                  </p>
                  <div className="bg-white p-3 rounded shadow-sm mb-3">
                    <div className="text-sm text-gray-500 mb-1">
                      Page Views (Last 7 Days)
                    </div>
                    <div className="h-32 flex items-end space-x-2">
                      {[35, 58, 42, 65, 78, 52, 44].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-purple-400 rounded-t"
                          style={{ height: `${val}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                      <div>Sun</div>
                    </div>
                  </div>
                </div>
              ),
            });
          }, 1500);
        })
    ),
  },
};

function MicroFrontendRouter() {
  const [currentApp, setCurrentApp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const [error, setError] = useState(null);

  const loadApp = (appId) => {
    if (!microFrontends[appId]) {
      setError(`App '${appId}' not found!`);
      setCurrentApp(null);
      return;
    }

    setError(null);
    setIsLoading(true);

    // Track loading time
    const startTime = performance.now();

    setCurrentApp(appId);

    setTimeout(() => {
      setIsLoading(false);
      setLoadTime(performance.now() - startTime);
    }, 100);
  };

  const LoadingFallback = () => (
    <div className="p-16 text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading micro-frontend...</p>
    </div>
  );

  const NoAppSelected = () => (
    <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <svg
        className="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        No Micro-Frontend Selected
      </h3>
      <p className="text-gray-500 mb-4">
        Select an app from the navigation menu to load it.
      </p>
    </div>
  );

  return (
    <TileComponent>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Micro-Frontend Router Strategy
        </h2>

        <div className="flex bg-gray-100 mb-6 rounded overflow-hidden">
          {Object.entries(microFrontends).map(([id, app]) => (
            <button
              key={id}
              onClick={() => loadApp(id)}
              className={`flex-1 py-3 px-4 text-center ${
                currentApp === id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>

        {currentApp && (
          <div className="flex justify-between items-center mb-4 px-3 py-2 bg-blue-50 rounded text-sm">
            <div>
              <span className="font-medium">Current App:</span>{" "}
              {microFrontends[currentApp]?.name}
            </div>
            <div>
              <span className="font-medium">Route:</span>{" "}
              {microFrontends[currentApp]?.path}
            </div>
            {loadTime > 0 && (
              <div>
                <span className="font-medium">Load Time:</span>{" "}
                {loadTime.toFixed(0)}ms
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="border rounded-lg p-0 overflow-hidden bg-white min-h-[300px]">
          {currentApp ? (
            <Suspense fallback={<LoadingFallback />}>
              {isLoading ? (
                <LoadingFallback />
              ) : (
                React.createElement(microFrontends[currentApp].component)
              )}
            </Suspense>
          ) : (
            <NoAppSelected />
          )}
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
          <h3 className="font-semibold mb-2">How This Works:</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Shell Application</span> - Hosts the
              router and loads micro-frontends
            </li>
            <li>
              <span className="font-medium">Dynamic Loading</span> - Uses
              React.lazy and Suspense for code-splitting
            </li>
            <li>
              <span className="font-medium">Route-Based Loading</span> - Each
              micro-frontend has its own route
            </li>
            <li>
              <span className="font-medium">Isolated Apps</span> - Each
              micro-frontend is developed and deployed independently
            </li>
          </ul>

          <div className="mt-4 p-3 bg-white rounded">
            <p className="font-medium mb-1">In a real implementation:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Remote entries would be loaded from separate deployments</li>
              <li>
                Webpack Module Federation would handle shared dependencies
              </li>
              <li>Each team would own and deploy their own micro-frontend</li>
              <li>Service discovery would help locate the latest versions</li>
            </ul>
          </div>
        </div>
      </div>
    </TileComponent>
  );
}

export default MicroFrontendRouter;
