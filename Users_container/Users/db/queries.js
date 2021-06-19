'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const getCredentials = async phone => {
  console.log('getCredentials ', phone)
  let result
  try {
    result = await knex('users')
      .where('phone', phone)
      .select('id', 'password')
    console.log('Result:', result)
    if (!result) {
      return {}
    }
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}
const createUser = async userInfo => {
  console.log('CreateUser ', userInfo)
  let userId
  try {
    userId = await knex('users').insert(userInfo, ['id'])
  } catch (err) {
    console.log(err)
  }
  console.log(userId)
  return userId[0].id
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

const createLikedPost = async likedPost => {
  console.log('createLikedPost ', likedPost)
  let user
  try {
    await knex('users').insert(likedPost)
  } catch (err) {
    console.log(err)
  }
  console.log(user)
  return user
}

const deleteLikedPost = async likedPost => {
  console.log('deleteLikedPost ', likedPost)
  let user
  try {
    user = knex('users')
      .where(likedPost)
      .del()
  } catch (err) {
    console.log(err)
  }
  console.log(user)
  return user
}

const getLikedPosts = async userId => {
  console.log('getLikedPosts ', userId)
  let posts
  try {
    posts = knex('users')
      .where(userId)
      .select()
  } catch (err) {
    console.log(err)
  }
  console.log(posts)
  return posts
}

module.exports = {
  createUser,
  getUser,
  removeUser,
  modifyField,
  getCredentials,
  createLikedPost,
  deleteLikedPost,
  getLikedPosts
}
