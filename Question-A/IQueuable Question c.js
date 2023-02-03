//We can improve the previous code by using inheritance

//Initialize Node class
class Node {
    constructor(value, next=null) {
        this.value = value;
        this.next = next;
    }
}

//After that we can intialize Queue class
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //Add value to the queue and returns the new queue
    enqueue(value) {
        const node = new Node(value);

        if (this.tail) {
            this.tail.next = node;
        }

        this.tail = node;

        if (!this.head) {
            this.head = node;
        }

        this.length++;
        return this.getQueue();
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

    //Returns the list of items in the queue by converting into array
    getQueue() {
        const list = [];
        let current = this.head;
        while(current) {
            list.push(current.value);
            current = current.next;
        }
        return list;
    }

    //Return the size of the queue
    getSize() {
        return this.length;
    }
}

//Then we can initialize Stack
//Since most of the method is the same except enqueue
//We can inherit from Queue
class Stack extends Queue {
    enqueue(value) {
        this.head = new Node(value, this.head);

        if(!this.tail) {
            this.tail = this.head;
        }

        this.length++;
        return this.getQueue();
    }
}

//Using this implementation, any other queue classes can be added in the future without adjusting the existing classes.