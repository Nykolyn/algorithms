// hash table is a key-value pair data structure
// its performance should be O(1)
// to achieve this need to write a good hash function, that will ensure that it will pick diverse indexes
// also ensure that array size is enough for the incoming data
// otherwise its performance could be O(n), but in practice its still more performant then array

class HashTable {
  // initialize the hash table, pick a size, PRIME number preferably
  table = new Array(3);
  // needed to check array size compared to items added in order to resize it when needed
  numItems = 0;

  // example of hash function, it simply accepts key, parses it to index and returns it
  hashFunction(key, tableSize = this.table.length) {
    let hash = 8;

    const keyCode = key
      .split("")
      .reduce((acc, _, i) => acc + key.charCodeAt(i), 0);

    return (hash * keyCode) % tableSize;
  }

  // resize the hash table when needed
  handleResize() {}

  // add new item to the hash table
  setValue(key, value) {}

  // get item by key
  getValue(key) {}
}

// example of hash table with array as collision item
class HashTableArrayCollision extends HashTable {
  // resize the hash table
  // create new table, rebuild all items because table size changed and hash function output will be different
  handleResize() {
    // resize table only when load factor is less than 0.8, editable value
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor < 0.8) return;

    // create new table, twice larger than before
    const newTable = new Array(this.table.length * 2);

    // go through each items to rebuild them
    this.table.forEach((item) => {
      // item can be empty
      if (!item) return;

      // rebuild all items, collisions
      item.forEach(([key, value]) => {
        const index = this.hashFunction(key, newTable.length);
        if (newTable[index]) {
          newTable[index].push([key, value]);
          return;
        }
        newTable[index] = [[key, value]];
      });
    });
    // rewrite previous table with the new one
    this.table = newTable;
  }

  setValue(key, value) {
    const index = this.hashFunction(key);
    const collision = this.table[index];
    // no collision - initialize new item
    if (!collision) {
      this.table[index] = [[key, value]];
      this.numItems += 1;
      return;
    }
    // collision - push the item to the end of the collision list
    const hasKey = collision.find(([k]) => k === key);
    if (hasKey) return;

    this.numItems += 1;
    collision.push([key, value]);
    this.handleResize();
  }

  // simply find item by key
  // key => [[[key, value ]]] -> value
  getValue(key) {
    const index = this.hashFunction(key);

    if (!this.table[index]) {
      return null;
    }

    return this.table[index].find(([k]) => k === key)[1];
  }
}

// hash table using linked list
class HashTableLinkedListCollision extends HashTable {
  rebuildCollisionItems(linkedList, table) {
    let current = linkedList.head;
    while (current) {
      const { key, value } = current.value;

      const index = this.hashFunction(key, table.length);
      const collision = table[index] ? table[index] : new LinkedList();
      collision.append({ key, value });
      this.numItems += 1;
      table[index] = collision;

      current = current.next;
    }
  }

  handleResize() {
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor < 0.8) return;

    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (!item) return;
      this.rebuildCollisionItems(item, newTable);
    });
    this.table = newTable;
  }

  setValue(key, value) {
    const index = this.hashFunction(key);
    const collision = this.table[index];
    if (!collision) {
      const linkedList = new LinkedList();
      linkedList.append({ value, key });
      this.numItems += 1;
      this.table[index] = linkedList;
      return;
    }

    const hasKey = collision.getIndexOf(key) !== -1;
    if (hasKey) return;

    this.numItems += 1;
    collision.append({ value, key });
    this.handleResize();
  }

  getValue(key) {
    const index = this.hashFunction(key);
    console.log(this.table);
    if (!this.table[index]) {
      return null;
    }

    return this.table[index].getByKey(key);
  }
}
