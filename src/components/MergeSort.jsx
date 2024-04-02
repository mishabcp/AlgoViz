import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

function MergeSort() {
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


  const mergeSort = () => {
    const newArray = [...randomArray];
    const stepsArray = [];

    const displaySplittingInfo = () => {
      stepsArray.push({
        arr: [...newArray],
        label: `In the divide step of the merge sort algorithm, the original array is recursively split into smaller arrays or sublists until each sublist contains only one element. This process continues until you have "sublists" that are effectively individual elements, because a list with just one element is already considered sorted. Here's a step-by-step breakdown:`,
      });
      stepsArray.push({
        arr: [...newArray],
        label: `Divide it into two halves: [${newArray.slice(0, Math.floor(newArray.length / 2)).join(', ')}]    [${newArray.slice(Math.floor(newArray.length / 2)).join(', ')}]`,
      });
      stepsArray.push({
        arr: [...newArray],
        label: `Continue dividing recursively until each sublist has one element: [${newArray.join('] [')}]`,
      });
    };

    displaySplittingInfo();

    const merge = (arr, left, middle, right) => {
      const leftArray = arr.slice(left, middle + 1);
      const rightArray = arr.slice(middle + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;

      while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
          arr[k++] = leftArray[i++];
        } else {
          arr[k++] = rightArray[j++];
        }
      }

      while (i < leftArray.length) {
        arr[k++] = leftArray[i++];
      }

      while (j < rightArray.length) {
        arr[k++] = rightArray[j++];
      }

      stepsArray.push({
        arr: [...arr],
        label: `Merge: [${leftArray.join(', ')}] and [${rightArray.join(', ')}] into [${arr.slice(left, right + 1).join(', ')}]`,
      });
    };

    const split = (arr, left, right) => {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        split(arr, left, middle);
        split(arr, middle + 1, right);
        merge(arr, left, middle, right);
      }

    };

    split(newArray, 0, newArray.length - 1);
    stepsArray.push({ arr: [...newArray], label: 'Sorted Array' });

    let delayTime = 0;
    stepsArray.forEach((step, index) => {
      setTimeout(() => {
        setSteps((prevSteps) => [...prevSteps, step]);
      }, delayTime);
      delayTime += delay;
    });
  };

  const renderBox = (value) => (
    <div className="bg-blue-500 text-white font-bold border border-blue-500 rounded-md w-16 h-16 flex items-center justify-center mx-1 my-1 text-lg">
      {value}
    </div>
  );

  return (
    <div className="container mx-auto w-4/5 2xl:w-3/5 mb-6">
      <h1 className="text-3xl mb-4 xl:mb-8 font-bold">Merge Sort</h1>
      <p className="mb-4 xl:mb-8 text-lg font-medium">
        Merge Sort is a sorting algorithm that follows the divide-and-conquer strategy. It divides the array into two halves,
        sorts them individually, and then merges them to produce a sorted array.
      </p>
      <SyntaxHighlighter language="javascript" style={dracula} className="">
        {`
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const arr = [5, 3, 8, 6, 2, 7, 1, 4];
const sortedArray = mergeSort(arr);
console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8]
`}
      </SyntaxHighlighter>
      <div className="flex flex-wrap mb-6 mt-6 xl:mt-10 justify-center">
        {randomArray.map((num, index) => (
          <div key={index}>{renderBox(num)}</div>
        ))}
      </div>
      <div className="flex items-center justify-center mb-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={generateRandomArray}
        >
          Generate New Array
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={mergeSort}
        >
          Merge Sort
        </button>
      </div>
      <div className="flex flex-col justify-center mt-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-wrap justify-center mb-0">
            <div className="font-bold text-center mb-2" style={{ width: '100%' }}>
              {step.label}
            </div>
            {step.arr.map((num, innerIndex) => (
              <div
                key={innerIndex}
                className="bg-yellow-300 text-black font-bold border border-yellow-300 rounded-md w-16 h-16 flex items-center justify-center text-lg mr-2 "
              >
                {num}
              </div>
            ))}
            {index !== steps.length - 1 && (
              <div className="text-center mt-2 mb-2" style={{ width: '100%' }}>
                ▼
              </div>
            )}
          </div>
        ))}
        <div ref={stepsEndRef}> </div>
      </div>
    </div>
  );
}

export default MergeSort;
