// The GraphQL schema
module.exports = `#graphql
  type Counter {
    id: ID!
    status: String!
    currentTicket: Int
  }

  type Query {
    ticketNumbers: [Int]
    nowServing: Int
    lastIssuedTicket: Int
    counter(id: ID!): Counter
    counters: [Counter]
  }

  type Mutation {
    addTicket: Int
    setCounterStatus(id: ID!, status: String!): Counter!
    setCurrentTicket(id: ID!): Counter!
  }
`;