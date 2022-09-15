import express from 'express'
import { ValidationError } from 'objection'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { Habit, User,Log,Comment } from '../../../models/index.js'

const tablesLogsRouter = new express.Router({mergeParams: true })


tablesLogsRouter.get("/myLogs", async(req,res) =>{
    const {habitId} = req.params
    try{
      const myLogs = await Habit.query().findById(habitId)
      myLogs.logs = await myLogs.$relatedQuery("logs")
      return res.status(200).json({myLogs})
    }catch(error) {
      return res.status(500).json(error)
    }
  })
  

tablesLogsRouter.post('/logPost', async(req,res) => {
    const {body} = req
    const formInput = cleanUserInput(body)
    const {notes, date} = formInput
    const {habitId} = req.params
    try{
      const habitDelete = await User.query().findById(req.user.id)
      if(req.user && habitDelete.id === req.user.id ){
      const newLog = await Log.query().insert({ notes, habitId, date})
      return res.status(200).json({test: newLog})
      }
    }catch(error){
      if(error instanceof ValidationError){
        return res.status(422).json({error: error})
      }else{
        return res.status(500).json({error: error})
      }
    }
})



    tablesLogsRouter.delete("/:id", async(req,res)=>{
        const {habitId} = req.params
        const id = req.params.id
        try{
          const habitDelete = await User.query().findById(req.user.id)
          if(req.user && habitDelete.id === req.user.id ){
            const habitDelete = await Habit.query().findById(habitId)
            habitDelete.logs = await habitDelete.$relatedQuery('logs')
           
                await habitDelete.$relatedQuery('logs').deleteById(id)
              return  res.status(200).json({message: 'This habit has been deleted'})
          }
        }catch(error){
           return res.status(500).json(error)
        }
    })

    tablesLogsRouter.patch("/:id", async(req,res) =>{
        const {date} = req.body
        const {notes} = cleanUserInput(req.body)
        const {habitId} = req.params
         const id = req.params.id
        try{
          // if(!title){
          //   return res.status(422).json({"Error":"Please check your inputs and make sure everything is logged correctly"})
          // }
          const habitToEdit = await Habit.query().findById(habitId)
          habitToEdit.logs = await habitToEdit.$relatedQuery('logs')
         
            const updatedLogs = await habitToEdit.$relatedQuery('logs').patchAndFetchById(id,{
           notes,date
            })
           return res.status(200).json({log: updatedLogs})
          
        }catch(error){
          if(error instanceof ValidationError){
            return res.status(422).json({errors: error})
          } else {
          return res.status(500).json({errors: error})
        }
      }
      })
 
//for habits
      tablesLogsRouter.get("/comments", async (req, res) => {
        const  {habitId}  = req.params
        try {
          const habit = await Habit.query().findById(habitId);
          habit.comments = await habit.$relatedQuery("comments");
          return res.status(200).json({ habit });
        } catch(error) {
          return res.status(500).json(error);
        }
      });
  

      //for logs
      tablesLogsRouter.get("/commentsLogs", async (req, res) => {
        const  {habitId}  = req.params
        try {
          const logs = await Log.query().findById(habitId);
          logs.comments = await logs.$relatedQuery("comments");
          return res.status(200).json({ logs });
        } catch(error) {
          return res.status(500).json(error);
        }
      });
  
   //delete for habits copied from table habits router
tablesLogsRouter.delete("/:id", async (req, res) => {
  const { habitId } = req.params;
  const userId = req.params.id;
  try {
    const habitDelete = await User.query().findById(req.user.id)
    if(req.user && habitDelete.id === req.user.id ){ 
      const habitDelete = await Habit.query().findById(habitId);
      habitDelete.comments = await habitDelete.$relatedQuery("comments");
      await habitDelete.$relatedQuery("comments").deleteById(habitId);
      return res.status(200).json({ message: "This habit has been deleted" });
    } else {
      return res
        .status(401)
        .json({ "AuthorizationError:": "User not authorized to delete review" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

      // tablesLogsRouter.post("/postComment", async (req, res) => {
      //   const { body } = req;
      //   const formInput = cleanUserInput(body);
      //   const { comment } = formInput;
      //   const {habitId} = req.params
      //   const userId = req.user.id;
      //   try {
      //     const newComment = await Comment.query().insert({ comment, habitId, userId });
      //    return res.status(200).json({ commentPost: newComment });
      //   } catch (error) {
      //     if (error instanceof ValidationError) {
      //       return res.status(422).json({ errors: error });
      //     } else {
      //       return res.status(500).json({ errors: error });
      //     }
      //   }
      // });
      

export default tablesLogsRouter