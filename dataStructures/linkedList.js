class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  head = null;
  length = 0;

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      this.length += 1;
      return;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = new Node(value);
    this.length += 1;
  }

  insertAtPosition(position, value) {
    if (position > this.length || position < 0) return;

    let node = new Node(value);

    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.length += 1;
      return;
    }

    let index = 0;
    let current = this.head;
    let prev = null;

    while (index < position) {
      prev = current;
      current = current.next;
      index += 1;
    }

    prev.next = node;
    node.next = current;
    this.length += 1;
  }

  getNodeByPosition(position) {
    let index = 0;
    let current = this.head;
    while (index < position) {
      current = current.next;
      index += 1;
    }

    return current.value;
  }

  removeFromPosition(position) {
    if (position === 0) {
      this.length -= 1;
      this.head = this.head.next;
    }

    let index = 0;
    let current = this.head;
    let prev = null;

    while (index < position) {
      prev = current;
      current = current.next;
      index += 1;
    }

    prev.next = current.next;
    this.length -= 1;
    return current.value;
  }

  getIndexOf(value) {
    let current = this.head;
    let index = 0;

    while (current.next) {
      if (current.value === value) return index;
      index += 1;
      current = current.next;
    }

    return -1;
  }

  removeByValue(value) {
    this.removeFromPosition(this.getIndexOf(value));
  }

  print() {
    let current = this.head;

    while (current) {
      current = current.next;
    }
  }

  static printExternal(node) {
    let current = node;

    while (current) {
      current = current.next;
    }
  }
}

const reverseList = (linkedList) => {
  let node = linkedList.head;
  let prev = null;

  while (node) {
    let tmp = node.next;
    node.next = prev;
    prev = node;
    node = tmp;
  }

  return prev;
};
