import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ControlBar from "./ControlBar";

export default function MergeSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(600);
  const [highlighted, setHighlighted] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);

  // Generate random array
  const generate = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(arr);
    setHighlighted([]);
    setSorted([]);
    setIsRunning(false);
    setIteration(0);
  };

  useEffect(() => generate(), []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const mergeSort = async () => {
    setIsRunning(true);
    const arr = [...array];

    async function mergeSortHelper(arr, l, r) {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);
      await merge(arr, l, m, r);
    }

    async function merge(arr, l, m, r) {
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);
      let i = 0,
        j = 0,
        k = l;

      setHighlighted([l, m + 1]);
      await sleep(speed);

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          arr[k++] = left[i++];
        } else {
          arr[k++] = right[j++];
        }
        setArray([...arr]);
        await sleep(speed * 0.8);
      }

      while (i < left.length) {
        arr[k++] = left[i++];
        setArray([...arr]);
        await sleep(speed * 0.8);
      }

      while (j < right.length) {
        arr[k++] = right[j++];
        setArray([...arr]);
        await sleep(speed * 0.8);
      }

      setIteration((prev) => prev + 1);
    }

    await mergeSortHelper(arr, 0, arr.length - 1);
    setSorted([...arr]);
    setHighlighted([]);
    setIsRunning(false);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-indigo-100 rounded-2xl shadow-lg mb-12 transition-all duration-500">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Merge Sort Visualization
        </h2>
        <p className="text-indigo-600">
          Divide, conquer, and merge — a stable and elegant O(n log n) sort.
        </p>
      </div>

      {/* Code Block */}
      <SyntaxHighlighter
        language="javascript"
        style={dracula}
        className="rounded-xl text-xs md:text-sm mb-8"
      >
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(
    mergeSort(arr.slice(0, mid)),
    mergeSort(arr.slice(mid))
  );
}`}
      </SyntaxHighlighter>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium">
        {[
          ["bg-indigo-500", "unsorted"],
          ["bg-orange-400", "merging"],
          ["bg-emerald-600", "sorted"],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Visualizer */}
      <div className="flex justify-center items-end gap-3 mb-8 h-64 transition-all duration-500">
        {array.map((val, idx) => {
          const isHighlighted = highlighted.includes(idx);
          const isSorted = sorted.includes(val);

          const baseColor = isSorted
            ? "bg-emerald-600"
            : isHighlighted
            ? "bg-orange-400 animate-swapPulse"
            : "bg-indigo-500";

          return (
            <div
              key={idx}
              className={`relative flex justify-center items-end w-10 rounded-t-lg text-white font-bold transition-all duration-500 ease-in-out transform ${baseColor}`}
              style={{
                height: `${val * 2.4}px`,
              }}
            >
              <span className="absolute -top-6 text-xs text-gray-700">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <p className="text-center text-sm text-gray-600 mb-4">
        Merge Steps: <span className="font-bold text-indigo-800">{iteration}</span>
      </p>

      {/* Control Bar */}
      <ControlBar
        speed={speed}
        setSpeed={setSpeed}
        onGenerate={generate}
        onStart={mergeSort}
        isRunning={isRunning}
        startLabel="Start Merge Sort"
      />
    </section>
  );
}
