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
  getUserPosts(call.request).then((data) => {
    if (data.length) {
      callback(null, data);
    } else {
      callback('That user does not have posts');
    }
  })
}

const addPostRPC = (call, callback) => {
  addPost(call.request).then((data) => {
    callback(null, data);
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
    callback(null, data);
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

