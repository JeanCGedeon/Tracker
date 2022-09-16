import express from "express";
import { Habit, User,Log, Comment} from "../../../models/index.js";

const graphsRouter = new express.Router()

// graphsRouter.get("/:id", async (req, res) => {
//     const userId = req.user.id
//      try {
//        const user = await User.query().findById(userId)
//        return res.status(200).json({ user });
//      } catch (error) {
//        return res.status(500).json(error);
//      }
//    });

  graphsRouter.get("/logs", async (req, res) => {
     try {
       const logs = await Log.query()
       return res.status(200).json({ logs });
     } catch (error) {
       return res.status(500).json(error);
     }
   });
 

  
graphsRouter.get("/:id/habits", async (req, res) => {
 const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    user.habits = await user.$relatedQuery('habits')
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
});


graphsRouter.get("/:id/goodHabits", async (req,res)=>{
const userId = req.user.id
try{
const userGoodHabits = await User.query().findById(userId)
userGoodHabits.good = await userGoodHabits.$relatedQuery("habits").where({good:true})
return res.status(200).json({userGoodHabits})
}catch(error){
    return res.status(500).json(error)
}
})


graphsRouter.get("/:id/allGood", async (req,res)=>{
    const userId = req.user.id
    
    try{
    const userGoodHabits = await User.query().findById(userId)
    userGoodHabits.jan = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/1/1","2022/1/31"]).where({good:true})
    userGoodHabits.feb = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/2/1","2022/2/28"]).where({good:true})
    userGoodHabits.mar = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/3/1","2022/3/31"]).where({good:true})
    userGoodHabits.apr = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/4/1","2022/4/30"]).where({good:true})
    userGoodHabits.may = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/5/1","2022/5/31"]).where({good:true})
    userGoodHabits.june = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/6/1","2022/6/30"]).where({good:true})
    userGoodHabits.july = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/7/1","2022/7/31"]).where({good:true})
    userGoodHabits.aug = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/8/1","2022/8/31"]).where({good:true})
    userGoodHabits.sept = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/9/1","2022/9/30"]).where({good:true})
    userGoodHabits.oct = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/10/1","2022/10/31"]).where({good:true})
    userGoodHabits.nov = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/11/1","2022/11/30"]).where({good:true})
    userGoodHabits.dec = await userGoodHabits.$relatedQuery("habits").whereBetween("date",["2022/12/1","2022/12/31"]).where({good:true})
    return res.status(200).json({userGoodHabits:userGoodHabits})
    }catch(error){
        return res.status(500).json(error)
    }
    })

//===================================================================================================

graphsRouter.get("/:id/badHabits", async (req,res)=>{
    const userId = req.user.id
    try{
    const userBadHabits = await User.query().findById(userId)
    userBadHabits.good = await userBadHabits.$relatedQuery("habits").where({good:false})
    return res.status(200).json({userBadHabits})
    }catch(error){
        return res.status(500).json(error)
    }
    })
    
    graphsRouter.get("/:id/allBad", async (req,res)=>{
        const userId = req.user.id
        
        try{
        const userBadHabits = await User.query().findById(userId)
        userBadHabits.jan = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/1/1","2022/1/31"]).where({good:false})
        userBadHabits.feb = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/2/1","2022/2/28"]).where({good:false})
        userBadHabits.mar = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/3/1","2022/3/31"]).where({good:false})
        userBadHabits.apr = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/4/1","2022/4/30"]).where({good:false})
        userBadHabits.may = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/5/1","2022/5/31"]).where({good:false})
        userBadHabits.june = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/6/1","2022/6/30"]).where({good:false})
        userBadHabits.july = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/7/1","2022/7/31"]).where({good:false})
        userBadHabits.aug = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/8/1","2022/8/31"]).where({good:false})
        userBadHabits.sept = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/9/1","2022/9/30"]).where({good:false})
        userBadHabits.oct = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/10/1","2022/10/31"]).where({good:false})
        userBadHabits.nov = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/11/1","2022/11/30"]).where({good:false})
        userBadHabits.dec = await userBadHabits.$relatedQuery("habits").whereBetween("date",["2022/12/1","2022/12/31"]).where({good:false})
        return res.status(200).json({userBadHabits})
        }catch(error){
            return res.status(500).json(error)
        }
        })

export default graphsRouter