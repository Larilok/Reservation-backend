const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  addPostRPC,
  deletePostRPC,
  getPostRPC,
  getUserPostsRPC,
  listPostsRPC,
  updatePostRPC
} = require('./rpc/handlers')

const PROTO_PATH = __dirname + '/posts.proto'
const serverAddress = '0.0.0.0:4242'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const postsService = protoDescriptor.PostsService

const getServer = () => {
  const server = new grpc.Server()
  server.addService(postsService.service, {
    GetPost: getPostRPC,
    GetUserPosts: getUserPostsRPC,
    AddPost: addPostRPC,
    UpdatePost: updatePostRPC,
    DeletePost: deletePostRPC,
    ListPosts: listPostsRPC
  })
  return server
}

const server = getServer()

server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), () => {
  server.start()
  console.log('Server running on', serverAddress)
})
