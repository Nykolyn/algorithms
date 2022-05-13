// Selection sort
// has average performance O(n^2)
// its bad for partially sorted arrays, because it will anyway loop through the array again
// works by finding the smallest(or largest) element in the array and swapping it with the first element

const selectionSort = (array) => {
  const cArray = [...array];
  const { length } = cArray;

  for (let i = 0; i < length; i += 1) {
    let min = i;

    // find the smallest element in the array
    for (let j = i + 1; j < length; j += 1) {
      if (cArray[min] > cArray[j]) min = j;
    }

    // swap the smallest element with the first element
    const temp = cArray[i];
    cArray[i] = cArray[min];
    cArray[min] = temp;
  }

  return cArray;
};
