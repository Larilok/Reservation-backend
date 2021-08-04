module.exports = {
  client: 'pg',
  connection: {
    host: '10.88.208.6',
    // host: 'localhost',
    port: '31569',
    database: 'posts',
    user: 'postgres',
    password: '6545352'
  },
  migrations: {
    directory: __dirname + '/DB_container/db/migrations/posts',
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
