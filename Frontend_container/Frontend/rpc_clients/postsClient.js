'use strict'

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const path = require('path')

const postsServerAddress = 'reservation-web-application_posts_1:4242'

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.resolve(__dirname, '../protos/posts.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const postsClient = new proto.PostsService(
  postsServerAddress,
  grpc.credentials.createInsecure()
)

const getPost = (postOp) => new Promise((res, rej) => {
  console.log('getPost func Client')
  postsClient.GetPost(postOp, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err.message)
      return
    }
    console.log(resp)
    res(resp)
  })
})


const getUserPosts = ({ user_id, type }) => new Promise((res, rej) => {
  console.log('getUserPosts func Client')
  postsClient.getUserPosts({ id: user_id, type: type }, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err.message)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const addPost = (newPost) => new Promise((res, rej) => {
  console.log('addPost func Client')
  console.log(newPost)
  postsClient.AddPost(newPost, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err.message)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const updatePost = (postOp) => new Promise((res, rej) => {
  console.log('addPost func Client')
  postsClient.UpdatePost(postOp, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err.message)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const deletePost = (postOp) => new Promise((res, rej) => {
  console.log('deletePost func Client')
  postsClient.DeletePost(postOp, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err.message)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const listPosts = (type) => new Promise((res, rej) => {
  console.log('listPosts func Client')
  postsClient.ListPosts({ type: type }, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err.message)
      return
    }
    console.log(resp)
    res(resp)
  })
})

module.exports = {
  getPost,
  addPost,
  deletePost,
  listPosts,
  updatePost,
  getUserPosts
}
