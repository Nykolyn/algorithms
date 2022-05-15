// binary search tree
// bts has all rules of base tree, binary tree and has additional:
// left child is less than its parent
// right child is greater than its parent
// perfect and average bts performance is O(log n)
// worst case performance is O(n)
// this structure is very good for storing hierarchical data that needs to be searched often

// node structure
class Node {
  left = null;
  right = null;

  constructor(data) {
    this.data = data;
  }
}

class BTS {
  // bts should have root node, which is initially null ( tree is empty )
  root = null;

  // add node to the tree
  add(data) {
    const node = new Node(data);
    // it tree is empty - set the root node
    if (!this.root) {
      this.root = node;
      return;
    }

    /** adding solution with infinite loop instead of recursion 
 * 
    let currentNode = this.root;
    while (true) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = node;
          return;
        }

        currentNode = currentNode.left;
      }

      if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = node;
          return;
        }

        currentNode = currentNode.right;
      }
    }
*/
    // recursively go through the thee until we find the right place to add the node
    const searchNode = (refNode) => {
      // data is less then our reference node data
      if (data <= refNode.data) {
        // if left node is null - we set new node to its place
        if (refNode.left === null) {
          refNode.left = node;
          return;
        }

        // ref node left child is not null - we will go recursively deeper until left child would be null to replace it
        return searchNode(refNode.left);
      }

      // same as above but for right child
      if (data >= refNode.data) {
        if (refNode.right === null) {
          refNode.right = node;
          return;
        }

        return searchNode(refNode.right);
      }

      return null;
    };

    // start the recursive search with the root node as first node ( always start with the root node )
    searchNode(this.root);
  }

  // remove action is complex in bts
  remove(data) {
    // removing the node is done recursively
    const removeNode = (node, data) => {
      // if node is null - we setting left or right child node reference to null, or simply node does not exists
      if (node === null) return null;

      // we found the node to remove
      if (node.data === data) {
        // node does not have children so we can easily exit function with setting parent left/right node reference to null
        if (node.left === null && node.right === null) {
          return null;
        }

        // node has only left child so we will replace parent with the left child
        if (node.left === null) {
          return node.right;
        }

        // replacing parent with the right child
        if (node.right === null) {
          return node.left;
        }

        // node has both left and right children so we need to find the smallest node in the right subtree
        // why right subtree? because otherwise rules of bts would be violated left child would be less than parent
        let tempNode = node.right;

        // we will go through the right subtree left children until we find its last left node
        while (tempNode.left) {
          // reinitialize temp node to the left child found
          tempNode = tempNode.left;
        }
        // our node data is now deepest right subtree left child node data
        node.data = tempNode.data;
        // now we need to rebuild right tree without the deepest right subtree left child node
        node.right = removeNode(node.right, tempNode.data);

        return node;
      }

      // node no found in current call, so we will go deeper

      // if data is less then current node data - we will go left
      // and set left node reference to the new node
      if (data <= node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }

      // otherwise we will go right
      node.right = removeNode(node.right, data);
      return node;
    };

    // start the recursive search
    this.root = removeNode(this.root, data);
  }

  // check if node is in the tree
  isPresent(data) {
    return Boolean(this.find(data));
  }

  // find the node, we will go through the bts tree to right or left child
  // by comparing the data with the current node data < or >
  find(data) {
    let current = this.root;
    while (current?.data !== data) {
      if (current === null) return null;

      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return current;
  }

  // go deep in the tree through left links and return the last node (it would be the smallest)
  findMin() {
    let current = this.root;

    while (current.left) {
      current = current.left;
    }

    return current?.data;
  }

  // go deep in the tree through right links and return the last node (it would be the biggest)
  findMax() {
    let current = this.root;

    while (current.right) {
      current = current.right;
    }

    return current?.data;
  }

  // traversal of the binary tree
  traversal(node = this.root) {
    if (node === null) return [];
    const result = [];

    // current implementation called in order traversal
    // meaning that we go [left, current, right]
    // to change it to other order - change the order of the  -  result.push(node.data);
    // result.push(node.data) first - pre order traversal
    // result.push(node.data); second - post order traversal
    if (node.left) result.push(...this.traversal(node.left));
    result.push(node.data);
    if (node.right) result.push(...this.traversal(node.right));
    return result;
  }

  // breadth first search means that we are focusing on every item on the same level
  // before moving to the next level
  BFS() {
    let current = this.root;
    const result = [];
    const queue = [];
    queue.push(current);
    while (queue.length) {
      const node = queue.shift();

      result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }
}

const bts = new BTS();
bts.add(10);
bts.add(5);
bts.add(12);
bts.add(4);
bts.add(6);
bts.add(1);
bts.remove(555);
console.log(bts);
console.log(bts.find(12));
console.log(bts.isPresent(12));
console.log(bts.traversal());
console.log(bts.BFS());
