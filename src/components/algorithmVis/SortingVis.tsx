import React, { useEffect, useRef, useState } from 'react';
import { bubbleSortGenerator, SortStep } from '../../algorithms/bubbleSortGenerator';
import { insertionSortGenerator } from '../../algorithms/insertionSortGenerator';
import { selectionSortGenerator } from '../../algorithms/selectionSortGenerator';

enum AlgorithmType {
    bubble = 'Bubble',
    insertion = 'Insertion',
    selection = 'Selection',
}

const SortingVis: React.FC = () => {
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>(AlgorithmType.bubble);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate steps based on the selected algorithm and a new random array
  const generateSteps = (alg: AlgorithmType) => {
    const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    let gen: Generator<SortStep>;
    switch (alg) {
        case AlgorithmType.bubble:
            gen = bubbleSortGenerator(arr);
            break;
        case AlgorithmType.insertion:
            gen = insertionSortGenerator(arr);
            break;
        case AlgorithmType.selection:
            gen = selectionSortGenerator(arr);
            break;
        default:
            throw new Error('Unknown algorithm type');
    }
    const allSteps: SortStep[] = [];
    for (const step of gen) {
      allSteps.push(step);
    }
    setSteps(allSteps);
    setCurrentIndex(0);
  };

  // When the selected algorithm changes, generate new steps
  useEffect(() => {
    generateSteps(algorithm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm]);

  function startAnimation() {
    if (timerRef.current) return; // Already running
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return prev;
        }
      });
    }, 50);
  }

  function pauseAnimation() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function resetAnimation() {
    pauseAnimation();
    setCurrentIndex(0);
  }

  const currentStep = steps[currentIndex] ?? { array: [], swappedIndices: null };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        {`${algorithm} Sort Visualization`}
      </h2>

      {/* Algorithm Selection */}
      <div className="mb-4">
        <label htmlFor="algorithm" className="mr-2 font-semibold">
          Choose Algorithm:
        </label>
        <select
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
          className="p-2 border rounded"
        >
          <option value={AlgorithmType.bubble}>Bubble Sort</option>
          <option value={AlgorithmType.insertion}>Insertion Sort</option>
          <option value={AlgorithmType.selection}>Selection Sort</option>
        </select>
      </div>

      {/* Vertical Bars Visualization */}
      <div className="flex items-end space-x-2 h-80 border p-2">
        {currentStep.array.map((value, idx) => {
          const isSwapped =
            currentStep.swappedIndices && currentStep.swappedIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`w-8 flex flex-col justify-end border ${
                isSwapped ? 'bg-red-300' : 'bg-blue-200'
              }`}
              style={{ height: `${value * 3}px` }} // Scale the height as needed
            >
              <span className="text-xs text-center">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-4 space-x-2">
        <button className="px-4 py-2 bg-green-500 text-white" onClick={startAnimation}>
          Start
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white" onClick={pauseAnimation}>
          Pause
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white" onClick={resetAnimation}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortingVis;
