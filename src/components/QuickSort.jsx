import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

function QuickSortVisualization() {
  const [randomArray, setRandomArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [delay, setDelay] = useState(2000);
  const stepsEndRef = useRef(null);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
    setRandomArray(newArray);
    setSteps([]);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  const quickSort = () => {
    const newArray = [...randomArray];
    const stepsArray = [];
    const lastElement = newArray[newArray.length - 1];

    stepsArray.push({
      arr: [...newArray],
      label: `partition around pivot ${lastElement} ( elements < ${lastElement} - leftside & elements > ${lastElement} - rightside )`,
    });

    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      stepsArray.push({
        arr: [...arr],
        label: `Partition Around Pivot (${arr[high]}) ( elements < ${arr[high]} - leftside & elements > ${arr[high]} - rightside )`,
      });
      return i + 1;
    };

    const quickSortHelper = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        quickSortHelper(arr, low, pi - 1);
        quickSortHelper(arr, pi + 1, high);
      }
    };

    quickSortHelper(newArray, 0, newArray.length - 1);
    stepsArray.push({ arr: [...newArray], label: 'array sorted..' });

    let delayTime = 0;
    stepsArray.forEach((step, index) => {
      setTimeout(() => {
        setSteps((prevSteps) => [...prevSteps, step]);
      }, delayTime);
      delayTime += delay; // Increase delay for each step
    });
  };

  const renderBox = (value) => (
    <div className="bg-blue-500 text-white font-bold border border-blue-500 rounded-md w-16 h-16 flex items-center justify-center m-1 text-lg">
      {value}
    </div>
  );

  return (
    <div className="container mx-auto w-4/5 2xl:w-3/5 mb-6">
      <h1 className="text-3xl mb-4 xl:mb-8 font-bold">Quick Sort</h1>
      <p className="mb-4 xl:mb-8 text-lg font-medium">
        Quick Sort is a sorting algorithm that uses a divide-and-conquer strategy to sort an array.
        It works by selecting a pivot element and partitioning the array into two subarrays - one with elements less than the pivot
        and the other with elements greater than the pivot. This process is recursively applied to the subarrays until the entire array is sorted.
      </p>
      {/* Display the Quick Sort algorithm code */}
      <SyntaxHighlighter language="javascript" style={dracula} className="mb-4">
        {`
// Function to perform Quick Sort
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

// Example usage
const arrayToSort = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const sortedArray = quickSort(arrayToSort);
console.log(sortedArray); // Output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
        `}
      </SyntaxHighlighter>
      <div className="flex flex-wrap mb-6 mt-6 xl:mt-10 justify-center">
        {randomArray.map((num, index) => (
          <div key={index}>{renderBox(num)}</div>
        ))}
      </div>
      <div className='flex items-center justify-center mb-10'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={generateRandomArray}>
          Generate New Array
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={quickSort}>
          Quick Sort
        </button>
      </div>
      <div className="flex flex-col justify-center mt-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-wrap justify-center mb-0">
            {step.arr.map((num, innerIndex) => (
              <div
                key={innerIndex}
                className="bg-yellow-300 text-black font-bold border border-yellow-300 rounded-md w-16 h-16 flex items-center justify-center text-lg mr-2 "
              >
                {num}
              </div>
            ))}
            <div className="font-bold text-center" style={{ width: '100%' }}>{step.label}</div>
            {index !== steps.length - 1 && ( // Check if it's not the last step
              <div className="text-center mt-2 mb-2" style={{ width: '100%' }}>▼</div> // Arrow pointing down
            )}
          </div>
        ))}
        <div ref={stepsEndRef}>  </div> {/* Empty div to act as reference point for scrolling */}
      </div>
    </div>
  );
}

export default QuickSortVisualization;
