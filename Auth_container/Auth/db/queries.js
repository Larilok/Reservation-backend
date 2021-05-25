'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const getUser = async ({ email }) => {
  console.log('getUser')
  let result  
  try {
    result = (await knex('users').where('email', email).select())[0]
    if(!result) {
      return undefined
    }
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    return undefined
  }
  return result
}

module.exports = {
  getUser
}