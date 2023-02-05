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

const { Counters } = require("../models");

const queue = new Queue();

// The ticket queue
let ticketNumbers = [];

// The current ticket being served
let nowServing = null;

// The last issued ticket
let lastIssuedTicket = 0;

// The counters
let counters;

const getDB = async () => {
  try {
    counters = await Counters.findAll();
  } catch (error) {
    console.log(error);
  }
}

getDB();


// A map of functions which return data for the schema.
module.exports = {
    Query: {
      ticketNumbers: () => queue.getQueue(),
      nowServing: () => nowServing,
      lastIssuedTicket: () => queue.getQueue()[queue.getSize() - 1],
      counter: (_, { id }) => counters.find(counter => counter.id === id),
      counters: () => counters
    },
    
    Mutation: {
      addTicket: (_, args) => {
        lastIssuedTicket += 1;
        queue.enqueue(lastIssuedTicket);
        return lastIssuedTicket;
      },
      setCounterStatus: (_, { id, status }) => {
        const counter = counters.find(counter => counter.id === id);
        if (!counter) {
          return new Error(`Counter with id ${id} not found.`);
        }
        counter.status = status;
        counter.currentTicket = null;
        return counter;
      },
      setCurrentTicket: (_, { id }) => {
        const counter = counters.find(counter => counter.id === id);
        const ticket = queue.dequeue();
        if(ticket) {
          counter.currentTicket = ticket;
          counter.status = "Serving"
          nowServing = ticket;
          return counter;
        } else {
          counter.currentTicket = null;
          return new Error('No tickets in the waiting queue')
        }
      }
    }
  };