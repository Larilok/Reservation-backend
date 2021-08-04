'use strict'
const cors = require('cors')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { bodyParserGraphQL } = require('body-parser-graphql')

const { resolvers, createSchema, context } = require('./gql/resolver')

const app = express()
const path = __dirname + '/static/'

;(async () => {
  const schema = createSchema()
  app.use(
    cors({
      origin: 'http://localhost:8080',
      optionsSuccessStatus: 200,
      credentials: true
    })
  )
  app.use(bodyParserGraphQL()) // to correctly parse the body
  app.use(express.static(path))
  app.get('/', function (req, res) {
    res.sendFile(path + 'index.html')
  })
  app.use(
    '/graphql',
    graphqlHTTP(async (request, response, graphQLParams) => ({
      schema: schema,
      rootValue: await resolvers(request, response),
      context: context,
      graphiql: true
    }))
  )
})()

app.listen(4241, () =>
  console.log('Server is up on http://localhost:4241/graphql')
)
