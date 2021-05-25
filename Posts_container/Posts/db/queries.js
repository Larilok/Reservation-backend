'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const selectTable = (type) => {
  return type === 'REQ' ? knex('posts_request') : knex('posts_offer')
}

const getPost = async ({ id, type }) => {
  return await selectTable(type).where('id', id).select()
}

const getUserPosts = async ({ id, type }) => {
  console.log(type, id)
  let result
  try {
    result = await selectTable(type).where('user_id', id).select()
  } catch (err) {
    console.log(err)
    return undefined
  }
  console.log(result)
  return result
}


const addPost = async (newPost) => {
  let result
  try {
    result = await selectTable(newPost.type).insert({
      category_id: newPost.category_id,
      user_id: newPost.user_id,
      title: newPost.title,
      description: newPost.description,
      price: newPost.price,
      picture_url: newPost.picture_url,
      is_active: newPost.is_active
    }, ['id'])
    console.log(result)
  } catch (err) {
    console.log(err)
  }
  return result[0].id
}

const updatePost = async ({ id, type, fieldname, value }) => {
  return await selectTable(type).where('id', id).update(fieldname, value)
}

const deletePost = async ({ id, type }) => {
  return await selectTable(type).where('id', id).del()
}

const listPosts = async ({ type }) => {
  console.log(type)
  let result
  try {
    result = await selectTable(type).select()
  } catch (err) {
    console.log(err)
  }
  console.log(result)
  return result
}


module.exports = {
  getPost,
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
  listPosts
}