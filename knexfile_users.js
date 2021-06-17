module.exports = {
  client: 'pg',
  connection: {
    // host: '34.70.205.169',
    host: 'localhost',
    port: '5432',
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
