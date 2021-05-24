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
  getUser,
  modifyField
} = require('../rpc_clients/usersClient')

const createSchema = () => buildSchema(readFileSync(path.resolve(__dirname, './schema.graphql')).toString())

const resolvers = async () => {
  return {
    singup: async (cred) => {
      let password
      try {
        password = await signup(cred)
        console.log(`Password ${password}`)

      } catch (err) {
        console.log(err)
      }
      return {password}
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
    createUser: async ({info}) => {
      const { password } = await signup({
        email: info.email,
        password: info.password
      })
      info.password = password
      const result = await createUser(info)
      console.log(`result in CreateUser: ${result}`)
      return result
    },
    getUser: async ({id}) => {
      const result = await getUser(id)
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
