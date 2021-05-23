'use strict'

const { readFileSync } = require('fs')
const { buildSchema } = require('graphql')
const path = require('path')

const {
  login,
  signup
} = require('../rpc_clients/authClient')

const {
  getPost,
  addPost,
  deletePost,
  listPosts,
  updatePost,
  getUserPosts
} = require('../rpc_clients/postsClient')

const { removeUser,
  createUser,
  modifyField
} = require('../rpc_clients/usersClient')

const createSchema = () => buildSchema(readFileSync(path.resolve(__dirname, './schema.graphql')).toString())

const resolvers = async () => {
  return {
    singUp: async (signUpInfo) => {
      const result = await signup(signUpInfo)
      return result
    },
    addPost: async (newPost) => {
      const result = await addPost(newPost)
      return result
    },
    updatePost: async (post) => {
      const result = await updatePost(post)
      return result
    },
    deletePost: async (post) => {
      const result = await deletePost(post)
      return result
    },
    createUser: async (userInfo) => {
      const result = await createUser(userInfo)
      return result
    },
    removeUser: async ({ id }) => {
      const result = await removeUser(id)
      return result
    },
    modifyUserField: async (data) => {
      const result = await modifyField(data)
      return result
    },
    login: async (credentials) => {
      const result = await login(credentials)
      return result
    },
    getPost: async (data) => {
      const result = await getPost(data)
      return result
    },
    getUserPosts: async ({ id }) => {
      const result = await getUserPosts(id)
      return result
    },
    listPosts: async () => {
      const result = await listPosts()
      return result
    }
  }
}

module.exports = {
  resolvers,
  createSchema
}
