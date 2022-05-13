// heap is a complete binary tree
// each heap node has max two children
// 2 types of heaps: max and min
// meaning of max heap:
// - the root is the largest element
// - the children of a node are smaller or equal than the node
// meaning of min heap:
// - the root is the smallest element
// - the children of a node are greater or equal than the node
// commonly used in sorting algorithms, priority queues
// array is used to implement heap

class Heap {
  // firs element is null, so the second would be root and start with index 1, to make script, calculations easier
  heap = [null];

  // constant helpers to get parent node of child and children nodes
  getParent = (index) => Math.floor(index / 2);
  getLeftChild = (index) => 2 * index;
  getRightChild = (index) => 2 * index + 1;

  // inserting element to the heap
  insert(value) {}

  // removing element from the heap and returning it
  remove() {}

  // sorting heap is same for min and max heaps,
  // it will remove elements from the top, push them to the output array
  // until array length is 1
  // its overall complexity is O(n * log(n))
  sort() {
    const { heap } = this;
    const sorted = [];
    while (heap.length > 1) {
      sorted.push(this.remove());
    }

    return sorted;
  }
}

class MinHeap extends Heap {
  insert(num) {
    const { heap, getParent } = this;
    // adding element to the end of the array
    heap.push(num);
    // if its the root node - job is done
    if (heap.length < 2) return;

    // we need the index of the last node, to run through the heap and replace child with parent until
    // element is in the right place (current element is smaller its parent) or we reached the root
    let index = heap.length - 1;
    while (heap[index] < heap[getParent(index)]) {
      // use es6 syntax to swap values, we are swapping the current node with the parent
      [heap[index], heap[getParent(index)]] = [
        heap[getParent(index)],
        heap[index],
      ];

      // reassign index to the parent node
      index = getParent(index);
    }
  }

  remove() {
    const { heap, getLeftChild, getRightChild } = this;

    // if heap is empty - return null
    if (heap.length < 1) return null;

    // smallest element is of course always the first element (root node)
    const smallest = heap[1];
    // now we need to pop last node, and replace it with the first node
    heap[1] = heap[heap.length - 1];
    heap.splice(heap.length - 1);

    // if heap length is 3(null included) and root node is smaller then child - we are replacing them
    // omitting this condition will cause infinite loop
    // because script will try to replace right child with root, when right child is undefined
    if (heap.length == 3 && heap[1] > heap[2]) {
      [heap[1], heap[2]] = [heap[2], heap[1]];

      return smallest;
    }

    // start the magic
    // initialize index, and the children nodes to the index (parent node)
    let index = 1;
    let leftChild = getLeftChild(index);
    let rightChild = getRightChild(index);

    // while root node is bigger then one of the children we will run the loop
    while (heap[index] > heap[leftChild] || heap[index] > heap[rightChild]) {
      // if left child is smaller then right child, we will swap the parent with the left child formula
      // and increment index to the left child
      if (heap[leftChild] < heap[rightChild]) {
        [heap[index], heap[leftChild]] = [heap[leftChild], heap[index]];
        index *= 2;
      } else {
        // otherwise we swap right child with the parent and increment index to the right child formula
        [heap[index], heap[rightChild]] = [heap[rightChild], heap[index]];
        index = index * 2 + 1;
      }

      // recalculate children nodes due to index change
      leftChild = getLeftChild(index);
      rightChild = getRightChild(index);

      // another loop exit condition, if one of the children is undefined, which will mean that length of the heap
      // is 3 (null included) and we have if condition above for this case
      if (heap[leftChild] === undefined || heap[rightChild] === undefined)
        break;
    }

    // we are done with the swapping, returning smallest element (initial root node)
    return smallest;
  }
}

// max heap implementation is very similar to min heap, only difference is that
// max value is root node, with smaller or equal value children nodes,
// so methods changed accordingly
class MaxHeap extends Heap {
  insert(num) {
    const { heap, getParent } = this;
    heap.push(num);
    if (heap.length < 2) return;

    let index = heap.length - 1;
    while (heap[index] > heap[getParent(index)]) {
      if (index < 2) break;
      [heap[index], heap[getParent(index)]] = [
        heap[getParent(index)],
        heap[index],
      ];
      index = getParent(index);
    }
  }

  remove() {
    const { heap, getLeftChild, getRightChild } = this;

    if (heap.length < 1) return null;

    const biggest = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.splice(heap.length - 1);

    if (heap.length == 3) {
      if (heap[1] < heap[2]) {
        [heap[1], heap[2]] = [heap[2], heap[1]];
      }
      return biggest;
    }

    let index = 1;
    let leftChild = getLeftChild(index);
    let rightChild = getRightChild(index);
    while (heap[index] <= heap[leftChild] || heap[index] <= heap[rightChild]) {
      if (heap[leftChild] > heap[rightChild]) {
        [heap[index], heap[leftChild]] = [heap[leftChild], heap[index]];
        index = 2 * index;
      } else {
        [heap[index], heap[rightChild]] = [heap[rightChild], heap[index]];
        index = 2 * index + 1;
      }
      leftChild = 2 * index;
      rightChild = 2 * index + 1;
      if (heap[leftChild] == undefined || heap[rightChild] == undefined) {
        break;
      }
    }

    return biggest;
  }
}
