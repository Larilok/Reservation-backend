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

const Client = require('../session/client')
const Session = require('../session/session')

const createSchema = () => buildSchema(readFileSync(path.resolve(__dirname, './schema.graphql')).toString())

const resolvers = async (req, res) => {
  const client = await Client.getInstance(req, res)
  res.on('finish', () => {
    if (client.session) client.session.save();
  });
  return {
    singup: async (cred) => {
      let password
      try {
        password = await signup(cred)
        console.log(`Password ${password}`)
      } catch (err) {
        console.log(err)
      }
      return { password }
    },
    addPost: async ({ post }) => {
      
      if(!req.headers.cookie) return
      const result = await addPost(post)
      console.log('result in addPost: ', result.data)
      return result.data
    },
    updatePost: async (post) => {
      if(!req.headers.cookie) return
      const result = await updatePost(post)
      return result
    },
    deletePost: async (post) => {
      if(!req.headers.cookie) return
      const result = await deletePost(post)
      return result
    },
    createUser: async ({ info }) => {
      const { password } = await signup({
        email: info.email,
        password: info.password
      })
      info.password = password
      const result = await createUser(info)
      console.log('result in CreateUser: ', result.data)
      return result.data
    },
    getUser: async ({ id }) => {
      if(!req.headers.cookie) return
      const result = await getUser(id)
      return result
    },
    removeUser: async ({ id }) => {
      if(!req.headers.cookie) return
      const result = await removeUser(id)
      return result
    },
    modifyUserField: async (data) => {
      if(!req.headers.cookie) return
      const result = await modifyField(data)
      return result
    },
    login: async ({ cred }) => {
      Session.start(client);
      const token = await login(cred)
      res.setHeader('Set-Cookie',
        `session_id=${token}; expires=Fri, 01 Jan 2100 00:00:00 GMT; Path=/;`
      )
      return 'OK'
    },
    getPost: async (data) => {
      const result = await getPost(data)
      return result
    },
    getUserPosts: async ({ id }) => {
      if(!req.headers.cookie) return
      const result = await getUserPosts(id)
      return result
    },
    listPosts: async ({ type }) => {
      console.log(type)
      const result = await listPosts(type)
      console.log(result.posts)
      return result.posts
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
