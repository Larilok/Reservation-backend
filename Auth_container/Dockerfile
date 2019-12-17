FROM node
WORKDIR /auth
COPY . .
#RUN npm install pg
#RUN npm install grpc
#RUN npm install @grpc/proto-loader
#CMD ["ls","-lah"]
#RUN ls -lah
RUN npm install
WORKDIR Auth
EXPOSE 4240
#RUN ls -lah
CMD ["node","authServer.js"]
#expose port 4240 for authServer
#expose port 4241 to redirect to bookingServer?
#expose port 5555 for db access