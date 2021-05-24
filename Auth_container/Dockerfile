FROM node:alpine
WORKDIR /auth
COPY package*.json ./ 
RUN npm install
COPY . .
WORKDIR Auth
EXPOSE 4240
CMD ["node","authServer.js"]
