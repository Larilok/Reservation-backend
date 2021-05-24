'use strict'
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { bodyParserGraphQL } = require('body-parser-graphql')

const { resolvers, createSchema } = require('./gql/resolver')

const app = express()

;(async () => {
  const schema = createSchema()
  const root = await resolvers()
  app.use(bodyParserGraphQL()) // to correctly parse the body
  app.use(express.static(__dirname + '/static'))
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }))
})()

app.listen(4241, () => console.log('Server is up on http://localhost:4241/graphql'))