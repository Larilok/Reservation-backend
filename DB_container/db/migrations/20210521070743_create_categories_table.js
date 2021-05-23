exports.up = async function (knex) {
  if (await knex.schema.hasTable('categories')) return;
  await knex.schema.createTable('categories', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('categories')
};
