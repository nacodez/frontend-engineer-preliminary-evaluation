import React, { useState } from "react";
import TileComponent from "../core/TileComponent";
const compose = (fns) => {
  if (fns.length === 0) return (x) => x;

  return function composed(...args) {
    let result = fns[fns.length - 1](...args);

    for (let i = fns.length - 2; i >= 0; i--) {
      const fn = fns[i];

      if (result instanceof Promise) {
        result = result.then(fn);
      } else {
        result = fn(result);
      }
    }

    return result;
  };
};

const FunctionCompositionDemo = () => {
  const [inputValue, setInputValue] = useState("5");
  const [operationsList, setOperationsList] = useState([
    { id: 1, type: "double", name: "Double", fn: "n => n * 2", enabled: true },
    { id: 2, type: "addTen", name: "Add 10", fn: "n => n + 10", enabled: true },
    { id: 3, type: "square", name: "Square", fn: "n => n * n", enabled: true },
  ]);
  const [result, setResult] = useState(null);
  const [executionOrder, setExecutionOrder] = useState("right-to-left");
  const [intermediateResults, setIntermediateResults] = useState([]);

  const operationFunctions = {
    double: (n) => {
      const result = n * 2;
      return result;
    },
    addTen: (n) => {
      const result = n + 10;
      return result;
    },
    square: (n) => {
      const result = n * n;
      return result;
    },
    half: (n) => {
      const result = n / 2;
      return result;
    },
    increment: (n) => {
      const result = n + 1;
      return result;
    },
    decrement: (n) => {
      const result = n - 1;
      return result;
    },
    negate: (n) => {
      const result = -n;
      return result;
    },
    delay: async (n) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return n;
    },
  };

  const handleAddOperation = (type) => {
    const opDefinitions = {
      half: { name: "Half", fn: "n => n / 2" },
      increment: { name: "Increment", fn: "n => n + 1" },
      decrement: { name: "Decrement", fn: "n => n - 1" },
      negate: { name: "Negate", fn: "n => -n" },
      delay: {
        name: "Delay (Async)",
        fn: "async n => { await delay(500); return n; }",
      },
    };

    if (!opDefinitions[type]) return;

    const newOp = {
      id: Date.now(),
      type,
      name: opDefinitions[type].name,
      fn: opDefinitions[type].fn,
      enabled: true,
    };

    setOperationsList([...operationsList, newOp]);
  };

  const handleRemoveOperation = (id) => {
    setOperationsList(operationsList.filter((op) => op.id !== id));
  };

  const handleToggleOperation = (id) => {
    setOperationsList(
      operationsList.map((op) =>
        op.id === id ? { ...op, enabled: !op.enabled } : op
      )
    );
  };

  const handleReorderOperation = (id, direction) => {
    const index = operationsList.findIndex((op) => op.id === id);
    if (index === -1) return;

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === operationsList.length - 1)
    ) {
      return;
    }

    const newList = [...operationsList];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];

    setOperationsList(newList);
  };

  const logExecution = (step, input, output) => {
    return { step, input, output };
  };

  const executeComposition = async () => {
    try {
      const enabledOps = operationsList
        .filter((op) => op.enabled)
        .map((op) => operationFunctions[op.type]);

      if (enabledOps.length === 0) {
        setResult(parseFloat(inputValue));
        setIntermediateResults([]);
        return;
      }

      let ops = [...enabledOps];

      if (executionOrder === "left-to-right") {
        ops.reverse();
      }

      const input = parseFloat(inputValue);

      const steps = [];
      let currentValue = input;

      if (executionOrder === "right-to-left") {
        for (let i = ops.length - 1; i >= 0; i--) {
          const fn = ops[i];
          const fnName = operationsList.filter((op) => op.enabled)[
            ops.length - 1 - i
          ].name;

          try {
            const output = await fn(currentValue);
            steps.push(logExecution(fnName, currentValue, output));
            currentValue = output;
          } catch (err) {
            console.error(`Error executing ${fnName}:`, err);
            throw err;
          }
        }
      } else {
        for (let i = 0; i < ops.length; i++) {
          const fn = ops[i];
          const fnName = operationsList.filter((op) => op.enabled)[i].name;

          try {
            const output = await fn(currentValue);
            steps.push(logExecution(fnName, currentValue, output));
            currentValue = output;
          } catch (err) {
            console.error(`Error executing ${fnName}:`, err);
            throw err;
          }
        }
      }

      setResult(currentValue);
      setIntermediateResults(steps);
    } catch (err) {
      console.error("Execution error:", err);
      setResult("Error: " + err.message);
      setIntermediateResults([]);
    }
  };

  const renderOperationCode = () => {
    const enabledOps = operationsList
      .filter((op) => op.enabled)
      .map((op) => op.fn);

    if (enabledOps.length === 0) {
      return "No operations selected";
    }

    if (executionOrder === "right-to-left") {
      return `const composed = compose([
  ${enabledOps.join(",\n  ")}
]);

// Execution order: right-to-left (math notation)
const result = composed(${inputValue});`;
    } else {
      return `const piped = pipe([
  ${enabledOps.join(",\n  ")}
]);

// Execution order: left-to-right (pipeline notation)
const result = piped(${inputValue});`;
    }
  };

  const renderCompositionExplanation = () => {
    if (intermediateResults.length === 0) {
      return (
        <p className="italic text-gray-500">
          Run the composition to see the execution flow
        </p>
      );
    }

    return (
      <div className="border p-3 rounded bg-gray-50">
        <h4 className="font-medium mb-2">Execution flow ({executionOrder}):</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              S
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Start value</div>
              <div className="text-lg">{inputValue}</div>
            </div>
          </div>

          {intermediateResults.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {index < intermediateResults.length - 1 && (
                  <div className="h-6 w-0.5 bg-gray-300"></div>
                )}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">{step.step}</div>
                <div className="text-xs text-gray-500">Input: {step.input}</div>
                <div className="text-lg">Output: {step.output}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <TileComponent>
      <h2 className="text-lg font-semibold mb-4 text-center">
        Function Composition & Closures
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Initial Value:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Execution Order:
            </label>
            <div className="flex">
              <button
                className={`flex-1 py-2 px-3 ${
                  executionOrder === "right-to-left"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setExecutionOrder("right-to-left")}
              >
                Right to Left (compose)
              </button>
              <button
                className={`flex-1 py-2 px-3 ${
                  executionOrder === "left-to-right"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setExecutionOrder("left-to-right")}
              >
                Left to Right (pipe)
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Function Chain:</label>
              <div className="flex space-x-1">
                <select
                  className="text-sm border rounded p-1"
                  onChange={(e) =>
                    e.target.value && handleAddOperation(e.target.value)
                  }
                  value=""
                >
                  <option value="">Add function...</option>
                  <option value="half">Half</option>
                  <option value="increment">Increment</option>
                  <option value="decrement">Decrement</option>
                  <option value="negate">Negate</option>
                  <option value="delay">Delay (Async)</option>
                </select>
              </div>
            </div>

            <div className="border rounded overflow-hidden">
              {operationsList.length === 0 ? (
                <div className="p-3 text-gray-500 italic text-center">
                  No functions added yet
                </div>
              ) : (
                <div>
                  {operationsList.map((op, index) => (
                    <div
                      key={op.id}
                      className={`p-3 border-b last:border-b-0 flex items-center ${
                        op.enabled ? "" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={op.enabled}
                        onChange={() => handleToggleOperation(op.id)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{op.name}</div>
                        <div className="text-xs font-mono">{op.fn}</div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleReorderOperation(op.id, "up")}
                          disabled={index === 0}
                          className={`p-1 rounded ${
                            index === 0
                              ? "text-gray-300"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleReorderOperation(op.id, "down")}
                          disabled={index === operationsList.length - 1}
                          className={`p-1 rounded ${
                            index === operationsList.length - 1
                              ? "text-gray-300"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => handleRemoveOperation(op.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={executeComposition}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Execute Composition
            </button>
          </div>

          {result !== null && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
              <div className="text-sm font-medium text-green-800">Result:</div>
              <div className="text-xl font-semibold">{result}</div>
            </div>
          )}
        </div>

        <div>
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Generated Code:</h3>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-auto text-sm h-32">
              {renderOperationCode()}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Execution Flow:</h3>
            {renderCompositionExplanation()}
          </div>

          <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm">
            <h3 className="font-medium mb-2">
              How Function Composition Works:
            </h3>
            <p className="mb-2">
              Function composition creates a new function by combining multiple
              functions, where the output of one becomes the input to the next.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <b>Closure:</b> The composed function encloses the original
                functions in its scope
              </li>
              <li>
                <b>Right-to-Left (compose):</b> f(g(x)) - Mathematical notation
              </li>
              <li>
                <b>Left-to-Right (pipe):</b> x → g → f - Pipeline notation
              </li>
              <li>
                <b>Async Support:</b> Seamlessly handles Promises in the chain
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TileComponent>
  );
};

export default FunctionCompositionDemo;
