import React, { useState, useCallback, useEffect, memo } from "react";
import TileComponent from "../core/TileComponent";

// Simulated data generator
function generateItems(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    text: `Item ${index}`,
    value: Math.floor(Math.random() * 100),
  }));
}

const ListItem = memo(function ListItem({ item, onItemClick }) {
  return (
    <div
      className="p-4 border-b hover:bg-gray-50 cursor-pointer flex justify-between items-center"
      onClick={() => onItemClick(item.id)}
    >
      <div>
        <span className="font-medium">{item.text}</span>
      </div>
      <div className="text-gray-500">Value: {item.value}</div>
    </div>
  );
});

function VirtualizedList() {
  const [items] = useState(() => generateItems(10000));
  const [isVirtualized, setIsVirtualized] = useState(true);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [renderTime, setRenderTime] = useState(null);

  const visibleItemCount = 20;

  const visibleItems = isVirtualized
    ? items.slice(visibleStartIndex, visibleStartIndex + visibleItemCount)
    : items;

  const handleScroll = useCallback(
    (e) => {
      if (!isVirtualized) return;

      const container = e.target;
      const scrollTop = container.scrollTop;
      const itemHeight = 56; // Approximate height of each item in pixels

      const newStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight));

      setVisibleStartIndex(newStartIndex);
    },
    [isVirtualized]
  );

  const handleItemClick = useCallback(
    (id) => {
      setSelectedId(id === selectedId ? null : id);
    },
    [selectedId]
  );

  const toggleVirtualization = () => {
    setVisibleStartIndex(0);
    setSelectedId(null);

    setStartTime(performance.now());
    setIsVirtualized(!isVirtualized);
  };

  useEffect(() => {
    if (startTime) {
      setRenderTime(performance.now() - startTime);
      setStartTime(null);
    }
  }, [isVirtualized, startTime]);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [visibleItems]);

  const totalHeight = isVirtualized
    ? items.length * 56 // 56px per item
    : "auto";

  const offsetY = isVirtualized ? visibleStartIndex * 56 : 0;

  return (
    <TileComponent>
      <h2 className="text-lg font-semibold mb-4 text-center">
        Large List Performance Optimization
      </h2>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="font-medium">Mode: </span>
          <span className={isVirtualized ? "text-green-600" : "text-red-600"}>
            {isVirtualized ? "Virtualized ✓" : "Standard ✗"}
          </span>
        </div>

        <button
          onClick={toggleVirtualization}
          className={`px-4 py-2 rounded ${
            isVirtualized
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          Switch to {isVirtualized ? "Standard" : "Virtualized"} Mode
        </button>
      </div>

      <div className="bg-blue-50 p-3 rounded mb-4 text-sm">
        <div className="flex justify-between">
          <div>
            <span className="font-medium">Total Items:</span> {items.length}
          </div>
          <div>
            <span className="font-medium">Visible Items:</span>{" "}
            {visibleItems.length}
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div>
            <span className="font-medium">Re-renders:</span> {renderCount}
          </div>
          {renderTime && (
            <div>
              <span className="font-medium">Render Time:</span>{" "}
              {renderTime.toFixed(2)}ms
            </div>
          )}
        </div>
      </div>

      <div
        className="border rounded h-80 overflow-auto"
        onScroll={handleScroll}
      >
        <div
          style={{
            height: isVirtualized ? totalHeight : "auto",
            position: isVirtualized ? "relative" : "static",
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id}
              style={{
                position: isVirtualized ? "absolute" : "static",
                top: isVirtualized
                  ? `${offsetY + (item.id - visibleStartIndex) * 56}px`
                  : "auto",
                width: "100%",
              }}
            >
              <ListItem
                item={item}
                onItemClick={handleItemClick}
                isSelected={item.id === selectedId}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 p-3 rounded border text-sm">
        <p className="font-medium mb-1">How this works:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            In <b>Standard mode</b>, all 10,000 items are rendered, causing slow
            performance
          </li>
          <li>
            In <b>Virtualized mode</b>, only visible items (about 20) are
            actually rendered
          </li>
          <li>
            React.memo prevents unnecessary re-renders of individual list items
          </li>
          <li>useCallback ensures event handlers don't trigger re-renders</li>
          <li>Try toggling between modes to see the performance difference!</li>
        </ul>
      </div>
    </TileComponent>
  );
}

export default VirtualizedList;
