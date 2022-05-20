const Model = require("./Model");

class Habit extends Model {
  static get tableName() {
    return "habits";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description", "good"],
      properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string" },
        good: { type: ["boolean", "string"] },
        logId: { type: ["integer", "string"] },
      },
    };
  }
  static get relationMappings() {
    const { User } = require("./index.js");

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "habits.id",
          to: "users.habitId",
        },
      },
      log:{
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join:{
            from:'habits.logId',
            to:'logs.id'
        }
      }
    };
  }
}

module.exports = Habit;
