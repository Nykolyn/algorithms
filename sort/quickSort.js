// better and simpler sorting method then merge sort
// also is using Command and Conquer paradigm ( split big problem into smaller ones )
// its complexity is O(n * log(n)) in most cases
// tho it may get tricky when array is already sorted,
// then complexity will be O(n^2)
// the difference is that merge sort divides array into two halves,
// and quicksort picks a pivot element and puts it in the middle of the array,
// then pushing to the left smaller elements and to the right bigger ones
// it will go so on until array length is 1 and it recursively merge back sorted

const quickSort = (array) => {
  const cArray = [...array];

  // exit from recursion if array length is 1
  if (cArray.length === 1) {
    return cArray;
  }

  // pick the pivot, the last element of the array
  // it may be any other element in array, last one is used more often
  const pivot = cArray.pop();

  // using modern syntax to reduce code and make it look more declarative
  // we will create 2 arrays, and push elements to the left and right arrays depending on pivot comparison
  const [leftArr, rightArr] = cArray.reduce(
    ([leftArr, rightArr], cur) => {
      cur > pivot ? rightArr.push(cur) : leftArr.push(cur);
      return [leftArr, rightArr];
    },
    [[], []]
  );

  // recursively sort/merge both arrays back, put the pivot in the middle
  return [
    ...(leftArr.length > 0 ? quickSort(leftArr) : []),
    pivot,
    ...(rightArr.length > 0 ? quickSort(rightArr) : []),
  ];
};
