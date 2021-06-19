FROM node:alpine
WORKDIR /session
COPY package*.json ./ 
RUN npm install
COPY . .
WORKDIR Session
EXPOSE 4240
CMD ["node","sessionServer.js"]
