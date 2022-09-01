const Model = require("./Model");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        comment: { type: "string" },
        // user: { type: "string" },
        userId: { type: ["string", "integer"] },
        habitId: { type: ["string", "integer"] },
        logId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { User, Habit, Log } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
      habit: {
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join: {
          from: "comments.habitId",
          to: "habits.id",
        },
      },
      //   log:{
      //         relation:Model.BelongsToOneRelation,
      //         modelClass: Log,
      //         join:{
      //             from:"comments.LogId",
      //             to:"logs.id"
      //         }
      //   }
    };
  }
}

module.exports = Comment;
