module.exports = {
  client: 'pg',
  connection: {
    host: 'db-service',
    port: '5432',
    database: 'auth',
    user: 'postgres',
    password: '6545352'
  },
  migrations: {
    directory: '../../DB_container/db/migrations',
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
