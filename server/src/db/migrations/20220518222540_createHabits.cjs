/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable('habits',(table) =>{
        table.bigIncrements('id')
        table.string('title').notNullable()
        table.text('description').notNullable()
        table.boolean('good')
        table.boolean('bad')
        table.date('date')
        // table.bigInteger("commentId").index().unsigned().references("comments.id")
        table.bigInteger('userId').notNullable().index().unsigned().references('users.id')
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists('habits')
}
