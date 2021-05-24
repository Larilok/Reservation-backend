'use strict';

const authLength = 10;//minutes

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  login,
  signup
} = require('./rpc/handlers')

const PROTO_PATH = __dirname + '/auth.proto'

const serverAddress = '0.0.0.0:4240'

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const authService = protoDescriptor.AuthService

const getServer = () => {
  const server = new grpc.Server()
  server.addService(authService.service, {
    login: login,
    signup: signup,
  })
  return server
}

const server = getServer()

server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), () => {
  server.start()
  console.log('Server running on', serverAddress)
})


// http.createServer((req, res) => {
//   console.log(req.socket.remoteAddress);
//   console.log(req.socket.remotePort);
//   console.log(req.socket.remoteFamily);
//   console.log('``````````````````````````````````````````````````````````````````````````````````````````````````````````````');
//   // console.log(req.method);
//   const uri = url.parse(req.url).path;
//   console.log(uri);

//   console.log(req.headers);
//   if(req.headers.cookie) console.log(JSON.parse(req.headers.cookie));

//   if(req.method === 'GET') {
//     // console.log()
//     if(req.headers.cookie && JSON.parse(req.headers.cookie).authorised && (new Date(JSON.parse(req.headers.cookie).expire) > new Date())) {
//       router.route(req.socket.remoteAddress, uri, (result) => {
//         // if(result === JSON.stringify('User successfully logged in')) {
//         //   console.log('Adding cookie');
//         //   res.writeHead(200, {'Set-Cookie': 'MYCOOKIe', 'Content-Type': 'text/plain'})
//         // }
//         res.write(result);//removed JSON.stringify
//         res.end();
//       });
//       return;
//     } else {
//       router.route(req.socket.remoteAddress, '/login.html', (result) => {
//         res.write(result);//removed JSON.stringify
//         res.end();
//       });
//       // res.writeHead(302, {'Location': 'http://127.0.0.1:4240/login.html'});
//       // res.end();
//     }
//   };
//   if(req.method === 'POST') {
//     console.log("POOOOOOOOOOOOOOST");
//     let data = '';
//     req.on('data', (chunk) => {
//       data += chunk;
//     }).on('end', () => {
//       console.log(data);
//       router.route(data, uri, (result) => {
//         console.log('Result: ', result);
//         if(result === 'User successfully logged in') {
//           console.log('Adding cookie');
//           const date = new Date();
//           const cookie = {
//             authorised: true,
//             expire: new Date(date.setMinutes(date.getMinutes()+authLength))
//           };
//           // res.writeHead(200, {'Set-Cookie': cookie, 'Content-Type': 'text/plain'});
//           res.setHeader('Content-Type', 'text/plain');
//           res.setHeader('Set-Cookie', JSON.stringify(cookie));
//           res.writeHead(302, {'Location': 'http://127.0.0.1:4241/bookingselect.html'});
//           res.end();
//         }
//       });
//       return;
//     });

//   };
// }).listen(parseInt(port, 10), '0.0.0.0', () => console.log("Server running at\n  => http://0.0.0.0:" + port + "/\nCTRL + C to shutdown"));


