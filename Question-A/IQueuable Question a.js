//2 Class implementing IQueuable Interface using array

class Queue {
    constructor() {
        this.queue = [];
    }

    //Add value to the queue and returns the new queue
    enqueue(value) {
        this.queue.push(value);
        return this.queue;
    }

    //Remove the first value in queue and returns it
    dequeue() {
        return this.queue.shift();
    }

    //Returns the list of items in the queue
    getQueue() {
        return this.queue;
    }

    //Return the size of the queue
    getSize() {
        return this.queue.length;
    }
}

class Stack {
    constructor() {
        this.queue = [];
    }

    //Add value to the queue and returns the new queue
    enqueue(value) {
        this.queue.push(value);
        return this.queue;
    }

    //Remove the last value in queue and returns it
    dequeue() {
        return this.queue.pop();
    }

    //Returns the list of items in the queue
    getQueue() {
        return this.queue;
    }

    //Return the size of the queue
    getSize() {
        return this.queue.length;
    }
}