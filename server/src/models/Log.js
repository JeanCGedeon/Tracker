const { jsonSchema } = require('./Model')
const Model = require('./Model')

class Log extends Model {
    static get tableName(){
        return 'logs'
    }
    
   static get relationMappings(){
       const {Habit} = require('./index.js')

       return{
        habits:{
        relation: Model.HasManyRelation,
        modelClass: Habit,
        join:{
            from:'logs.id',
            to:'habit.logId'
        }
       }
   } 
}
}

module.exports = Log
