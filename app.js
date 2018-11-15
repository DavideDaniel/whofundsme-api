const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { Prisma } = require('prisma-binding');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = importSchema(path.resolve('./schema.graphql'));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'generated/schema/prisma.graphql',
      endpoint: process.env.PRISMA_URL,
    }),
  }),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// const app = express();
// const config = require('./config/config.js');

// config(app, express);

// app.listen(3000);
// console.log('server listening on port: 3000');

// process.on('unhandledRejection', (err) => {
//   console.error(err.stack);
// });
