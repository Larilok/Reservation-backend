exports.up = async function (knex) {
  if (await knex.schema.hasTable('liked_posts')) return
  await knex.schema.createTable('liked_posts', table => {
    table.string('user_id').notNullable()
    table.string('post_id').notNullable()
    table.primary(['user_id', 'post_id'])
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('liked_pots')
}
