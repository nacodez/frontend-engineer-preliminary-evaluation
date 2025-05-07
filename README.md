# Frontend Engineer Assessment

This project contains my completed tasks for the frontend engineer assessment. I've implemented various exercises to demonstrate skills in JavaScript, React, and infrastructure configuration.

## Project Overview

This is a React application built with:

- React 18.3.1
- React Router 6.27.0
- Tailwind CSS 3.4.14

## Assessment Tasks Implemented

### 1. JavaScript & TypeScript Mastery

#### 1.1 Async Programming & Event Loop

- Implemented a `schedule(fn, delay)` function that respects rate limiting
- Handles rolling window for execution limits
- Uses closures and Promises

### 3. React-Focused Exercises

#### 3.1 Custom Hooks & useMemo/useCallback

- Created a `useFetchWithCache` hook that caches API responses
- Optimized with useCallback and useMemo to avoid unnecessary re-renders
- Implemented cache management helpers

#### 3.2 Performance Optimization & Virtualized Lists

- Built a virtualized list component rendering 10,000 items efficiently
- Used React.memo to prevent unnecessary re-renders
- Added performance metrics for comparison

#### 3.3 Higher-Order Components (HOC)

- Implemented a `withErrorBoundary` HOC for error catching
- Added fallback UI with retry mechanism
- Supports custom error handlers and fallback components

### 4. End-to-End Frontend Integration

#### 4.1 Micro-Frontend Router Strategy

- Created a shell application that loads micro-frontends
- Implemented dynamic loading via React.lazy and Suspense
- Route-based micro-frontend loading

#### 4.2 Bundle Optimization & SSR Hydration

- Implemented code splitting using dynamic imports
- Demonstrated SSR hydration with client-side attachment
- Added loading metrics and performance visualization

### 5. Helm & CI Integration

#### 5.1 Helm Chart for SPA

- Created a Helm chart for deploying frontend SPAs
- Included conditional service, ingress resources via values.yaml
- Used named templates for DRY implementation

#### 5.2 Helm Hooks for Frontend Cache Busting

- Added post-upgrade hook for CDN cache purging
- Implemented providers for Cloudflare and AWS CloudFront
- Configured hook weights and delete policies

## Project Structure

```
project-root/
├── helm/                     # Helm charts for deployment
│   └── frontend-spa/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── _helpers.tpl
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── ingress.yaml
│           ├── configmap.yaml
│           └── cache-busting-hook.yaml
│
├── src/
│   ├── components/          # Main components for each task
│   │   ├── AsyncScheduler.js
│   │   ├── CachedFetchDemo.js
│   │   ├── VirtualizedList.js
│   │   ├── ErrorBoundaryDemo.js
│   │   ├── MicroFrontendRouter.js
│   │   ├── BundleOptimizationDemo.js
│   │   └── HelmChartDemo.js
│   │
│   ├── hooks/               # Custom hooks implementations
│   │   └── useFetchWithCache.js
│   │
│   ├── hoc/                 # Higher-Order Components
│   │   └── withErrorBoundary.js
│   │
│   └── utils/               # Utility functions
│
└── public/                  # Static files
```

## Getting Started

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

The application will be available at http://localhost:3000

## Navigation

The home page provides navigation to all implemented tasks. Each task demonstrates a different aspect of frontend development:

- **Rate Limiter**: Shows async programming and event loop handling
- **Cached Fetch Hook**: Demonstrates custom hooks with memoization
- **Virtualized List**: Shows performance optimization techniques
- **Error Boundary HOC**: Demonstrates higher-order component patterns
- **Micro-Frontend Router**: Shows frontend architecture for micro-frontends
- **Bundle Optimization**: Demonstrates code splitting and lazy loading
- **Helm Chart**: Shows deployment configuration for SPAs

## Notes

- The Helm charts are located at the project root level in the `helm` directory
- All components include detailed explanations of how they work
- Performance metrics are included where relevant
