export interface SortStep {
  array: number[];
  swappedIndices: [number, number] | null;
}
  
export function* selectionSortGenerator(arr: number[]): Generator<SortStep> {
  const result = [...arr];
  yield { array: [...result], swappedIndices: null };

  let currIdx = 0;
  while (currIdx < result.length -1) {
    let smallIdx = currIdx
    for (let i = currIdx+1; i < result.length; i++) {
      if(result[smallIdx] > result[i]) smallIdx = i;
      yield {
        array: [...result],
        swappedIndices: [currIdx, smallIdx],
      };
    }
    [result[currIdx], result[smallIdx]] = [result[smallIdx], result[currIdx]]
    yield {
      array: [...result],
      swappedIndices: [currIdx, smallIdx],
    };
    currIdx++;
  }

  yield {
    array: [...result],
    swappedIndices: null,
  };
}
  