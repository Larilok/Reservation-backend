# TODO
FROM node:alpine
WORKDIR /Users
COPY package*.json ./ 
RUN npm install
COPY . .
WORKDIR Users
EXPOSE 4243
CMD ["node","usersServer.js"]
