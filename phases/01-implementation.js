class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    const index = this.hashMod(key);
    // console.log(index);
    let currentPair = this.data[index];

    // check if there's already a value at the hashed index
    while (currentPair && currentPair.key !== key) {
      // check for KEY matches, stop if it finds one, or it reaches the end
      currentPair = currentPair.next; // steps thru until it matches a key, or reaches the end/tail
    }
    if (currentPair) {
      // if we have a matching key, line 42 executes. If we reach the tail, it does not execute because 'currentPair' will be set to 'null', (currentPair.next of the tail line 39)
      currentPair.value = value; // OVERWRITE -- if not at the tail, change the value of the node that matched the input 'key'
    } else {
      // if we found no matches, 'else' block happens bcuz there were no key matches along the way \/
      const newPair = new KeyValuePair(key, value); // if there were no key matches in the linked list, assign the newPair as the head node \/
      // assign newPair as the head
      if (!this.data[index]) {
        // NO COLLISION condition, empty bucket -- insert new pair at the empty index
        this.data[index] = newPair; // EMPTY BUCKET -> insert the new pair as is
      } else {
        newPair.next = this.data[index]; // ->  ->  ->  COLLISION condition -- insert new pair and assign new pair's 'next' attribute to the old pair 'this.data[index]'
        this.data[index] = newPair;
      } // 'this.data[index]' is the bucket. Set the new pair as the bucket's value, and point to the previous pair if one already existed, using 'newPair.next = this.data[index];'
      this.count++;
    }
  }

  read(key) {
    const index = this.hashMod(key);
    let currentPair = this.data[index];

    while (currentPair) {
      if (currentPair.key === key) {
        return currentPair.value;
      }
      currentPair = currentPair.next;
    }
    // while (currentPair && currentPair.key !== key) {
    //   currentPair = currentPair.next;
    // }        // DIDNT WORK
    // if (currentPair) {
    //   return currentPair.value;
    // }
    return undefined;
  }

  resize() {
    this.capacity *= 2;
    const copy = [...this.data];
    this.data = new Array(this.capacity);
    // for each (copy)
        // while loop (step thru nodes)
  }

  delete(key) {}
}

// local testing

// let hashTable = new HashTable(4);

// hashTable.insert("key1", "value1");
// hashTable.insert("key2", "value2");
// hashTable.insert("key3", "value3");

// console.log(hashTable.hashMod("key1"));
// console.log(hashTable.hashMod("key2"));
// console.log(hashTable.hashMod("key3"));

// console.log(hashTable.data[2].key) // "key1"
// console.log(hashTable.data[3].key) // "key2"
// console.log(hashTable.data[0].key) // "key3"

// console.log(hashTable.data[2].value) // "value1"
// console.log(hashTable.data[3].value) // "value2"
// console.log(hashTable.data[0].value) // "value3"

// hashTable = new HashTable(2);

// console.log(hashTable.capacity) // (2);

// hashTable.insert("key2", "value2");
// hashTable.insert("key4", "value4");

// console.log(hashTable.data[1].next.key) // ("key2")
// console.log(hashTable.data[1].key) // ("key4")

// console.log(hashTable.data[1].next.value) // ("value2")
// console.log(hashTable.data[1].value) // ("value4")

// hashTable = new HashTable(4);

// hashTable.insert("key1", "value1")
// hashTable.insert("key2", "value2")
// hashTable.insert("key3", "value3")

// console.log(hashTable.read("key1")) // "value1"
// console.log(hashTable.read("key2")) // "value2"
// console.log(hashTable.read("key3")) // "value3"

// // console.log(hashTable.read("key5")) // undefined

// hashTable = new HashTable(2);

// console.log(hashTable.capacity); // 2

// console.log(hashTable.hashMod("key1"));
// console.log(hashTable.hashMod("key2"));
// console.log(hashTable.hashMod("key3"));
// console.log(hashTable.hashMod("key5"));
// console.log(hashTable.hashMod("key9"));
// console.log(hashTable.hashMod("key10"));

// hashTable.insert("key1", "value1");
// hashTable.insert("key2", "value2");
// hashTable.insert("key3", "value3");
// hashTable.insert("key5", "value5");
// hashTable.insert("key9", "value9");
// hashTable.insert("key10", "value10");

// console.log(hashTable.read("key1")); // "value1";
// console.log(hashTable.read("key2")); // "value2";
// console.log(hashTable.read("key3")); // "value3";
// console.log(hashTable.read("key5")); // "value5";
// console.log(hashTable.read("key9")); // "value9";
// console.log(hashTable.read("key10")); // "value10";

// console.log(hashTable.read("key20")); // undefined

module.exports = HashTable;
