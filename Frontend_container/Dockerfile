FROM node:alpine
WORKDIR /Frontend
COPY package*.json ./ 
RUN npm install
COPY . .
WORKDIR Frontend
EXPOSE 4241
CMD ["node","server.js"]
