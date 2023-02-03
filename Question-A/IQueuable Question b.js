//2 Class implementing IQueuable Interface using linked list instead of arrays
//Still return the linked list by converting it into array

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //Add value to the queue and returns the new queue
    enqueue(value) {
        const node = {
            value,
            next: null,
        };

        if (this.tail) {
            this.tail.next = node;
        }

        this.tail = node;

        if (!this.head) {
            this.head = node;
        }

        this.length++;
        return this.toArray();
    }

    //Remove the first value in queue and returns it
    dequeue() {
       if (!this.head) {
        return null;
       }

       const value = this.head.value;
       this.head = this.head.next;
       this.length--;

       if (!this.head) {
        this.tail = null;
       }

       return value;
    }

    //Returns the list of items in the queue
    getQueue() {
        return this.toArray();
    }

    //Return the size of the queue
    getSize() {
        return this.length;
    }

    //Convert the linked list into array
    toArray() {
        const list = [];
        let current = this.head;
        while(current) {
            list.push(current.value);
            current = current.next;
        }
        return list;
    }
}

class Stack {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //Add value to the queue and returns the new queue
    enqueue(value) {
        const node = {
            value,
            next: this.head,
        };

        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }

        this.length++;
        return this.toArray();
    }

    //Remove the last value in queue and returns it
    dequeue() {
        if (!this.head) {
            return null;
        }
    
        const value = this.head.value;
        this.head = this.head.next;
        this.length--;
    
        if (!this.head) {
            this.tail = null;
        }
    
        return value;
    }

    //Returns the list of items in the queue
    getQueue() {
        return this.toArray();
    }

    //Return the size of the queue
    getSize() {
        return this.length;
    }

    //Convert the linked list into array
    toArray() {
        const list = [];
        let current = this.head;
        while (current) {
            list.push(current.value);
            current = current.next;
        }
        return list;
    }
}