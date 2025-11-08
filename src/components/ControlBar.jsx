export default function ControlBar({
  speed,
  setSpeed,
  onGenerate,
  onStart,
  isRunning,
  startLabel = "Start",
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
      <button
        onClick={onGenerate}
        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow transition"
      >
        New Array
      </button>

      <button
        onClick={onStart}
        disabled={isRunning}
        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition disabled:opacity-50"
      >
        {isRunning ? "Running…" : startLabel}
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Speed:</span>
        <input
          type="range"
          min="200"
          max="3000"
          step="200"
          value={speed}
          onChange={(e) => setSpeed(+e.target.value)}
          className="w-32 accent-indigo-600"
        />
        <span className="text-sm w-12 text-right">{speed} ms</span>
      </div>
    </div>
  );
}