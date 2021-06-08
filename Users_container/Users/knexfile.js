module.exports = {
  client: 'pg',
  connection: {
    host: 'reservation-web-application_db_1',
    port: '5432',
    database: 'posts',
    user: 'postgres',
    password: '6545352'
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
