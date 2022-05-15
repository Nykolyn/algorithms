// example of a tree
// tree is a data structure that can be used to store data in a hierarchical structure.
// it has 0(empty) or 1 root node, with 0 to n children nodes.
// tree examples (DOM, CSSOM, folder structure, etc)
// all nodes are connected by links called edges
// nodes without children called leaf nodes
// the height of a tree is the length of the longest path to a leaf.
// the depth of a node is the length of the path to its root.

// define node structure, can be anything
class Node {
  // references to child nodes
  children = [];

  constructor(data) {
    this.data = data;
  }
}

class Tree {
  // define root node, which is initially null
  root = null;

  // to add a node we accept new node data and a reference to the parent node to add it as child
  add(data, toNodeData) {
    const node = new Node(data);

    const parent = this.findBFS(toNodeData) ? this.findBFS(toNodeData) : null;
    // if parent is found, simply push the node to its children list
    if (parent) {
      parent.children.push(node);
      return;
    }

    // if there is no root node(tree is empty) - set root node
    if (!this.root) {
      this.root = node;
      return;
    }

    // we were trying to replace root node
    throw "Root node already exists";
  }

  // finds node
  findBFS(node) {
    let _node = null;
    this.traverse((el) => {
      if (el?.data === node) {
        _node = el;
      }
    });

    return _node;
  }

  // goes through each nodes in the tree starting from the root
  traverse(cb) {
    if (!this.root) return null;
    // initialize queue with root node
    const queue = [this.root];
    while (queue.length) {
      // get the first node in the queue
      const node = queue.shift();
      // output node
      cb(node);
      // enqueue children nodes
      node?.children.forEach((child) => queue.push(child));
    }
  }
}

const tree = new Tree();
tree.add("root");
tree.add("1", "root");
tree.add("2", "root");
tree.add("3", "root");
tree.add("4", "1");
tree.add("5", "2");
tree.add("6", "3");
console.log(tree);
tree.traverse((el) => console.log(el));
