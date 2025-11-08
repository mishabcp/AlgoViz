import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ControlBar from "./ControlBar";

export default function BinarySearch() {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(null);
  const [speed, setSpeed] = useState(1200);
  const [msg, setMsg] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const generate = () => {
    const a = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 90) + 10
    ).sort((x, y) => x - y);
    setArray(a);
    reset();
  };

  const reset = () => {
    setTarget("");
    setLow(0);
    setHigh(array.length - 1);
    setMid(-1);
    setFound(null);
    setMsg("");
    setIsRunning(false);
  };

  useEffect(() => generate(), []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const search = async () => {
    const t = Number(target);
    if (isNaN(t)) return setMsg("⚠️ Please enter a valid number.");
    reset();
    setHigh(array.length - 1);
    setIsRunning(true);

    let l = 0;
    let h = array.length - 1;

    while (l <= h) {
      const m = Math.floor((l + h) / 2);
      setLow(l);
      setHigh(h);
      setMid(m);
      setMsg(`🔍 Checking index ${m}: ${array[m]}`);
      await sleep(speed);

      if (array[m] === t) {
        setFound(m);
        setMsg(`✅ Found ${t} at index ${m}!`);
        setIsRunning(false);
        return;
      } else if (array[m] < t) {
        l = m + 1;
        setMsg(`➡️ ${t} > ${array[m]} → search right`);
      } else {
        h = m - 1;
        setMsg(`⬅️ ${t} < ${array[m]} → search left`);
      }
    }

    setFound(null);
    setMid(-1);
    setMsg("❌ Value not found.");
    setIsRunning(false);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-indigo-100 rounded-2xl shadow-lg mb-12 transition-all duration-500">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Binary Search Visualization
        </h2>
        <p className="text-indigo-600">
          Works only on sorted arrays – halves the search space each step.
        </p>
      </div>

      {/* Code Block */}
      <SyntaxHighlighter
        language="javascript"
        style={dracula}
        className="rounded-xl text-xs md:text-sm mb-8"
      >
{`function binarySearch(arr, target) {
  let l = 0, r = arr.length-1;
  while (l <= r) {
    const m = Math.floor((l+r)/2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m+1;
    else r = m-1;
  }
  return -1;
}`}
      </SyntaxHighlighter>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium">
        {[
          ["bg-indigo-500", "unsorted"],
          ["bg-yellow-500", "mid/current"],
          ["bg-emerald-600", "found"],
          ["ring-4 ring-indigo-300", "active range"],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Array Visual */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {array.map((v, i) => {
          const isMid = i === mid;
          const isFound = i === found;
          const inRange = i >= low && i <= high;

          const baseColor = isFound
            ? "bg-emerald-600 animate-swapPulse"
            : isMid
            ? "bg-yellow-500 scale-110 z-10"
            : "bg-indigo-500";

          return (
            <div
              key={i}
              className={`w-14 h-20 flex flex-col items-center justify-center rounded-lg text-white font-bold shadow transition-all duration-500 ease-in-out ${baseColor} ${
                inRange ? "ring-4 ring-indigo-300 ring-offset-2" : ""
              }`}
            >
              <span className="text-xs text-gray-100">{i}</span>
              <span className="text-lg">{v}</span>
            </div>
          );
        })}
      </div>

      {/* Input + Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target"
          className="px-4 py-2 border border-indigo-200 rounded-lg w-36 text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          disabled={isRunning}
        />
        <button
          onClick={search}
          disabled={isRunning || target === ""}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Search
        </button>
      </div>

      {/* Message */}
      {msg && (
        <p
          className={`text-center font-medium text-lg transition-all duration-500 ${
            msg.includes("Found")
              ? "text-emerald-700"
              : msg.includes("Checking") || msg.includes("➡️") || msg.includes("⬅️")
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          {msg}
        </p>
      )}

      {/* Control Bar */}
      <div className="mt-8">
        <ControlBar
          speed={speed}
          setSpeed={setSpeed}
          onGenerate={generate}
          onStart={() => {}}
          isRunning={isRunning}
          startLabel="Binary Search"
        />
      </div>
    </section>
  );
}
