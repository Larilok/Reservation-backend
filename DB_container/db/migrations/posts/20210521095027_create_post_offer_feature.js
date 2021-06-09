exports.up = async function (knex) {
  if (await knex.schema.hasTable('post_offer_feature')) return;
  await knex.schema.createTable('post_offer_feature', (table) => {
    table.increments('id')
    table.integer('features_id')
      .notNullable()
      .references('id')
      .inTable('features')
      .onDelete('cascade')
      .index()
    table.integer('post_offer_id')
      .notNullable()
      .references('id')
      .inTable('posts_offer')
      .onDelete('cascade')
      .index()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('post_offer_feature')
};
