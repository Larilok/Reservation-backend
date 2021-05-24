module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '4444',
    database: 'posts',
    user: 'postgres',
    password: 'postgres'
  },
  migrations: {
    directory: __dirname + '/DB_container/db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: __dirname + '/DB_container/db/seeds'
  },
  pool: {
    min: 1,
    max: 2 
  }
}
