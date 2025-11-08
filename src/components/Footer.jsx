export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AlgoViz – Sorting & Searching Visualizer
        </p>
      </div>
    </footer>
  );
}