
module.exports = {
  client: 'pg',
  connection: {
    host: 'reservation-web-application_db_1',
    port: '5432',
    database: 'posts',
    user: 'postgres',
    password: 'postgres'
  },
  migrations: {
    directory: __dirname + './src/db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: __dirname + './src/db/seeds'
  },
  pool: {
    min: 1,
    max: 2 
  }
}

