FROM node
WORKDIR /booking
COPY . .
RUN npm install pg
RUN npm install grpc
RUN npm install @grpc/proto-loader
WORKDIR Booking
#EXPOSE 4241
CMD ['node', 'bookingServer.js']
#expose port 4241 for bookingServer
#expose port 4240 to redirect to authServer
#expose port 5555 for db access
