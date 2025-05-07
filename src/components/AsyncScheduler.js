import React, { useState, useEffect, useRef } from "react";
import TileComponent from "../core/TileComponent";

// tracking of execution times across all calls
let executionTimestamps = [];

function schedule(fn, delay, maxPerSecond = 3) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const now = Date.now();

        executionTimestamps = executionTimestamps.filter(
          (timestamp) => now - timestamp < 1000
        );

        if (executionTimestamps.length >= maxPerSecond) {
          const oldestTimestamp = executionTimestamps[0];
          const waitTime = 1000 - (now - oldestTimestamp) + 5; // small buffer

          setTimeout(() => {
            schedule(fn, 0, maxPerSecond).then(resolve).catch(reject);
          }, waitTime);
          return;
        }

        executionTimestamps.push(now);
        const result = fn();

        if (result && typeof result.then === "function") {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    }, delay);
  });
}

function AsyncScheduler() {
  const [logs, setLogs] = useState([]);
  const [limit, setLimit] = useState(3);
  const [delay, setDelay] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const logEnd = useRef(null);

  function addLog(msg) {
    const time = new Date().toLocaleTimeString();
    setLogs((old) => [...old, `${time}: ${msg}`]);
  }

  useEffect(() => {
    logEnd.current?.scrollIntoView();
  }, [logs]);

  function resetDemo() {
    setLogs([]);
    setCount(0);
    executionTimestamps = [];
  }

  function startDemo() {
    if (isRunning) return;

    resetDemo();
    setIsRunning(true);
    addLog(
      `Started demo - Rate limit: ${limit}/sec, Initial delay: ${delay}ms`
    );

    const calls = 10;
    const promises = [];

    for (let i = 0; i < calls; i++) {
      const p = schedule(
        () => {
          addLog(`Running function call #${i + 1}`);
          setCount((c) => c + 1);
          return i;
        },
        delay,
        limit
      );

      p.then((val) => {
        addLog(`Call #${i + 1} completed with value: ${val}`);
      }).catch((err) => {
        addLog(`Error in call #${i + 1}: ${err.message}`);
      });

      promises.push(p);
    }

    Promise.all(promises).finally(() => {
      addLog("All calls completed!");
      setIsRunning(false);
    });
  }

  return (
    <TileComponent>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-center">
          Rate-Limited Function Scheduler
        </h2>

        <div className="mb-4 bg-gray-100 p-3 rounded">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">
                Max calls per second:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={limit}
                onChange={(e) =>
                  setLimit(Math.max(1, parseInt(e.target.value) || 1))
                }
                disabled={isRunning}
                className="w-full p-1 border rounded"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Initial delay (ms):</label>
              <input
                type="number"
                min="0"
                value={delay}
                onChange={(e) =>
                  setDelay(Math.max(0, parseInt(e.target.value) || 0))
                }
                disabled={isRunning}
                className="w-full p-1 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={startDemo}
            disabled={isRunning}
            className={`flex-1 py-2 rounded ${
              isRunning ? "bg-gray-400" : "bg-blue-500 text-white"
            }`}
          >
            {isRunning ? "Running..." : "Start Demo"}
          </button>

          <button onClick={resetDemo} className="px-3 py-2 bg-gray-200 rounded">
            Reset
          </button>
        </div>

        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
          <div>Completed: {count} / 10 calls</div>
        </div>

        <div className="h-56 overflow-y-auto bg-gray-50 p-2 border rounded mb-4">
          {logs.length === 0 ? (
            <p className="text-gray-400 italic">Logs will appear here...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-sm py-1 font-mono">
                {log}
              </div>
            ))
          )}
          <div ref={logEnd} />
        </div>

        <div className="text-sm bg-yellow-50 p-3 border border-yellow-200 rounded">
          <p className="font-medium mb-1">About this demo:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The scheduler ensures no more than {limit} executions happen
              within any 1-second window
            </li>
            <li>All 10 function calls are requested at once</li>
            <li>
              Watch how they execute with delays to respect the rate limit
            </li>
          </ul>
        </div>
      </div>
    </TileComponent>
  );
}

export default AsyncScheduler;
