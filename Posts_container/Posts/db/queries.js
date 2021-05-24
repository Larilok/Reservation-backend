'use strict'

const knex = require('./knex')

const selectTable = (type) => {
  type === 0 ? knex.table('posts_request') : knex.table('posts_offer')
}

const getPost = async ({ id, type }) => {
  return await selectTable(type).where('id', id).select()
}

const getUserPosts = async ({ id, type }) => {
  return await selectTable(type).where('user_id',)
}

const addPost = async (newPost) => {
  return await selectTable(newPost.type).insert({
    category_id: newPost.category_id,
    user_id: newPost.user_id,
    title: newPost.title,
    description: newPost.description,
    price: newPost.price,
    picture_url: newPost.picture_url,
    is_active: newPost.is_active
  })
}

const updatePost = async ({ id, type, fieldname, value }) => {
  return await selectTable(type).where('id', id).update(fieldname, value)
}

const deletePost = async ({ id, type }) => {
  return await selectTable(type).where('id', id).del()
}

const listPosts = async ({ type }) => {
  return await selectTable(type).select()
}


module.exports = {
  getPost,
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
  listPosts
}