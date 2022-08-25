import express from "express";
import { Habit, User,Log, Comment} from "../../../models/index.js";
import tablesHabitsRouter from './tablesHabitsRouter.js'
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

const habitsRouter = new express.Router();
habitsRouter.use('/:userId/tables', tablesHabitsRouter)

habitsRouter.get("/", async (req, res) => {
  try {
      if(req.user){
    const users = await User.query()
    return res.status(200).json({users });
  }
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
 const userId = req.params.id
  try {
    const user = await User.query().findById(userId)
    user.habits = await user.$relatedQuery('habits')
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
});

habitsRouter.get("/comments/:id", async (req, res) => {
    const userId = req.params.id
     try {
       const habit = await Habit.query().findById(userId)
       habit.comments = await habit.$relatedQuery('comments')
       const users = await Habit.query().findById(userId)
        users.usersComments = await users.$relatedQuery("usersComments")
        return res.status(200).json({ test: [habit,users] });
     } catch (error) {
       return res.status(500).json(error);
     }
   });
   
// habitsRouter.get("/habitComment", async (req,res)=>{
//   const id = req.params.id
//   try{
//     const comment = await Comment.query()
//     return res.status(200).json({comment})
//   }catch(error){
//     return res.status(500).json(error)
//   }
// })

// habitsRouter.delete("/:id", async(req,res)=>{
//     try{
//         const {id} = req.params
//         const habitDelete = await Habit.query().findById(id)
//         habitDelete.user = await habitDelete.$relatedQuery('user')
//         if(req.user && habitDelete.userId === req.user.id ){
//             await habitDelete.query().findOne({id: id, userId: req.user.id})
//             await habitDelete.query().deleteById(id)
//             await habitDelete.$relatedQuery('user').delete
//           return  res.status(200).json({message: 'This habit has been deleted'})
//         } else{
//           return  res.status(401).json({"AuthorizationError:":"User not authorized to delete review"})
//         }
//     }catch(error){
//        return res.status(500).json(error)
//     }
// })



  
export default habitsRouter;
