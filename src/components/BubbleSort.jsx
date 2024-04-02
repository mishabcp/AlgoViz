import React, { useState, useEffect } from 'react';
import '/src/components/bubblesort.css'; // Make sure Tailwind CSS is imported in this file
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

function BubbleSort() {
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [speed, setSpeed] = useState(400); // Default speed (milliseconds)
  const [compareIndices, setCompareIndices] = useState({});
  const [sortedIndices, setSortedIndices] = useState([]);
  const [iterationCount, setIterationCount] = useState(0);
  const [swapIndices, setSwapIndices] = useState({ index1: null, index2: null });


  // Generate a new random array
  const generateArray = () => {
    const newArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSortedArray([]);
    setSortedIndices([]);
    setIterationCount(0); // Reset iteration count
  };

  useEffect(() => {
    generateArray(); // Call generateArray when the component mounts
  }, []); 

  const animateSwap = async (index1, index2) => {
    setSwapIndices({ index1, index2 });
    await new Promise(resolve => setTimeout(resolve, speed));
    setSwapIndices({ index1: null, index2: null }); // Reset swapIndices after animation
  };
  

  const bubbleSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    let iterations = 0;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        setCompareIndices({ first: j, second: j + 1 }); // Highlight elements being compared
        await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization

        if (arrayCopy[j] > arrayCopy[j + 1]) {

          await animateSwap(j, j + 1); // Animate the swap
          // Swap elements
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          swapped = true;

          // Update state for visualization and trigger swap animation
          setArray([...arrayCopy]);
          

          // Delay after swap for visualization
          await new Promise(resolve => setTimeout(resolve, speed)); // Delay after each swap
        }
      }
      iterations++; // Increment iteration count
      setIterationCount(iterations); // Update iteration count state

      // Identify the last sorted index
      const lastSortedIndex = n - i - 1;

      // Update state to highlight the sorted part
      setCompareIndices({ sortedIndex: lastSortedIndex });
      setSortedIndices(prevIndices => [...prevIndices, lastSortedIndex]); // Update sorted indices

      // Delay after sorting the last element for visualization
      await new Promise(resolve => setTimeout(resolve, speed));

      // If no elements were swapped, array is sorted
      if (!swapped) break;
    }

    // Remove comparison and sorting highlight after sorting is done
    setCompareIndices({});
    setSortedArray([...arrayCopy]); // Update state to display sorted array
    setSortedIndices([]); // Reset sorted indices
  };

  // Handle speed change
  const handleSpeedChange = e => {
    setSpeed(Number(e.target.value));
  };


  return (
    <div className="mx-auto container w-4/5 2xl:w-3/5 mb-10 xl:mb-20">
      <h1 className="text-5xl font-bold mb-10 mt-10 xl:mb-16 xl:mt-16">Sort and Search Visualizer</h1>
      <div className="mb-6 xl:mb-10">
        <h2 className="text-3xl font-bold mb-4 xl:mb-8">Bubble Sort</h2>
        <p className='text-lg font-medium mb-4 xl:mb-8'>
          Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass-through is repeated until no swaps are needed, which indicates that the list is sorted. It is named Bubble Sort because smaller elements "bubble" to the top of the list during each pass.
        </p>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {`
function bubbleSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

// Usage example:
const myArray = [5, 3, 8, 1, 2];
const sortedArray = bubbleSort(myArray);
console.log(sortedArray); // Output: [1, 2, 3, 5, 8]
          `}
        </SyntaxHighlighter>
      </div>
      {/* Your existing sorting visualizer components */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
        {/* Array container */}
        <div className="flex flex-wrap gap-2">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`BS-box BS-custom ${idx === compareIndices.first || idx === compareIndices.second ? 'BS-highlighted' : sortedIndices.includes(idx) ? 'BS-sorted' : ''}`}
              style={{
                transition: 'transform 0.3s ease-in-out', // Add transition for smooth animation
                transform: idx === swapIndices.index1 ? 'translateX(32px) scale(1.2)' : idx === swapIndices.index2 ? 'translateX(-32px) scale(1.2)' : 'none',
              }}
            >
              {value}
            </div>
          ))}
        </div>

        {/* Buttons and speed control */}
        <div className="flex gap-4">
          <button className="btn px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={generateArray}>
            Generate New Array
          </button>
          <button className="btn px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={bubbleSort}>
            Bubble Sort
          </button>
        </div>
          <div className='flex justify-center items-center'>
            <label htmlFor="speedInput" className="text-lg mr-2">
              Speed:
            </label>
            <input
              type="range"
              id="speedInput"
              name="speedInput"
              min="250"
              max="750"
              value={speed}
              onChange={handleSpeedChange}
              className="range-input mr-2"
            />
            <span className="text-lg">{speed} ms</span>
          </div>
      </div>

      {/* Iteration count display */}
      <div className="text-lg font-semibold">Iteration Count: {iterationCount}</div>
    </div>
  );
}

export default BubbleSort;
