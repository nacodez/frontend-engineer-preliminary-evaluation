import React, { useState } from "react";
import TileComponent from "../core/TileComponent";

const RequiredKeysDemo = () => {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "name": "John",\n  "age": 30,\n  "email": "john@example.com",\n  "address": null,\n  "phone": undefined\n}'
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("utility");

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleAnalyze = () => {
    try {
      let obj;
      try {
        const jsonStr = jsonInput.replace(/undefined/g, "null");
        obj = JSON.parse(jsonStr);
      } catch (e) {
        throw new Error(`Invalid JSON: ${e.message}`);
      }

      const requiredKeys = Object.keys(obj).filter((key) => obj[key] !== null);

      const missingKeys = requiredKeys.filter((key) => obj[key] === null);

      let resultObj = {
        requiredKeys,
        optionalKeys: Object.keys(obj).filter((key) => obj[key] === null),
        analysis: {
          allRequiredPresent: missingKeys.length === 0,
          missingKeys,
        },
      };

      setOutput(JSON.stringify(resultObj, null, 2));
      setError("");
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  const renderTypeScriptCode = () => {
    return `// RequiredKeys utility type
export type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

// Usage example
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// This will be: "id" | "name" | "email"
type UserRequiredKeys = RequiredKeys<User>;

// Function that ensures all required keys are present
export function ensureRequiredKeys<T>(obj: T): T {
  const objKeys = Object.keys(obj) as Array<keyof T>;
  const missingKeys: string[] = [];
  
  objKeys.forEach(key => {
    if (obj[key] === undefined) {
      missingKeys.push(key as string);
    }
  });
  
  if (missingKeys.length > 0) {
    throw new Error(\`Missing required keys: \${missingKeys.join(', ')}\`);
  }
  
  return obj;
}

// Example usage
const user: User = ensureRequiredKeys({
  id: 1,
  name: "John Doe",
  email: "john@example.com"
});`;
  };

  const renderExplanation = () => {
    return (
      <div>
        <h3 className="text-lg font-medium mb-3">How RequiredKeys Works</h3>

        <div className="mb-4">
          <p className="mb-2">
            The <code>RequiredKeys&lt;T&gt;</code> utility type extracts only
            the required keys from a given object type using TypeScript's type
            system:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>It uses a mapped type to iterate through all keys of type T</li>
            <li>
              For each key, it uses a conditional type to check if undefined is
              assignable to T[K]
            </li>
            <li>If undefined is NOT assignable, the key is required</li>
            <li>It returns a union of all required keys</li>
          </ol>
        </div>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Type-Level Computation:</h4>
          <p>
            The utility leverages TypeScript's type system to perform
            computation at the type level, not at runtime. This is done through:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Mapped types (<code>[K in keyof T]</code>)
            </li>
            <li>
              The key remapping modifier <code>-?</code> to remove optionality
            </li>
            <li>
              Conditional types (<code>undefined extends T[K] ? never : K</code>
              )
            </li>
            <li>
              Indexed access types (<code>[keyof T]</code>)
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <h4 className="font-medium mb-2">Practical Application:</h4>
          <p>This utility is useful for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Validating that all required fields are present in API requests
            </li>
            <li>Creating more precise type definitions</li>
            <li>Building form validation logic</li>
            <li>Type-safe property access</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <TileComponent>
      <h2 className="text-lg font-semibold mb-4 text-center">
        Required Keys Utility Type
      </h2>

      <div className="mb-4">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("utility")}
            className={`py-2 px-4 ${
              activeTab === "utility"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Utility Demo
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`py-2 px-4 ${
              activeTab === "code"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            TypeScript Implementation
          </button>
          <button
            onClick={() => setActiveTab("explanation")}
            className={`py-2 px-4 ${
              activeTab === "explanation"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            How It Works
          </button>
        </div>
      </div>

      {activeTab === "utility" && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Enter an object with some required and optional properties:
            </label>
            <textarea
              className="w-full h-40 p-2 border rounded font-mono text-sm"
              value={jsonInput}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use <code>null</code> or <code>undefined</code> for optional
              properties
            </p>
          </div>

          <div className="mb-4">
            <button
              onClick={handleAnalyze}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Analyze Required Keys
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {output && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-60 text-sm">
                {output}
              </pre>
            </div>
          )}
        </div>
      )}

      {activeTab === "code" && (
        <div>
          <h3 className="font-medium mb-2">TypeScript Implementation:</h3>
          <pre className="bg-gray-800 text-white p-3 rounded overflow-auto max-h-96 text-sm">
            {renderTypeScriptCode()}
          </pre>

          <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
            <p className="font-medium">Note:</p>
            <p>
              This utility works purely at the TypeScript type level. The demo
              on the "Utility Demo" tab simulates its behavior at runtime.
            </p>
          </div>
        </div>
      )}

      {activeTab === "explanation" && renderExplanation()}

      <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm">
        <h3 className="font-medium mb-2">Required Keys Use Cases:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium">API Validation</span>: Ensure all
            required fields are present in requests
          </li>
          <li>
            <span className="font-medium">Form Handling</span>: Distinguish
            between required and optional form fields
          </li>
          <li>
            <span className="font-medium">Type Refinement</span>: Create more
            specific subtypes based on required fields
          </li>
          <li>
            <span className="font-medium">Documentation</span>: Automatically
            generate docs showing which fields are required
          </li>
        </ul>
      </div>
    </TileComponent>
  );
};

export default RequiredKeysDemo;
