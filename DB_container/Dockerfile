FROM postgres
COPY package*.json ./ 
RUN npm install
COPY . .
COPY create_dbs.sql /docker-entrypoint-initdb.d/
EXPOSE 5432