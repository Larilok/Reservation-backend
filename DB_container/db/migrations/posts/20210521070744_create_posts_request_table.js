exports.up = async function (knex) {
  if (await knex.schema.hasTable('posts_request')) return
  await knex.schema.createTable('posts_request', table => {
    table.increments('id')
    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('categories')
      .onDelete('cascade')
      .index()
    table
      .integer('user_id')
      .notNullable()
      .index()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.integer('price').notNullable()
    table.string('picture_url').notNullable()
    table.boolean('is_active').defaultTo(false)
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('posts_request')
}
