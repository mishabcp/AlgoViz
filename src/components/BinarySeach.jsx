import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [searchIndex, setSearchIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('');
  const [speed, setSpeed] = useState(1500); // Initial speed value (in milliseconds)

  const generateNewArray = () => {
    const sortedArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
    setArray(sortedArray);
    setSearchIndex(-1);
    setInputValue('');
    setMessage('');
  };

  const binarySearch = () => {
    if (!inputValue) {
      setMessage('Please enter a target number.');
      return;
    }

    setTarget(inputValue);
    setMessage('');
    setSearching(true);
    let start = 0;
    let end = array.length - 1;
    let index = -1;

    const searchLoop = async () => {
      while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        setSearchIndex(mid);

        if (array[mid] === parseInt(inputValue, 10)) {
          setMessage(`Found target element ${inputValue} at index ${mid}.`);
          await new Promise((resolve) => setTimeout(resolve, speed)); // Use the speed value for delay
          index = mid;
          break;
        } else if (array[mid] < parseInt(inputValue, 10)) {
          setMessage(`Target ${inputValue} > ${array[mid]}. Moving to the right half..`);
          await new Promise((resolve) => setTimeout(resolve, speed)); // Use the speed value for delay
          start = mid + 1;
        } else {
          setMessage(`Target ${inputValue} < ${array[mid]}. Moving to the left half..`);
          await new Promise((resolve) => setTimeout(resolve, speed)); // Use the speed value for delay
          end = mid - 1;
        }
      }

      setSearchIndex(index);
      setSearching(false);

      if (index !== -1) {
      } else {
        setMessage(`Element ${inputValue} not found.`);
        await new Promise((resolve) => setTimeout(resolve, speed)); // Use the speed value for delay
      }
    };

    searchLoop();
  };

  useEffect(() => {
    window.onload = generateNewArray;
  }, []);

  return (
    <div className="container mx-auto w-4/5 2xl:w-3/5 mb-6">
      <h1 className="text-3xl font-bold mb-4 xl:mb-8">Binary Search</h1>
      <p className="mb-4 xl:mb-8 text-lg font-medium">Binary search is a more efficient searching algorithm for sorted arrays. It works by repeatedly dividing the search interval in half. This visualization demonstrates how binary search works on a randomly generated sorted array.</p>
      <SyntaxHighlighter language="javascript" style={dracula} className="mb-4">
        {`function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}`}
      </SyntaxHighlighter>
      <div className="flex justify-center gap-2 mb-8 mt-6 xl:mt-10 flex-wrap">
        {array.map((num, index) => (
          <div key={index} className={`flex flex-col items-center`}>
            <div className={`text-xs mb-1`}>{index}</div>
            <div
              className={`w-16 h-16 flex items-center justify-center border border-gray-300 rounded bg-blue-500 text-white transform transition-transform duration-300 ${
                searchIndex === index ? 'bg-yellow-500 scale-110' : ''
              }`}
            >
              {num}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mb-6">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter target number"
          className="w-32 px-2 py-1 border border-gray-300 rounded mr-2"
        />
        <button onClick={binarySearch} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div className='lg:flex lg:justify-center lg:items-center'>
        <div className='flex justify-center items-center mb-4 lg:mb-0 lg:mr-2 xl'>
            <span className='mr-2'>speed: </span>
            <input
            type="range"
            min="500"
            max="3000"
            step="500"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="mr-2"
            />
            <span className="mr-2">{speed} ms</span>
        </div>
        <div className="flex justify-center"> {/* Added this div */}
            <button onClick={generateNewArray} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Generate New Array
            </button>
        </div> 
      </div>
      {message && <div className="text-center text-xl font-bold">{message}</div>}
    </div>
  );
};

export default BinarySearch;
