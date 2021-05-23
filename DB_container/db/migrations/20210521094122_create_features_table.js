exports.up = async function (knex) {
  if (await knex.schema.hasTable('features')) return;
  await knex.schema.createTable('features', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('features')
};

