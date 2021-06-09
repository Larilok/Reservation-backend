exports.up = async function (knex) {
  if (await knex.schema.hasTable('auth')) return
  await knex.schema.createTable('auth', table => {
    table.increments('id')
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('auth')
}
