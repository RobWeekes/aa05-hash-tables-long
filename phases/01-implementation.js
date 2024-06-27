class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

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
        while(currentPair && currentPair.key !== key) {   // check for KEY matches, stop if it finds one, or it reaches the end
            currentPair = currentPair.next;   // steps thru until it matches a key, or reaches the end/tail
        }
        if(currentPair) {   // if we have a matching key, line 42 executes. If we reach the tail, it does not execute because 'currentPair' will be set to 'null', (currentPair.next of the tail line 39)
            currentPair.value = value;  // OVERWRITE -- if not at the tail, change the value of the node that matched the input 'key'
        } else {    // if we found no matches, 'else' block happens bcuz there were no key matches along the way \/
            const newPair = new KeyValuePair(key, value);   // if there were no key matches in the linked list, assign the newPair as the head node \/
            // assign newPair as the head
            if(!this.data[index]) {   // NO COLLISION condition, empty bucket -- insert new pair at the empty index
                this.data[index] = newPair;   // EMPTY BUCKET -> insert the new pair as is
            } else {
                newPair.next = this.data[index]; // ->  ->  ->  COLLISION condition -- insert new pair and assign new pair's 'next' attribute to the old pair 'this.data[index]'
                this.data[index] = newPair;       
            }   // 'this.data[index]' is the bucket. Set the new pair as the bucket's value, and point to the previous pair if one already existed, using 'newPair.next = this.data[index];'
            this.count++;
        }
        }

    read(key) {

    }


    resize() {

    }


    delete(key) {

    }
}


module.exports = HashTable;
