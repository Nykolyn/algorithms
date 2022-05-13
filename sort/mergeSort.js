// merge sort is applying Command and Conquer paradigm
// by recursively splitting larger problems (arrays) into smaller ones, until length of the array would be 1
// which means if array length is 1 it is already sorted
// then we will merge sorted arrays
// its complexity is O(n * log(n))
// works by recursively dividing big array into 2 halves,
// sorting them by pushing values to the new output array

const merge = (leftArr, rightArr) => {
  // result array
  const output = [];

  // starting point of both arrays
  let leftArrIndex = 0;
  let rightArrIndex = 0;

  // while both arrays have elements we will compare them and push values to the output array
  while (leftArrIndex < leftArr.length && rightArrIndex < rightArr.length) {
    if (leftArr[leftArrIndex] < rightArr[rightArrIndex]) {
      output.push(leftArr[leftArrIndex]);
      leftArrIndex += 1;
      continue;
    }

    output.push(rightArr[rightArrIndex]);
    rightArrIndex += 1;
  }

  // we are spreading both arrays here in case if some of them has elements left
  return [
    ...output,
    ...leftArr.slice(leftArrIndex),
    ...rightArr.slice(rightArrIndex),
  ];
};

const mergeSort = (array) => {
  // exit from recursion if array length is 1
  if (array.length <= 1) return array;

  // get middle index of arrays
  const middle = parseInt(array.length / 2);
  // get left and right arrays
  const firstArr = array.slice(0, middle);
  const secondArr = array.slice(middle);
  // recursively sort/merge both arrays back
  return merge(mergeSort(firstArr), mergeSort(secondArr));
};

console.log(mergeSort([1, 4, 2, 8, 345, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));
