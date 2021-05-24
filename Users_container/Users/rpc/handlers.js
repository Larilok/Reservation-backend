const {
  createUser,
  getUser,
  modifyField,
  removeUser
} = require('../db/queries')


const createUserRPC = (call, callback) => {
  console.log(call.request)
  createUser(call.request).then((data) => {
    callback(null, {data: data});
  })
}

const getUserRPC = (call, callback) => {
  console.log(call.request)
  getUser(call.request).then((data) => {
    callback(null, data);
  })
}

const modifyFieldRPC = (call, callback) => {
  modifyField(call.request).then((data) => {
    callback(null, data);
  })
}

const removeUserRPC = (call, callback) => {
  removeUser(call.request).then((data) => {
    callback(null, data);
  })
}

module.exports = {
  createUserRPC,
  getUserRPC,
  modifyFieldRPC,
  removeUserRPC
}

