'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const getPassword = async ({ email }) => {
  return await knex('users').where('email', email).select('password')
}

module.exports = {
  getPassword
}