import express from 'express'
import { ValidationError } from 'objection'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { Habit, User,Log,Comment } from '../../../models/index.js'


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
   
tablesHabitsRouter.get("/myLogs", async(req,res) =>{
  const {userId} = req.params
  try{
    const myLogs = await User.query().findById(userId)
    myLogs.logs = await myLogs.$relatedQuery("logs")
    return res.status(200).json({myLogs})
  }catch(error) {
    return res.status(500).json(error)
  }
})

tablesHabitsRouter.get("/", async (req, res) => {
  const {userId} = req.params
   try {
     const myGoodHabits = await Habit.query()
     return res.status(200).json({ myGoodHabits });
   } catch (error) {
     return res.status(500).json(error);
   }
 });

  tablesHabitsRouter.post("/post", async (req, res) => {
    const {body} = req
    const formInput = cleanUserInput(body)
    const {title, description, good,bad,date } = formInput
    const { userId } = req.params
    
    try {
      const habitDelete = await User.query().findById(userId)
      if(req.user && habitDelete.id === req.user.id){
        
      const newHabit = await Habit.query().insert({ title, description, good,bad,date, userId})
      return res.status(200).json({ table: newHabit });
    } }
    catch (error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error });
      } else {
        return res.status(500).json({ errors: error });
      }
    }
  
  })


  tablesHabitsRouter.post("/postComment/:id", async (req, res) => {
    const {body} = req
    const formInput = cleanUserInput(body)
    const { comment,user } = formInput
    const  habitId  = req.params.id
    const userId = req.user.id
    // const user = req.user.email
    try {
      // const habitDelete = await User.query().findById(habitId)
     
        
      const newComment = await Comment.query().insert({comment,habitId,userId,user})
     
      return res.status(200).json({ commentPost: newComment });
   }
    catch (error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error });
      } else {
        return res.status(500).json({ errors: error });
      }
    
  }
  })
  tablesHabitsRouter.get("/allComments", async (req, res) => {
    const {userId} = req.params
    try {
       const habit = await Habit.query().findById(userId)
       habit.comments = await habit.$relatedQuery('comments')
      //  const users = await Habit.query().findById(userId)
      //   users.usersComments = await users.$relatedQuery("usersComments")
    
       return res.status(200).json({ habit});

     } catch (error) {
       return res.status(500).json(error);
     }
   });
  tablesHabitsRouter.get("/habitComment", async (req,res)=>{
    const {userId} = req.params
    const habitId = req.params.id
    try{
      const commentHabit = await Comment.query().findById(userId)
      commentHabit.habit = await commentHabit.$relatedQuery("habit")
      return res.status(200).json({commentHabit})
    }catch(error){
      return res.status(500).json(error)
    }
  })


  
  tablesHabitsRouter.delete("/:id", async(req,res)=>{
    const {userId} = req.params
    const id = req.params.id
    try{
        const habitDelete = await User.query().findById(userId)
        habitDelete.habits = await habitDelete.$relatedQuery('habits')
        if(req.user && habitDelete.id === req.user.id ){
            await habitDelete.$relatedQuery('habits').deleteById(id)
          return  res.status(200).json({message: 'This habit has been deleted'})
        } else{
          return  res.status(401).json({"AuthorizationError:":"User not authorized to delete review"})
        }
    }catch(error){
       return res.status(500).json(error)
    }
})


tablesHabitsRouter.patch("/:id", async(req,res) =>{
  const {good,bad,date} = req.body
  const {title,description} = cleanUserInput(req.body)
  const {userId} = req.params
   const id = req.params.id
  try{
    // if(!title){
    //   return res.status(422).json({"Error":"Please check your inputs and make sure everything is logged correctly"})
    // }
    const habitToEdit = await User.query().findById(userId)
    habitToEdit.habits = await habitToEdit.$relatedQuery('habits')
    if(req.user && habitToEdit.id === req.user.id){
      const updatedHabit = await habitToEdit.$relatedQuery('habits').patchAndFetchById(id,{
        title,description,good,bad,date
      })
     return res.status(200).json({habit: updatedHabit})
    }
  }catch(error){
    if(error instanceof ValidationError){
      return res.status(422).json({errors: error})
    } else {
    return res.status(500).json({errors: error})
  }
}
})


tablesHabitsRouter.patch("/", async(req,res) =>{
  const {good,bad} = req.body
  const {title,description} = cleanUserInput(req.body)
  const {userId} = req.params
   const id = req.params.id
   try{
     if(!title){
       return res.status(422).json({"Error":"Please check your inputs and make sure everything is logged correctly"})
     }
     const habitToEdit = await Habit.query().findById(userId)
  
     if(req.user && habitToEdit.userId === req.user.id){
       await habitToEdit.query().patch([{
         title,description,good,bad,date
       }])
      return res.status(200).json({habitToEdit})
     }
   }catch(error){
     if(error instanceof ValidationError){
       return res.status(422).json({errors: error})
     } else {
     return res.status(500).json({errors: error})
   }
 }
 })


  tablesHabitsRouter.post('/logPost', async(req,res) => {
    const {body} = req
    const formInput = cleanUserInput(body)
    const {notes, level} = formInput
    const {habitId} = req.params
    try{
      const newLog = await Log.query().insert({ notes, level,habitId})
      return res.status(200).json({test: newLog})
    }catch(error){
      if(error instanceof ValidationError){
        return res.status(422).json({error: error})
      }else{
        return res.status(500).json({error: error})
      }
    }


    
 
})

export default tablesHabitsRouter