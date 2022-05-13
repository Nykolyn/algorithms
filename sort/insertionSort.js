// insertion sort is good for partially sorted arrays
// its performance differs
// worst case performance: O(n^2)
// best case performance: O(n)
// average case performance: O(n^2)
// it goes through an array and compares each element to the one before it

const insertionSort = (array) => {
  const cArray = [...array];
  const { length } = cArray;

  for (let i = 1; i < length; i += 1) {
    // get previous index
    let j = i - 1;
    // save current element
    const current = cArray[i];

    // while previous index is iterable and previous element is greater than current
    // we will replace the previous element with the current one
    // and move the previous index to the left
    // so on until it reaches initial index
    while (j >= 0 && cArray[j] > current) {
      cArray[j + 1] = cArray[j];
      j -= 1;
    }

    cArray[j + 1] = current;
  }

  return cArray;
};
