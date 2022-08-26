const Model = require("./Model");

class Habit extends Model {
  static get tableName() {
    return "habits";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description"],
      properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string" },
        good: { type: ["boolean", "string"] },
        bad: { type: ["boolean", "string"] },
        date: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    };
  }
  static get relationMappings() {
    const { User, Log, Comment } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "habits.userId",
          to: "users.id",
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        join: {
          from: "habits.id",
          to: "logs.habitId",
        },
      },

      // testy: {
      //   relation: Model.HasManyRelation,
      //   modelClass: User,
      //   join: {
      //     from: "habits.id",
      //     to:"habits.userId"
      //   },
      // },
      comments:{
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join:{
          from:"habits.id",
          to:"comments.habitId"
        }
      },
      usersComments: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "habits.id",
          through: {
            from:"comments.habitId",
            to:"comments.userId"
          },
          to:"users.id"
        },
      },
    };
  }
}

module.exports = Habit;
