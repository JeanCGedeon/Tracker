const Model = require("./Model");

class Habit extends Model {
  static get tableName() {
    return "habits"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description", "good",'userId'],
      properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string" },
        good: { type: ["boolean", "string"] },
        userId: { type: ["string", "integer"] },
      },
    };
  }
  static get relationMappings() {
    const { User, Log } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "habits.userId",
          to: "users.id",
        },
      },
      logs:{
        relation: Model.HasManyRelation,
        modelClass: Log,
        join:{
            from:'habits.id',
            to:'logs.habitId'
        }
      }
    };
  }
}

module.exports = Habit;
