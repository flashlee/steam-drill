const express = require('express');
const apollo = require('apollo-server-express');
const bodyParser = require('body-parser');


const schema = require('./schema');
const connectMongo = require('./mongo-connector');

const startApp = async () => {
  const PORT = 3000; //to do: read it from args and node.env
  
  const mongo = await connectMongo();
  var app = express();

  app.use('/steamgraph',bodyParser.json(), apollo.graphqlExpress({
      context: {mongo},
      schema
  }));

  app.use('/graphiql', apollo.graphiqlExpress({
      endpointURL: '/steamgraph'
  }));

  app.listen(PORT,() => {
      console.log(`Server is running on ${PORT}`);
  })
};

startApp();
