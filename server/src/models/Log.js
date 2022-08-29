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
    const { Habit,User,Comment } = require("./index.js");

    return {
      habits: {
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join: {
          from: "logs.habitId",
          to: "habit.id",
        },
      },
      usersComments: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "users.id",
          through: {
            from: "comments.userId",
            to: "comments.habitId",
          },
          to: "logs.id",
        },
      },
      // comments:{
      //   relation:Model.HasManyRelation,
      //   modelClass: Comment,
      //   join:{
      //     from:"logs.id",
      //     to:"comments.logId"
      //   }
    // }
  }
  }
}

module.exports = Log;
