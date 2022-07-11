import express from 'express'
import { ValidationError } from 'objection'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { Habit, User } from '../../../models/index.js'

const tablesHabitsRouter = new express.Router({mergeParams: true })

tablesHabitsRouter.get("/myBad", async (req, res) => {
    const {userId} = req.params
  try{
    const myBadHabits = await User.query().findById(userId)
    myBadHabits.habits = await myBadHabits.$relatedQuery('habits').where({good:false})
    return res.status(200).json({myBadHabits})
}catch(error){
return res.status(500).json(error)
}
})
  tablesHabitsRouter.get("/myGood", async (req, res) => {
    const {userId} = req.params
     try {
       const myGoodHabits = await User.query().findById(userId)
       myGoodHabits.habits = await myGoodHabits.$relatedQuery('habits').where({good:true})
       return res.status(200).json({ myGoodHabits });
     } catch (error) {
       return res.status(500).json(error);
     }
   });
   
  tablesHabitsRouter.post("/", async (req, res) => {
    const {body} = req
    const formInput = cleanUserInput(body)
    const {title, description, good,bad } = formInput
    const { userId } = req.params
    try {
      const newHabit = await Habit.query().insert({ title, description, good,bad, userId})
      return res.status(200).json({ table: newHabit });
    } catch (error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error });
      } else {
        return res.status(500).json({ errors: error });
      }
    }
  }
)

export default tablesHabitsRouter