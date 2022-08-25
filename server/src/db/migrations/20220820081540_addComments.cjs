/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users",(table)=>{
        table.bigInteger("commentId").unsigned().index().references("comments.id")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users",(table)=>{
        table.dropColumn("commentId")
    })
}
