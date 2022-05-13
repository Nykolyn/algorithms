// binary search for sorted array
// its complexity is O(log(n))
// reduces the size of research by half each iteration,
// until it reaches the element

const binarySearch = (key, array) => {
  // initialize start and end indexes
  let low = 0;
  let high = array.length;

  // while high point is greater then low means we have not reached the needed element
  while (low <= high) {
    // get mid index
    const mid = parseInt((low + high) / 2);
    // depending on the difference between key and mid element wi will pick right or left part of the arrays
    // or we have reached the needed element and return it
    if (key < array[mid]) {
      high = mid - 1;
    } else if (key > array[mid]) {
      low = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};
