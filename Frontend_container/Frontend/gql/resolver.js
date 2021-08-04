'use strict'

const { readFileSync } = require('fs')
const { buildSchema } = require('graphql')
const path = require('path')

const {
  getPost,
  addPost,
  deletePost,
  updatePost,
  getCategory,
  getCategories,
  listPosts,
  listPostsByUser,
  listPostsByCategoryId,
  listPostsByKeyword,
  listPostsByKeywordAndCategoryId,
  bookPost
} = require('../rpc_clients/postsClient')

const {
  createUser,
  getUser,
  removeUser,
  updateField,
  createLikedPost,
  deleteLikedPost,
  getLikedPosts,
  validateSMSCode,
  sendSMS,
  login
} = require('../rpc_clients/usersClient')

const Client = require('../session/client')
const Session = require('../session/session')

const createSchema = () =>
  buildSchema(
    readFileSync(path.resolve(__dirname, './schema.graphql')).toString()
  )

const resolvers = async (req, res) => {
  const client = await Client.getInstance(req, res)
  Session.start(client)
  const { method, url, headers } = req
  console.log(`${method} ${url} ${headers.cookie}`)
  res.on('finish', () => {
    console.log('FINISH')
    if (client.session) client.session.save()
  })
  return {
    login: async ({ cred }) => {
      const userId = await login(cred)
      if (userId) {
        client.session.set('user_id', userId)
        client.session.set('logged_in', 1)
      }
      client.sendCookie()
      return 'OK'
    },
    addPost: async ({ post }) => {
      if (!client.session.get('logged_in')) {
        console.log('Not logged in')

        console.log(client.session.get('logged_in'))
        console.log(client.session.get('user_id'))
        return
      }
      post.user_id = client.session.get('user_id')

      const result = await addPost(post)
      console.log('result in addPost: ', result.data)
      client.sendCookie()
      return result.data
    },
    updatePost: async ({ post }) => {
      if (!client.session.get('logged_in')) return
      const result = await updatePost(post)
      client.sendCookie()
      return result
    },
    deletePost: async ({ post }) => {
      if (!client.session.get('logged_in')) return
      const result = await deletePost(post)
      client.sendCookie()
      return result
    },
    createUser: async ({ info }) => {
      const result = await createUser(info)
      client.sendCookie()
      return 'OK'
    },
    getUser: async ({ id }) => {
      if (!id) id = client.session.get('user_id')

      const result = await getUser(id)
      client.sendCookie()
      return result
    },
    removeUser: async ({ id }) => {
      if (
        !client.session.get('logged_in') &&
        client.session.get('user_id') != id
      )
        return
      const result = await removeUser(id)
      client.sendCookie()
      return result
    },
    modifyUserField: async ({ data }) => {
      if (!client.session.get('logged_in')) return
      data.id = client.session.get('user_id')
      const result = await updateField(data)
      client.sendCookie()
      return result
    },
    getPost: async ({ data }) => {
      const post = await getPost(data)
      console.log(post)
      const user = await getUser({ id: post.user_id })
      console.log(user)
      const category = await getCategory({ id: post.category_id })
      console.log(category)
      const result = {
        id: post.id,
        category_name: category.name,
        user_phone: user.phone,
        user_name: user.name,
        user_surname: user.surname,
        title: post.title,
        description: post.description,
        price: post.price,
        picture_url: post.picture_url,
        is_active: post.is_active,
        created_at: post.created_at,
        updated_at: post.updated_at
      }
      client.sendCookie()
      return result
    },
    getPosts: async ({ pagination }) => {
      console.log(pagination)
      let postAndTotal
      if (!pagination.page_num) pagination.page_num = 0
      if (!pagination.limit) pagination.limit = 20
      if (!pagination.type) pagination.type = 'OFFER'
      if (
        !pagination.category_id &&
        !pagination.user_id &&
        !pagination.keyword
      ) {
        pagination.keyword = '_'
        postAndTotal = listPostsByKeyword(pagination)
      } else if (!pagination.category_id && !pagination.user_id) {
        postAndTotal = listPostsByKeyword(pagination)
      } else if (!pagination.keyword && !pagination.user_id) {
        postAndTotal = listPostsByCategoryId(pagination)
      } else if (!pagination.keyword && !pagination.category_id) {
        postAndTotal = listPostsByUser(pagination)
      } else if (!pagination.user_id) {
        postAndTotal = listPostsByKeywordAndCategoryId(pagination)
      }
      console.log(postAndTotal)
      client.sendCookie()
      return postAndTotal
    },
    bookPost: async ({ bookPostOperation }) => {
      const result = await bookPost(bookPostOperation)
      console.log(result)
      client.sendCookie()
      return result
    },
    getCategories: async () => {
      const result = await getCategories()
      console.log(result)
      client.sendCookie()
      return result
    },
    getLikedPosts: async ({ userId }) => {
      const result = await getLikedPosts(userId)
      console.log(result)
      const posts = await Promise.all(
        result.map(async ({ user_id, post_id }) => await getPost(post_id))
      )
      client.sendCookie()
      return posts
    },
    validateSMSCode: async ({ info }) => {
      const result = await validateSMSCode(info)
      console.log(result)
      client.sendCookie()
      return result
    },
    createLikedPost: async ({ likedPost }) => {
      const result = await createLikedPost(likedPost)
      console.log(result)
      client.sendCookie()
      return result
    },
    deleteLikedPost: async ({ likedPost }) => {
      const result = await deleteLikedPost(likedPost)
      console.log(result)
      client.sendCookie()
      return result
    },
    sendSMS: async ({ sendSMSInfo }) => {
      const result = await sendSMS(sendSMSInfo)
      console.log(result)
      client.sendCookie()
      return result
    }
  }
}

const context = ({ req, res }) => {
  return {
    req: req,
    res: res
  }
}

module.exports = {
  resolvers,
  createSchema,
  context
}
