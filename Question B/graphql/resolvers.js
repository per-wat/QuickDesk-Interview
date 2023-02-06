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

  //Empty out the queue
  resetQueue() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

const { Counters, Tickets } = require("../models");
const { PubSub } = require('graphql-subscriptions');

const queue = new Queue();
const pubsub = new PubSub();

populateQueue = async () => {
  const ticketData = await Tickets.findOne();
  if(ticketData.ticketNumbers) {
    queue.resetQueue();
    ticketData.ticketNumbers.forEach(ticket => queue.enqueue(ticket));
  }
}

populateQueue();

// A map of functions which return data for the schema.
module.exports = {
    Query: {
      ticketNumbers: async () => {
        populateQueue();
        return queue.getQueue();
      },
      nowServing: async () => {
        const ticketData = await Tickets.findOne();
        return ticketData.nowServing;
      },
      lastIssuedTicket: async () => {
        const ticketData = await Tickets.findOne();
        return ticketData.lastIssuedTicket;
      },
      counter: (_, { id }) => Counters.findByPk(id),
      counters: () => Counters.findAll()
    },
    
    Mutation: {
      addTicket: async (_, args) => {
        const ticketData = await Tickets.findOne();
        ticketData.lastIssuedTicket += 1;
        pubsub.publish('LAST_ISSUED_UPDATED', {updateLastIssued: ticketData.lastIssuedTicket});
        ticketData.ticketNumbers = queue.enqueue(ticketData.lastIssuedTicket);
        await ticketData.save();
        return ticketData.lastIssuedTicket;
      },
      setCounterStatus: async (_, { id, status }) => {
        try {
          const counter = await Counters.findOne({ where: { id } });
          if (!counter) {
            return new Error(`Counter with id ${id} not found.`);
          }
          await counter.update({ status });
          pubsub.publish('COUNTER_UPDATED', {updateCounter: counter});
          return counter;
        } catch (error) {
          console.error(error);
          return new Error("An error occurred while updating the counter status.");
        }
      },
      setCurrentTicket:  async (_, { id }) => {
        try {
          const counter = await Counters.findOne({ where: { id } });
          if (!counter) {
            return new Error(`Counter with id ${id} not found.`);
          }
          const ticket = queue.dequeue();
          if(ticket) {
            const ticketData = await Tickets.findOne();
            await counter.update({ status:"Serving", currentTicket: ticket });
            ticketData.nowServing = ticket;
            ticketData.ticketNumbers = queue.getQueue();
            await ticketData.save();
            pubsub.publish('NOW_SERVE_UPDATED', {updateNowServing: ticketData.nowServing});
            pubsub.publish('COUNTER_UPDATED', {updateCounter: counter});
            return counter;
          } else {
            counter.currentTicket = null;
            return new Error('No tickets in the waiting queue')
          }
        } catch (error) {
          console.error(error);
          return new Error("An error occurred while updating the counter status.");
        }
      }
    },

    Subscription: {
      updateCounter: {
        subscribe: () => pubsub.asyncIterator(['COUNTER_UPDATED'])
      },
      updateNowServing: {
        subscribe: () => pubsub.asyncIterator(['NOW_SERVE_UPDATED'])
      },
      updateLastIssued: {
        subscribe: () => pubsub.asyncIterator(['LAST_ISSUED_UPDATED'])
      },
    }
  };