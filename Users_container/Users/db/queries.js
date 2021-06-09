'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const createUser = async userInfo => {
  console.log('CreateUser ', userInfo)
  let user_id
  try {
    user_id = await knex('users').insert(userInfo, ['id'])
  } catch (err) {
    console.log(err)
  }
  console.log(user_id)
  return user_id[0].id
}

const getUser = async ({ id }) => {
  console.log('GetUser ', id)
  let user
  try {
    user = await knex('users')
      .where('id', id)
      .select()
  } catch (err) {
    console.log(err)
  }
  console.log(user)
  return user[0]
}

const removeUser = async ({ id }) => {
  console.log('RemoveUser ', id)
  let user
  try {
    user = await knex('users')
      .where('id', id)
      .del()
  } catch (err) {
    console.log(err)
  }
  console.log(user)
  return user
}

const modifyField = async ({ fieldname, value, id }) => {
  console.log('ModifyField', id, fieldname, value)
  let user
  try {
    user = knex('users')
      .where('id', id)
      .update(fieldname, value)
  } catch (err) {
    console.log(err)
  }
  console.log(user)
  return user
}

module.exports = {
  createUser,
  getUser,
  removeUser,
  modifyField
}
