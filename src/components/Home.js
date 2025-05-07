import React from "react";
import NavigationButton from "../core/NavigationButton";

const Home = () => {
  const navSections = [
    {
      title: "JavaScript Task",
      items: [
        {
          to: "/async-scheduler",
          bgColor: "bg-purple-400",
          label: "1.1 Rate Limiter",
        },
        {
          to: "/required-keys",
          bgColor: "bg-teal-400",
          label: "1.2 Required Keys",
        },
        {
          to: "/function-composition",
          bgColor: "bg-orange-400",
          label: "1.3 Function Composition",
        },
      ],
    },
    {
      title: "React Tasks",
      items: [
        {
          to: "/cached-fetch",
          bgColor: "bg-blue-400",
          label: "3.1 Cached Fetch Hook",
        },
        {
          to: "/virtualized-list",
          bgColor: "bg-green-500",
          label: "3.2 Virtualized List",
        },
        {
          to: "/error-boundary",
          bgColor: "bg-red-400",
          label: "3.3 Error Boundary HOC",
        },
      ],
    },
    {
      title: "Frontend Integration",
      items: [
        {
          to: "/micro-frontend",
          bgColor: "bg-amber-500",
          label: "4.1 Micro-Frontend Router",
        },
        {
          to: "/bundle-optimization",
          bgColor: "bg-teal-500",
          label: "4.2 Bundle Optimization",
        },
      ],
    },
    {
      title: "Helm & CI Integration",
      items: [
        {
          to: "/helm-chart",
          bgColor: "bg-indigo-500",
          label: "5.1 & 5.2 Helm Chart with Cache Busting",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col bg-gray-100 mx-10 border rounded-3xl border-gray-300 pt-10 pb-10 mt-10">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-8">
        Frontend Engineer Preliminary Evaluation
      </h1>
      {navSections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className={`px-6 ${
            sectionIndex < navSections.length - 1 ? "mb-8" : "mb-6"
          }`}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {section.title}
          </h2>
          <div className="flex flex-wrap gap-4">
            {section.items.map((item, itemIndex) => (
              <NavigationButton
                key={itemIndex}
                to={item.to}
                bgColor={item.bgColor}
                label={item.label}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
