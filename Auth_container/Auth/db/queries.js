'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const getUser = async ({ email }) => {
  console.log('getUser')
  let result  
  try {
    result = (await knex('users').where('email', email).select())[0]
    if(!result) {
      return {}
    }
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    return {}
  }
  return result
}

module.exports = {
  getUser
}