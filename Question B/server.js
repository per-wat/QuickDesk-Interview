const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { sequelize } = require("./models")

const resolvers = require('./graphql/resolvers.js');
const typeDefs = require('./graphql/typeDefs.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
  
  sequelize.authenticate()
    .then(() => console.log("Db connected!"))
    .catch((err) => console.log(err))
})