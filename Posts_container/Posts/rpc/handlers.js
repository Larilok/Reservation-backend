const grpc = require('@grpc/grpc-js')

const {
  getPost,
  getUserPosts,
  addPost,
  deletePost,
  listPosts,
  updatePost
} = require('../db/queries')


const getPostRPC = (call, callback) => {
  getPost(call.request).then((data) => {
    if (data.length) {
      callback(null, data[0]);
    } else {
      callback('That Post does not exist');
    }
  })
}

const getUserPostsRPC = (call, callback) => {
  try {
    getUserPosts(call.request).then((data) => {
      console.log(data)
      console.log(data.length)
      if (data.length) {
        callback(null, { posts: data });
        return
      }
      console.log('sending error')
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'That user does not have posts'
      });
    })
  } catch (err) {
    console.log(err)
    callback('ERR')
  }
}

const addPostRPC = (call, callback) => {
  console.log(call.request)
  addPost(call.request).then((data) => {
    callback(null, { data: data });
  })
}

const deletePostRPC = (call, callback) => {
  deletePost(call.request).then((data) => {
    callback(null, data);
  })
}

const updatePostRPC = (call, callback) => {
  updatePost(call.request).then((data) => {
    callback(null, data);
  })
}

const listPostsRPC = (call, callback) => {
  listPosts(call.request).then((data) => {
    callback(null, { posts: data });
  })
}

module.exports = {
  getPostRPC,
  getUserPostsRPC,
  addPostRPC,
  updatePostRPC,
  deletePostRPC,
  listPostsRPC
}

