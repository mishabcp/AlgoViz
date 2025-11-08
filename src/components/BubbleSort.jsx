// src/components/BubbleSort.jsx
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ControlBar from "./ControlBar";

export default function BubbleSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [compare, setCompare] = useState({ i: null, j: null });
  const [sorted, setSorted] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [swapping, setSwapping] = useState({ i: null, j: null });
  const [isRunning, setIsRunning] = useState(false);

  // Generate random array
  const generate = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(arr);
    setSorted([]);
    setCompare({ i: null, j: null });
    setSwapping({ i: null, j: null });
    setIteration(0);
    setIsRunning(false);
  };

  useEffect(() => generate(), []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const animateSwap = async (i, j) => {
    setSwapping({ i, j });
    await sleep(speed * 0.8);
    setSwapping({ i: null, j: null });
  };

  const bubbleSort = async () => {
    setIsRunning(true);
    const arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        setCompare({ i: j, j: j + 1 });
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          await animateSwap(j, j + 1);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swapped = true;
        }
      }

      setSorted((prev) => [...prev, n - i - 1]);
      setIteration((prev) => prev + 1);

      if (!swapped) break;
    }

    setCompare({ i: null, j: null });
    setIsRunning(false);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-indigo-100 rounded-2xl shadow-lg mb-12 transition-all duration-500">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Bubble Sort Visualization
        </h2>
        <p className="text-indigo-600">
          Compare, swap, and rise to the top — the bubbles of sorting.
        </p>
      </div>

      {/* Code block */}
      <SyntaxHighlighter
        language="javascript"
        style={dracula}
        className="rounded-xl text-xs md:text-sm mb-8"
      >
{`function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1])
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return arr;
}`}
      </SyntaxHighlighter>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium">
        {[
          ["bg-indigo-500", "unsorted"],
          ["bg-orange-400", "comparing"],
          ["bg-emerald-600", "sorted"],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Bars / Visualizer */}
      <div className="flex justify-center items-end gap-3 mb-8 h-64 transition-all duration-500">
        {array.map((val, idx) => {
          const baseColor = sorted.includes(idx)
            ? "bg-emerald-600"
            : compare.i === idx || compare.j === idx
            ? "bg-orange-400"
            : "bg-indigo-500";

          const transform =
            swapping.i === idx
              ? "animate-swapPulse translate-x-2"
              : swapping.j === idx
              ? "animate-swapPulse -translate-x-2"
              : "";

          return (
            <div
              key={idx}
              className={`relative flex justify-center items-end w-10 rounded-t-lg text-white font-bold transition-all duration-500 ease-in-out transform ${baseColor} ${transform}`}
              style={{ height: `${val * 2.4}px` }}
            >
              <span className="absolute -top-6 text-xs text-gray-700">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <p className="text-center text-sm text-gray-600 mb-4">
        Iteration: <span className="font-bold text-indigo-800">{iteration}</span>
      </p>

      {/* Control Bar */}
      <ControlBar
        speed={speed}
        setSpeed={setSpeed}
        onGenerate={generate}
        onStart={bubbleSort}
        isRunning={isRunning}
        startLabel="Start Bubble Sort"
      />
    </section>
  );
}
