const knex_require = require('knex')
const config = require('../knexfile')

const knex = knex_require(config)

module.exports = {
  knex
}