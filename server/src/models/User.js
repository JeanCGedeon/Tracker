/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        userName:{type:["string","integer"]},
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Habit,Comment,Log } = require("./index.js");
    return {
      habits: {
        relation: Model.HasManyRelation,
        modelClass: Habit,
        join: {
          from: "users.id",
          to: "habits.userId",
        },
      },

      // test:{
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: Habit,
      //   join:{
      //     from:"habits.userId",
      //     to:"users.email"
      //   }
      // },
      habitComments: {
        relation: Model.ManyToManyRelation,
        modelClass: Habit,
        join: {
          from: "users.id",
          through: {
            from:"comments.userId",
            to:"comments.habitId",
          },
          to:"habits.id"
        },
      },
      logComments: {
        relation: Model.ManyToManyRelation,
        modelClass: Log,
        join: {
          from: "logs.id",
          through: {
            from:"comments.logId",
            to:"comments.userId"
          },
          to:"users.id"
        },
      },
      comments:{
        relation:Model.HasManyRelation,
        modelClass: Comment,
        join:{
          from:"user.id",
          to:"comments.userId"
        }
      }
    };
  }






  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
