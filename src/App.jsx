import BubbleSort from "./components/BubbleSort";
import QuickSortVisualization from "./components/QuickSort";
import MergeSort from "./components/MergeSort";
import LinearSearch from "./components/LinearSearch";
import BinarySearch from "./components/BinarySearch";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 bg-white shadow-md py-5">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-indigo-700 text-center">
            AlgoViz – Sorting & Searching
          </h1>
        </div>
      </header>

      <main className="py-8">
        <BubbleSort />
        <QuickSortVisualization />
        <MergeSort />
        <LinearSearch />
        <BinarySearch />
      </main>

      <Footer />
    </div>
  );
}