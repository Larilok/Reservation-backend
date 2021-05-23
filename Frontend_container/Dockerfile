FROM node:alpine
WORKDIR /server
COPY package*.json ./ 
RUN npm install
COPY . .
WORKDIR web
EXPOSE 4242
CMD ["node","server.js"]
