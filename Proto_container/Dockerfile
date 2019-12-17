FROM node
WORKDIR /proto
COPY . .
RUN npm install pg
RUN npm install grpc
RUN npm install @grpc/proto-loader
WORKDIR protos
#EXPOSE 4250
CMD ['node', 'route_guide_server.js']
#expose port 4250 for route_guide_server
#expose port 5555 for db access
