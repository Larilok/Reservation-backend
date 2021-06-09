exports.up = async function (knex) {
  if (await knex.schema.hasTable('post_req_feature')) return;
  await knex.schema.createTable('post_req_feature', (table) => {
    table.increments('id')
    table.integer('features_id')
      .notNullable()
      .references('id')
      .inTable('features')
      .onDelete('cascade')
      .index()
    table.integer('post_req_id')
      .notNullable()
      .references('id')
      .inTable('posts_request')
      .onDelete('cascade')
      .index()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('post_req_feature')
};
