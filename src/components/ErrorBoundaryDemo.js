import React, { useState } from "react";
import TileComponent from "../core/TileComponent";
import withErrorBoundary from "../hoc/withErrorBoundary";

const BuggyCounter = ({ throwError }) => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((count) => count + 1);
  };

  if (throwError && counter >= 5) {
    throw new Error("Counter exceeded 5!");
  }

  return (
    <div className="text-center py-3">
      <p className="mb-2">Counter: {counter}</p>
      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};

const CustomFallback = ({ error, resetError }) => {
  return (
    <div className="p-4 bg-purple-100 border border-purple-300 rounded-md text-center">
      <span className="text-5xl mb-2">💥</span>
      <h3 className="text-lg font-medium text-purple-800 mb-2">
        Oops! We crashed
      </h3>
      <p className="text-purple-700 mb-4">Error: {error.message}</p>
      <button
        onClick={resetError}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Reset Counter
      </button>
    </div>
  );
};

const SafeCounter = withErrorBoundary(BuggyCounter);

const CustomSafeCounter = withErrorBoundary(BuggyCounter, {
  FallbackComponent: CustomFallback,
  onError: (error, info) => {
    console.log("Error logged:", error.message);
    console.log("Component stack:", info?.componentStack);
  },
});

function ErrorBoundaryDemo() {
  return (
    <TileComponent>
      <h2 className="text-lg font-semibold mb-6 text-center">
        Error Boundary HOC Demo
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3 text-center">
            Default Error Boundary
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Increment until 5 to trigger an error
          </p>
          <SafeCounter throwError={true} />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3 text-center">
            Custom Error Boundary
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Increment until 5 to trigger an error with custom fallback
          </p>
          <CustomSafeCounter throwError={true} />
        </div>
      </div>

      <div className="mt-6 border rounded-lg p-4">
        <h3 className="font-medium text-lg mb-3">Regular Counter (No Error)</h3>
        <p className="text-sm text-gray-600 mb-4">
          This counter won't throw errors
        </p>
        <BuggyCounter throwError={false} />
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-sm">
        <h3 className="font-semibold mb-2">How Error Boundaries Work:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Error boundaries catch JavaScript errors in their child components
          </li>
          <li>
            They prevent the whole app from crashing when a component fails
          </li>
          <li>
            The <code>withErrorBoundary</code> HOC wraps any component with this
            functionality
          </li>
          <li>You can provide custom fallback UI and error handlers</li>
          <li>Click "Try Again" to reset the component after an error</li>
        </ul>
      </div>
    </TileComponent>
  );
}

export default ErrorBoundaryDemo;
