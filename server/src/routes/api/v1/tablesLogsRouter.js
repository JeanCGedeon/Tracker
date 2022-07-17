import express from 'express'
import { ValidationError } from 'objection'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { Habit, User,Log } from '../../../models/index.js'

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
    const {notes, level, date} = formInput
    const {habitId} = req.params
    try{
      const newLog = await Log.query().insert({ notes, level,habitId, date})
      return res.status(200).json({test: newLog})
    }catch(error){
      if(error instanceof ValidationError){
        return res.status(422).json({error: error})
      }else{
        return res.status(500).json({error: error})
      }
    }
 
})

export default tablesLogsRouter