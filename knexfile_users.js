module.exports = {
  client: 'pg',
  connection: {
    host: '10.88.208.6',
    // host: 'localhost',
    port: '31568',
    database: 'users',
    user: 'postgres',
    password: '6545352'
  },
  migrations: {
    directory: __dirname + '/DB_container/db/migrations/users',
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
