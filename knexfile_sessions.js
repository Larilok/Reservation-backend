module.exports = {
  client: 'pg',
  connection: {
    host: '10.88.224.70',
    // host: 'localhost',
    port: '5432',
    database: 'sessions',
    user: 'postgres',
    password: '6545352'
  },
  migrations: {
    directory: __dirname + '/DB_container/db/migrations/sessions',
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
