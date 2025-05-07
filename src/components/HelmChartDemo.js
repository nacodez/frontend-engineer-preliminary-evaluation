import React, { useState } from "react";
import TileComponent from "../core/TileComponent";

function HelmChartDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showOutput, setShowOutput] = useState(false);

  const helmInstallOutput = `NAME: frontend-release
LAST DEPLOYED: Wed May 7 14:23:45 2025
NAMESPACE: frontend
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Frontend SPA has been deployed!
Access your application at: http://chart-example.local

Resources deployed:
- Deployment: frontend-release-frontend-spa
- Service: frontend-release-frontend-spa
- ConfigMap: frontend-release-frontend-spa-config
- Cache busting hook job will run after upgrade complete`;

  return (
    <TileComponent>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Helm Chart for Frontend SPA
        </h2>

        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-4 py-2 ${
              activeTab === "chart"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Chart Structure
          </button>
          <button
            onClick={() => setActiveTab("values")}
            className={`px-4 py-2 ${
              activeTab === "values"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Values
          </button>
          <button
            onClick={() => setActiveTab("hooks")}
            className={`px-4 py-2 ${
              activeTab === "hooks"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Cache Busting
          </button>
          <button
            onClick={() => setActiveTab("demo")}
            className={`px-4 py-2 ${
              activeTab === "demo"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Installation
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 border mb-6 min-h-[300px]">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-xl font-medium mb-3">
                Helm Chart for Frontend SPA
              </h3>
              <p className="mb-4">
                This Helm chart is designed to deploy a frontend Single Page
                Application to Kubernetes with all necessary resources and
                configuration options.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Configurable service and ingress resources</li>
                  <li>Environment variable injection</li>
                  <li>ConfigMap support for runtime configuration</li>
                  <li>Post-upgrade hooks for CDN cache invalidation</li>
                  <li>Resource management and autoscaling</li>
                </ul>
              </div>

              <p>
                The chart follows Helm best practices with conditionals, helper
                templates, and proper dependency management. It's designed to be
                customizable through values.yaml while providing sensible
                defaults.
              </p>
            </div>
          )}

          {activeTab === "chart" && (
            <div>
              <h3 className="text-xl font-medium mb-3">Chart Structure</h3>

              <div className="font-mono text-sm bg-gray-100 p-3 rounded mb-4">
                <pre>
                  {`frontend-spa/
├── Chart.yaml           # Chart metadata
├── values.yaml          # Default values
├── templates/
│   ├── _helpers.tpl     # Named templates and helpers
│   ├── deployment.yaml  # Kubernetes deployment
│   ├── service.yaml     # Service with conditionals
│   ├── ingress.yaml     # Optional ingress resource
│   ├── configmap.yaml   # Optional config maps
│   └── cache-busting-hook.yaml # Post-upgrade hook
`}
                </pre>
              </div>

              <p className="mb-3">
                The chart follows a modular approach with conditional templates
                that are only rendered when enabled in values.yaml. This keeps
                the deployed resources minimal and relevant to your specific
                needs.
              </p>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-medium mb-1">Named Templates:</h4>
                <p>
                  The _helpers.tpl file contains reusable named templates for:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Generating consistent names</li>
                  <li>Creating standard label sets</li>
                  <li>Handling common logic across templates</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "values" && (
            <div>
              <h3 className="text-xl font-medium mb-3">Configuration Values</h3>

              <p className="mb-4">
                The chart is highly configurable through values.yaml, with
                sensible defaults that work out of the box for most deployments.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium">Service Configuration</h4>
                  <p className="text-sm text-gray-600">
                    Enable/disable the service and configure its type and ports.
                  </p>
                  <pre className="text-xs bg-gray-100 p-2 mt-1 rounded">
                    {`service:
  enabled: true     # Toggle service creation
  type: ClusterIP   # Service type
  port: 80          # Service port
  targetPort: 80    # Container port`}
                  </pre>
                </div>

                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium">Ingress Configuration</h4>
                  <p className="text-sm text-gray-600">
                    Optional ingress for external access with customizable hosts
                    and paths.
                  </p>
                  <pre className="text-xs bg-gray-100 p-2 mt-1 rounded">
                    {`ingress:
  enabled: false
  annotations: {}    # Custom annotations
  hosts:
    - host: chart-example.local
      paths: [...]`}
                  </pre>
                </div>

                <div className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-medium">Environment Variables</h4>
                  <p className="text-sm text-gray-600">
                    Inject environment variables into the container.
                  </p>
                  <pre className="text-xs bg-gray-100 p-2 mt-1 rounded">
                    {`extraEnvVars:
  - name: NODE_ENV
    value: production
  - name: API_URL
    value: https://api.example.com`}
                  </pre>
                </div>

                <div className="border-l-4 border-amber-500 pl-3">
                  <h4 className="font-medium">CDN Configuration</h4>
                  <p className="text-sm text-gray-600">
                    Configure CDN provider for cache busting hooks.
                  </p>
                  <pre className="text-xs bg-gray-100 p-2 mt-1 rounded">
                    {`cdn:
  provider: cloudflare  # Options: cloudflare, aws
  enabled: true
  zoneId: ""            # For Cloudflare
  distributionId: ""    # For AWS CloudFront`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hooks" && (
            <div>
              <h3 className="text-xl font-medium mb-3">
                Cache Busting Mechanism
              </h3>

              <p className="mb-4">
                The chart includes a post-upgrade hook that automatically
                invalidates CDN cache whenever the application is upgraded. This
                ensures users always get the latest version.
              </p>

              <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">How It Works:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Post-Upgrade Hook:</span> The
                    job runs after a successful helm upgrade
                    <pre className="text-xs bg-white p-2 mt-1 rounded border border-indigo-100">
                      {`annotations:
  helm.sh/hook: post-upgrade
  helm.sh/hook-weight: "0"
  helm.sh/hook-delete-policy: hook-succeeded,before-hook-creation`}
                    </pre>
                  </li>
                  <li>
                    <span className="font-medium">CDN API Calls:</span>{" "}
                    Depending on the provider (Cloudflare or AWS), the job makes
                    API calls to purge the cache
                  </li>
                  <li>
                    <span className="font-medium">Cleanup:</span> The job is
                    automatically deleted after successful completion
                  </li>
                </ol>
              </div>

              <div className="border p-3 rounded-lg">
                <h4 className="font-medium mb-2">Cloudflare Implementation:</h4>
                <p className="text-sm mb-2">
                  Uses the Cloudflare API to purge cache for the specified zone:
                </p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {`curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \\
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_KEY" \\
  -H "Content-Type: application/json" \\
  --data '{"purge_everything":true}'`}
                </pre>

                <h4 className="font-medium mt-4 mb-2">
                  AWS CloudFront Implementation:
                </h4>
                <p className="text-sm mb-2">
                  Uses the AWS CLI to create cache invalidations:
                </p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {`aws cloudfront create-invalidation \\
  --distribution-id $DISTRIBUTION_ID \\
  --paths "$PATH_PATTERN" \\
  --query "Invalidation.Id" \\
  --output text`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "demo" && (
            <div>
              <h3 className="text-xl font-medium mb-3">
                Helm Installation Demo
              </h3>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Installation Command:</h4>
                <div className="bg-gray-900 text-white p-3 rounded-lg font-mono text-sm">
                  $ helm install frontend-release ./frontend-spa --namespace
                  frontend --create-namespace
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Custom Values:</h4>
                <p className="text-sm mb-2">
                  You can override default values using a custom values file:
                </p>
                <div className="bg-gray-900 text-white p-3 rounded-lg font-mono text-sm">
                  $ helm install frontend-release ./frontend-spa -f
                  my-values.yaml
                </div>
              </div>

              <button
                onClick={() => setShowOutput(!showOutput)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              >
                {showOutput ? "Hide Output" : "Show Installation Output"}
              </button>

              {showOutput && (
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  <pre>{helmInstallOutput}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
          <h3 className="font-semibold mb-2">Helm Chart Best Practices</h3>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium">1. DRY Templates</h4>
              <p className="ml-4 text-gray-700">
                The <code>_helpers.tpl</code> file implements the DRY (Don't
                Repeat Yourself) principle with named templates for common
                elements like labels and selectors.
              </p>
            </div>

            <div>
              <h4 className="font-medium">2. Conditional Resources</h4>
              <p className="ml-4 text-gray-700">
                Templates use conditionals like{" "}
                <code>
                  {"{"}
                  {"{"}- if .Values.service.enabled -{"}"}
                  {"}"}
                </code>{" "}
                to only create resources when needed, improving efficiency.
              </p>
            </div>

            <div>
              <h4 className="font-medium">3. Proper Hook Management</h4>
              <p className="ml-4 text-gray-700">
                Hooks include appropriate weights and delete policies to ensure
                they run in the correct order and clean up automatically.
              </p>
            </div>

            <div>
              <h4 className="font-medium">4. Security Considerations</h4>
              <p className="ml-4 text-gray-700">
                Secrets are referenced from existing resources rather than
                defined in values, following security best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TileComponent>
  );
}

export default HelmChartDemo;
