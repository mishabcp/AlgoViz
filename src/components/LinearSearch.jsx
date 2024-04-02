import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

const LinearSearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [searchIndex, setSearchIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('');
  const [compareIndex, setCompareIndex] = useState(-1);
  const [speed, setSpeed] = useState(1500); // Initial speed value (in milliseconds)

  const generateNewArray = () => {
    const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 99));
    setArray(newArray);
    setSearchIndex(-1);
    setInputValue('');
    setMessage('');
  };

  const linearSearch = () => {
    if (!inputValue) {
      setMessage('Please enter a target number.');
      return; 
    }
  
    setTarget(inputValue);
    setMessage('');
    setSearching(true);
    let index = -1;
  
    const searchLoop = async () => {
      for (let i = 0; i < array.length; i++) {
        setSearchIndex(i); // Highlight the current element being checked
  
        if (i >= 0) {
          setMessage(`Comparing ${inputValue} with ${array[i]}...`); // Update the message with the comparison happening
          await new Promise((resolve) => setTimeout(resolve, speed)); 
        }
        
        setCompareIndex(i); // Highlight the current element being compared
        if (array[i] === parseInt(inputValue, 10)) {
            index = i;
            break;
        }
        setCompareIndex(-1); // Remove highlight after comparison
    }
    setSearchIndex(index); // Highlight the found element or -1 if not found
    setSearching(false);
    if (index !== -1) {
        setMessage(`Element ${inputValue} found at index ${index}.`);
        await new Promise((resolve) => setTimeout(resolve, speed)); 
    } else {
        setMessage(`Element ${inputValue} not found.`);
        await new Promise((resolve) => setTimeout(resolve, speed)); 
      }
    };
  
    searchLoop();
  };
  
  useEffect(() => {
    generateNewArray(); // Call generateNewArray when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  
  return (
    <div className="container mx-auto w-4/5 2xl:w-3/5 mb-6">
      <h1 className="text-3xl font-bold mb-4 xl:mb-8">Linear Search</h1>
      <p className="mb-4 xl:mb-8 text-lg font-medium">Linear search is a searching algorithm that checks each element in a list sequentially until a match is found or the whole list has been searched. This visualization demonstrates how linear search works on a randomly generated array.</p>
      <SyntaxHighlighter language="javascript" style={dracula} className="mb-4">
        {`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index if target is found
    }
  }
  return -1; // Return -1 if target is not found
}`}
      </SyntaxHighlighter>
      <div className="flex justify-center gap-2 mb-4 mt-6 xl:mt-10 flex-wrap">
        {array.map((num, index) => (
          <div key={index} className={`flex flex-col items-center`}>
            <div className={`text-xs mb-1 `}>
                {index}
            </div>
            <div
                className={`w-16 h-16 flex items-center justify-center border border-gray-300 rounded bg-blue-500 text-white transform transition-transform duration-300 ${searchIndex === index ? 'bg-yellow-500 scale-110' : ''} ${compareIndex === index ? 'bg-green-500' : ''}`}
            >
                {num}
            </div>
        </div>
        
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 mb-6">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter target number"
          className="w-32 px-2 py-1 border border-gray-300 rounded mr-2"
        />
        <button onClick={linearSearch} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded" disabled={searching}>
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

export default LinearSearch;
