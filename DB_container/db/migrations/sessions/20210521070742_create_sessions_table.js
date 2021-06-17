exports.up = async function (knex) {
  if (await knex.schema.hasTable('sessions')) return
  await knex.schema.createTable('sessions', table => {
    table
      .string('token')
      .notNullable()
      .primary()
    table.binary('data').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('sessions')
}
