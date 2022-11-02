// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// Local module imports
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Run our server on a port specified in our .env file or on port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

// Connect DB
db.connect(DB_HOST);

// Configuring Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  }
});

// Apply the Apollo GraphQL middleware and specify the path to /api
server.applyMiddleware({ app, path: '/api' });

//app.get('/', (req, res) => res.send('Hello Web Server!!!'));
//app.listen(4000, () => console.log('Listening on port 4000!'));

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
