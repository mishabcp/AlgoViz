// App.js
import React from 'react';
import BubbleSort from './components/BubbleSort.jsx';
import QuickSortVisualization from '/src/components/QuickSort.jsx';
import Footer from './components/Footer.jsx'; // Import Footer component
import MergeSort from './components/MergeSort.jsx';
import LinearSearch from './components/LinearSearch.jsx';
import BinarySearch from './components/BinarySeach.jsx';

function App() {
  return (
    <div className="App">
      <BubbleSort />
      <QuickSortVisualization/>
      <MergeSort/>
      <LinearSearch/>
      <BinarySearch/>
      <Footer /> {/* Include Footer component */}
    </div>
  );
}

export default App;
