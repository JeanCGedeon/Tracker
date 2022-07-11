import express from "express";
import { Habit, User,Log } from "../../../models/index.js";
import tablesHabitsRouter from './tablesHabitsRouter.js'
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

const habitsRouter = new express.Router();
habitsRouter.use('/:userId/tables', tablesHabitsRouter)

habitsRouter.get("/", async (req, res) => {
  try {
    const goodHabits = await Habit.query().where({good:true})
    return res.status(200).json({ goodHabits });
  } catch (error) {
    return res.status(500).json(error);
  }
});

habitsRouter.get("/bad", async(req,res) =>{
    try{
        const badHabits = await Habit.query().where({good:false})
        return res.status(200).json({badHabits})
    }catch (error){
        return res.status(500).json(error)
    }
})

habitsRouter.get("/:id", async (req, res) => {
 const {id} = req.params
  try {
    const user = await User.query().findById(id)
    user.habits = await user.$relatedQuery('habits').where({good:true})
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
});
export default habitsRouter;
