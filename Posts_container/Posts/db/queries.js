'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const selectTable = type => {
  return type === 'REQ' ? knex('posts_request') : knex('posts_offer')
}

const getCategory = async ({ id }) => {
  console.log('getCategory ')
  let result
  try {
    result = await knex('categories')
      .where('id', id)
      .select()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}

const getCategories = async () => {
  console.log('getCategories ')
  let result
  try {
    result = await knex('categories').select()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const getPost = async ({ id, type }) => {
  console.log('getPost ', id, type)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .select()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}

const addPost = async newPost => {
  console.log('addPost ', newPost)
  let id
  try {
    id = await selectTable(newPost.type).insert(
      {
        category_id: newPost.category_id,
        user_id: newPost.user_id,
        title: newPost.title,
        description: newPost.description,
        price: newPost.price,
        picture_url: newPost.picture_url,
        is_active: newPost.is_active
      },
      ['id']
    )
    console.log(id)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return id[0]
}

const updatePost = async ({ id, type, fieldname, value }) => {
  console.log('getPost ', id, type, fieldname, value)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .update(fieldname, value)
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const bookPost = async ({ id, type, booked_user_id }) => {
  console.log('getPost ', id, type, booked_user_id)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .update({ is_booked: true, booked_user_id })
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const deletePost = async ({ id, type }) => {
  console.log('deletePost ', id, type)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .del()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}

const getAnyPosts = async ({ page_num = 0, limit = 20, type }) => {
  console.log('getAnyPosts ', page_num, limit, type)
  return await getPosts(
    selectTable(type)
      .where('id', '>', page_num * limit)
      .limit(limit)
      .select(knex.raw('*, count(*) over() as total'))
  )
}

const getPosts = async query => {
  let posts, total
  try {
    console.log(query.toString())
    posts = await query()
    console.log(posts)
    if (!post[0]) return { posts, total: 0 }
    total = posts[0].total
    posts.forEach(el => delete el.total)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return { posts, total }
}

const getPostsByUser = async ({ page_num = 0, limit = 20, type, user_id }) => {
  console.log('getPostsByUser ', page_num, limit, type, user_id)
  return await getPosts(
    selectTable(type)
      .where('user_id', user_id)
      .andWhere('id', '>', page_num * limit)
      .limit(limit)
      .select(knex.raw('*, count(*) over() as total'))
  )
}

const getPostsByCategoryId = async ({
  page_num = 0,
  limit = 20,
  type,
  category_id
}) => {
  console.log('getPostsByCategoryId ', page_num, limit, type, category_id)
  return await getPosts(
    selectTable(type)
      .where('category_id', category_id)
      .andWhere('id', '>', page_num * limit)
      .limit(limit)
      .select(knex.raw('*, count(*) over() as total'))
  )
}

const getPostsByKeyword = async ({
  page_num = 0,
  limit = 20,
  type,
  keyword = ''
}) => {
  console.log('getPostsByKeyword ', page_num, limit, type, keyword)
  return await getPosts(
    selectTable(type)
      .where('title ', 'ilike', `%${keyword}%`)
      .andWhere('id', '>', page_num * limit)
      .limit(limit)
      .select(knex.raw('*, count(*) over() as total'))
  )
}

const getPostsByKeywordAndCategoryId = async ({
  page_num = 0,
  limit = 20,
  type,
  keyword,
  category_id
}) => {
  console.log(
    'getPostsByKeywordAndCategoryId ',
    page_num,
    limit,
    type,
    keyword,
    category_id
  )
  return await getPosts(
    selectTable(type)
      .where('title ', 'ilike', `%${keyword}%`)
      .andWhere('id', '>', page_num * limit)
      .andWhere('category_id', category_id)
      .limit(limit)
      .select(knex.raw('*, count(*) over() as total'))
  )
}

module.exports = {
  getCategory,
  getCategories,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getAnyPosts,
  getPostsByUser,
  getPostsByCategoryId,
  getPostsByKeyword,
  getPostsByKeywordAndCategoryId,
  bookPost
}
