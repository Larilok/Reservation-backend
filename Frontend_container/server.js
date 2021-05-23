'use strict'
const { ApolloServer } = require('apollo-server-fastify')
const path = require('path')

const { resolvers, createSchema } = require('./gql/resolver')

const app = require('fastify')({ logger: true })

const server = new ApolloServer({
  schema: createSchema(),
  resolvers: resolvers
});

(async () => {
  await server.start()
  app.register(server.createHandler())
  app.register(require('fastify-static'), {
    root: path.join(__dirname, 'static'),
  })
  await app.listen(4240, '0.0.0.0')
})()
