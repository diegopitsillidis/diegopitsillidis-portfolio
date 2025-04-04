export interface SortStep {
    array: number[];
    swappedIndices: [number, number] | null;
  }
  
  export function* bubbleSortGenerator(arr: number[]): Generator<SortStep> {
    const result = [...arr];
    yield { array: [...result], swappedIndices: null };
  
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
          yield {
            array: [...result],
            swappedIndices: [j, j + 1],
          };
        } else {
          yield {
            array: [...result],
            swappedIndices: null,
          };
        }
      }
    }
  }
  