/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("comments",(table) =>{
        table.bigIncrements("id")
        table.text("comment")
        // table.string("user")
        table.bigInteger("userId").index().unsigned().references("users.id")
        table.bigInteger("habitId").index().unsigned().references("habits.id")
        table.bigInteger("logId").index().unsigned().references("logs.id")
        table.date('date')
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("comments")
}
