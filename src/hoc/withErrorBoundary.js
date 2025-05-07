import React, { Component } from "react";

function withErrorBoundary(WrappedComponent, options = {}) {
  const DefaultFallback = ({ error, resetError }) => (
    <div className="p-4 bg-red-50 border border-red-300 rounded-md">
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-red-700 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={resetError}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const FallbackComponent = options.FallbackComponent || DefaultFallback;

  class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
      };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    // Log error details when they occur
    componentDidCatch(error, errorInfo) {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);

      this.setState({
        errorInfo,
      });

      if (typeof options.onError === "function") {
        options.onError(error, errorInfo);
      }
    }

    // Reset error state to recover
    resetErrorBoundary = () => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    };

    render() {
      const { hasError, error } = this.state;

      if (hasError) {
        return (
          <FallbackComponent
            error={error}
            resetError={this.resetErrorBoundary}
            {...this.props}
          />
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  ErrorBoundary.displayName = `withErrorBoundary(${wrappedName})`;

  return ErrorBoundary;
}

export default withErrorBoundary;
