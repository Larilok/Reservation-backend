FROM node
WORKDIR /auth
COPY . .
RUN npm install pg
RUN npm install grpc
RUN npm install @grpc/proto-loader
WORKDIR Auth
#EXPOSE 4240
CMD ['node', 'authServer.js']
#expose port 4240 for authServer
#expose port 4241 to redirect to bookingServer?
#expose port 5555 for db access