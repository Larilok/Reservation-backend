'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const createSession = async newSession => {
  console.log('createSession ', newSession)
  let result
  try {
    result = await knex('sessions').insert(newSession)
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const deleteSession = async sessionToken => {
  console.log('deleteSession ', sessionToken)
  let result
  try {
    result = await knex('sessions')
      .where(sessionToken)
      .del()
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const getSession = async sessionToken => {
  console.log('getSession ', sessionToken)
  let result
  try {
    result = await knex('sessions')
      .where(sessionToken)
      .select()
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}

const updateSession = async ({ token, data }) => {
  console.log('updateSession ', token, data)
  let result
  try {
    result = await knex('sessions')
      .where('token', token)
      .update('data', data)
    console.log('Result:', result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

module.exports = {
  createSession,
  deleteSession,
  getSession,
  updateSession
}
