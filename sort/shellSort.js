// shell sort is a better version of the insertion sort
// it is a good choice for partially sorted, small arrays
// its performance is much higher then insertion sort
// best case performance: O(n * log(n))
// average O(n * log(n))
// worst case O(n^2)
// it picks a sequence of gaps, sorts them, and reduces interval by each iteration

const shellSort = (a) => {
  const length = a.length;
  // initialize gap
  let gap = 1;
  // set gap to third part of the array
  while (gap < length / 3) gap = parseInt(3 * gap + 1);
  while (gap >= 1) {
    // start loop from gap position
    for (let i = gap; i < length; i += 1) {
      // start second loop from current index and compare elements to the left by reducing iteration by gap value
      // if current element is smaller than previous one, swap them
      for (let j = i; j >= gap && a[j] - (a[j - gap] ?? 0) < 0; j -= gap) {
        const temp = a[j];
        a[j] = a[j - gap];
        a[j - gap] = temp;
      }
    }
    // reinitialize gap
    gap = parseInt(gap / 3);
  }

  return a;
};

console.log(
  shellSort([3, 5, 2, 6, 23, 67, 8, 34, 7856, 78, 34, 235, 345, 67, 87])
);
