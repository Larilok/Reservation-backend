FROM node:alpine
WORKDIR /Posts
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR Posts
EXPOSE 4242
CMD ["node","postsServer.js"]
