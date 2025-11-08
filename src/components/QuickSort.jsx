// src/components/QuickSortVisualization.jsx
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ControlBar from "./ControlBar";

export default function QuickSortVisualization() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(800);
  const [isRunning, setIsRunning] = useState(false);
  const [pivotIdx, setPivotIdx] = useState(null);
  const [comparing, setComparing] = useState({ i: null, j: null });
  const [swapping, setSwapping] = useState({ i: null, j: null });
  const [sorted, setSorted] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  // ---------- Helpers ----------
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const resetStates = () => {
    setPivotIdx(null);
    setComparing({ i: null, j: null });
    setSwapping({ i: null, j: null });
    setSorted([]);
    setStepCount(0);
  };

  const generate = () => {
    const a = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(a);
    resetStates();
    setIsRunning(false);
  };

  useEffect(() => generate(), []);

  // ---------- Core Animation ----------
  const animateSwap = async (i, j) => {
    setSwapping({ i, j });
    await sleep(speed / 1.5);
    setSwapping({ i: null, j: null });
  };

  // ---------- QuickSort ----------
  const quickSort = async () => {
    setIsRunning(true);
    const arr = [...array];

    const partition = async (low, high) => {
      const pivotVal = arr[high];
      setPivotIdx(high);
      await sleep(speed / 2);

      let i = low - 1;
      for (let j = low; j < high; j++) {
        setComparing({ i: j, j: high });
        setStepCount((c) => c + 1);
        await sleep(speed);

        if (arr[j] < pivotVal) {
          i++;
          await animateSwap(i, j);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }

      await animateSwap(i + 1, high);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      setPivotIdx(null);
      setComparing({ i: null, j: null });
      return i + 1;
    };

    const qs = async (low, high) => {
      if (low >= high) {
        setSorted((prev) => [...prev, low]);
        return;
      }
      const pi = await partition(low, high);
      await Promise.all([qs(low, pi - 1), qs(pi + 1, high)]);
    };

    await qs(0, arr.length - 1);
    setSorted([...Array(arr.length).keys()]);
    setIsRunning(false);
  };

  // ---------- UI ----------
  return (
    <section className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-lg mb-12 transition-all duration-500">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-indigo-800 mb-1">Quick Sort Visualization</h2>
        <p className="text-indigo-600">Observe each <span className="font-semibold">pivot</span>, comparison, and swap in real-time.</p>
      </div>

      {/* Code Snippet */}
      <div className="mb-8">
        <SyntaxHighlighter language="javascript" style={dracula} className="rounded-xl text-xs md:text-sm">
{`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  const pi = partition(arr, low, high);
  quickSort(arr, low, pi - 1);
  quickSort(arr, pi + 1, high);
}`}
        </SyntaxHighlighter>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
        {[
          ["bg-indigo-500", "unsorted"],
          ["bg-orange-400", "comparing"],
          ["bg-red-600 ring-2 ring-red-300", "pivot"],
          ["bg-emerald-600", "sorted"],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="flex justify-center items-end gap-2 md:gap-3 mb-8 h-64">
        {array.map((val, idx) => {
          const baseColor = sorted.includes(idx)
            ? "bg-emerald-600"
            : pivotIdx === idx
            ? "bg-red-600 ring-4 ring-red-300"
            : comparing.i === idx || comparing.j === idx
            ? "bg-orange-400"
            : "bg-indigo-500";

          const translateClass =
            swapping.i === idx
              ? "animate-bounce translate-x-2"
              : swapping.j === idx
              ? "animate-bounce -translate-x-2"
              : "";

          return (
            <div
              key={idx}
              className={`relative flex justify-center items-end w-6 md:w-10 rounded-t-lg text-white font-bold transition-all duration-500 ease-in-out transform ${baseColor} ${translateClass}`}
              style={{ height: `${val * 2}px` }}
            >
              <span className="absolute -top-6 text-xs text-gray-700">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Info */}
      {pivotIdx !== null && (
        <p className="text-center text-base font-semibold text-red-700 mb-2 transition-all">
          Pivot: <span className="text-red-900">{array[pivotIdx]}</span> (index {pivotIdx})
        </p>
      )}
      <p className="text-center text-sm text-gray-600 mb-4">
        Steps performed: <span className="font-bold text-indigo-800">{stepCount}</span>
      </p>

      {/* Controls */}
      <ControlBar
        speed={speed}
        setSpeed={setSpeed}
        onGenerate={generate}
        onStart={quickSort}
        isRunning={isRunning}
        startLabel="Start Quick Sort"
      />
    </section>
  );
}
