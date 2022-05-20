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
        table.boolean('good').notNullable()
        table.bigInteger('logId').notNullable().index().unsigned().references('logs.id')
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