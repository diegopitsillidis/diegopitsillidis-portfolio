// src/algorithms/bubbleSort.test.ts
import { bubbleSortGenerator, SortStep } from '../../algorithms/bubbleSortGenerator';

describe('bubbleSortGenerator', () => {
  test('sorts an empty array', () => {
    const steps = Array.from(bubbleSortGenerator([])) as SortStep[];
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual([]);
  });

  test('sorts an already sorted array', () => {
    const steps = Array.from(bubbleSortGenerator([1, 2, 3])) as SortStep[];
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual([1, 2, 3]);
  });

  test('sorts a reverse-sorted array', () => {
    const steps = Array.from(bubbleSortGenerator([5, 4, 3, 2, 1])) as SortStep[];
    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual([1, 2, 3, 4, 5]);
  });
});
