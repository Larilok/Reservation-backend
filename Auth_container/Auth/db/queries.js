'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const getPassword = async ({ email }) => {
  console.log('getPassword')
  let result  
  try {
    result = (await knex('users').where('email', email).select('password'))[0]
    if(!result) {
      return undefined
    }
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    return undefined
  }
  return result.password
}

module.exports = {
  getPassword
}