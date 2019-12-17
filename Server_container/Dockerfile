FROM node
WORKDIR /server
COPY . .
RUN npm install pg
WORKDIR web
#EXPOSE 4242
CMD ["node", "server.js"]
#expose port 4242 for server
#exppose port 4240 to redirect to authServer
#expose port 5555 for db access