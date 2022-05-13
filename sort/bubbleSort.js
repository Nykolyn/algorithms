// simplest sorting algorithm
// has worst performance O(n^2)
// works by comparing adjacent elements and swapping them if they are in the wrong order
// loops through the array for each element
// visually: [1, 5, 3, 2, 4] -> [1, 3, 2, 4, 5] -> [1, ,3, 2, 4] -> [1, 2, 3, 4]

const bubbleSort = (array) => {
  const cArray = [...array];
  for (let i = 0; i < cArray.length - 1; i += 1) {
    for (let j = 0; j < cArray.length - 1; j += 1) {
      if (cArray[j] > cArray[j + 1]) {
        [cArray[j], cArray[j + 1]] = [cArray[j + 1], cArray[j]];
      }
    }
  }

  return cArray;
};
