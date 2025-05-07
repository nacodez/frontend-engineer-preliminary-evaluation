import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const cache = {};

function useFetchWithCache(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mounted = useRef(true);

  const optionsRef = useRef(options);

  const [refetchIndex, setRefetchIndex] = useState(0);

  const fetchData = useCallback(
    async (skipCache = false) => {
      setLoading(true);

      try {
        if (!skipCache && cache[url]) {
          console.log("Using cached data for:", url);
          setData(cache[url]);
          setLoading(false);
          return;
        }

        const response = await fetch(url, optionsRef.current);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (mounted.current) {
          // Store in cache
          cache[url] = result;
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted.current) {
          console.error("Fetch error:", err);
          setError(err.message || "An error occurred while fetching data");
        }
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    },
    [url]
  );

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
    return fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    mounted.current = true;
    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [url, fetchData, refetchIndex]);

  return useMemo(
    () => ({
      data,
      loading,
      error,
      refetch,
      cached: !!cache[url],
    }),
    [data, loading, error, refetch, url]
  );
}

useFetchWithCache.clearCache = () => {
  Object.keys(cache).forEach((key) => {
    delete cache[key];
  });
};

useFetchWithCache.removeFromCache = (url) => {
  if (cache[url]) {
    delete cache[url];
    return true;
  }
  return false;
};

export default useFetchWithCache;
