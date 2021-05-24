'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const createUser = async (userInfo) => {
  console.log(userInfo)
  let idOfInsertedUser
  try {
    idOfInsertedUser = (await knex('users').insert(userInfo, ['id']))[0]
  } catch (err) {
    console.log(err)
  }
  console.log(idOfInsertedUser)
  return idOfInsertedUser.id
}

const getUser = async ({ id }) => {
  let user
  try {
    user = (await knex('users').where('id', id).select())[0]
  } catch (err) {
    console.log(err)
  }
  console.log(user)
  return user
}

const removeUser = async (id) => {
  return await knex('users').where('id', id).del()
}

const modifyField = async ({ fieldname, value, id }) => {
  return await knex('users').where('id', id).update(fieldname, value)
}

module.exports = {
  createUser,
  getUser,
  removeUser,
  modifyField
}