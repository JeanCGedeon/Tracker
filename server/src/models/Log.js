const Model = require("./Model");

class Log extends Model {
  static get tableName() {
    return "logs";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["notes"],
      properties: {
        notes: { type: "string" },
        // level: { type: ["string", "integer"] },
        date: { type: ["string", "integer"] },
        habitId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Habit } = require("./index.js");

    return {
      habits: {
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join: {
          from: "logs.habitId",
          to: "habit.id",
        },
      },
    };
  }
}

module.exports = Log;
