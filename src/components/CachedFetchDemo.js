import React, { useState } from "react";
import TileComponent from "../core/TileComponent";
import useFetchWithCache from "../hooks/useFetchWithCache";

function CachedFetchDemo() {
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  const [inputUrl, setInputUrl] = useState(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  const [fetchCount, setFetchCount] = useState(0);
  const [cacheHitCount, setCacheHitCount] = useState(0);

  const { data, loading, error, refetch, cached } = useFetchWithCache(url);

  React.useEffect(() => {
    if (loading) return;

    if (cached) {
      setCacheHitCount((count) => count + 1);
    } else {
      setFetchCount((count) => count + 1);
    }
  }, [loading, cached]);

  const handleUrlChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleFetch = () => {
    setUrl(inputUrl);
  };

  const handleRefetch = () => {
    refetch();
  };

  const clearUrlFromCache = () => {
    useFetchWithCache.removeFromCache(url);
    alert(`Cleared ${url} from cache`);
  };

  const clearAllCache = () => {
    useFetchWithCache.clearCache();
    alert("Cleared entire cache");
  };

  return (
    <TileComponent>
      <h2 className="text-lg font-semibold mb-4 text-center">
        Cached Fetch Demo
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">API URL:</label>
        <div className="flex">
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            className="flex-1 p-2 border rounded-l"
            placeholder="Enter API URL"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Fetch
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Try: https://jsonplaceholder.typicode.com/todos/1, /todos/2, /users/1
        </p>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleRefetch}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm"
        >
          Force Refetch
        </button>
        <button
          onClick={clearUrlFromCache}
          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm"
        >
          Clear URL from Cache
        </button>
        <button
          onClick={clearAllCache}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Clear All Cache
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
        <div>
          <span className="font-medium">Status:</span>{" "}
          {loading ? (
            <span className="text-blue-500">Loading...</span>
          ) : error ? (
            <span className="text-red-500">Error</span>
          ) : (
            <span className="text-green-500">Success</span>
          )}
        </div>
        <div>
          <span className="text-blue-600 font-medium">
            {cached ? "From Cache ✓" : "Fresh Fetch ↓"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div className="bg-gray-100 p-2 rounded">
          <div className="text-xs text-gray-500">Current URL</div>
          <div className="font-medium truncate">{url}</div>
        </div>
        <div className="bg-blue-100 p-2 rounded">
          <div className="text-xs text-gray-500">Network Fetches</div>
          <div className="font-medium">{fetchCount}</div>
        </div>
        <div className="bg-green-100 p-2 rounded">
          <div className="text-xs text-gray-500">Cache Hits</div>
          <div className="font-medium">{cacheHitCount}</div>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-md font-semibold mb-2">Response Data:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <pre className="bg-gray-800 text-white p-3 rounded overflow-auto max-h-48">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      <div className="mt-4 text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
        <p className="font-medium mb-1">How this works:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            The <code>useFetchWithCache</code> hook caches API responses
          </li>
          <li>
            Try fetching the same URL multiple times - it will use the cache
          </li>
          <li>Try different URLs to see the cache in action</li>
          <li>Use "Force Refetch" to bypass the cache</li>
        </ul>
      </div>
    </TileComponent>
  );
}

export default CachedFetchDemo;
