export interface SortStep {
  array: number[];
  swappedIndices: [number, number] | null;
}
  
export function* insertionSortGenerator(arr: number[]): Generator<SortStep> {
  const result = [...arr];
  yield { array: [...result], swappedIndices: null };


  for (let i = 1; i < result.length; i++) {
    let j = i;
    while (j > 0 && result[j] < result[j-1]) {
      [result[j], result[j - 1]] = [result[j - 1], result[j]];
      j--;

      yield {
        array: [...result],
        swappedIndices: [j-1, j],
      };
    }
  }

  yield {
    array: [...result],
    swappedIndices: null,
  };
}
  