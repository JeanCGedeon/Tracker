import { Log } from "../../models/index.js";

class LogSeeder{
    static async seed(){
        const logsData = [{
            notes:'upgraded my workout',
            level:'7',
            habitId:1
    
        },
        {
            notes:'tested for injuries',
            level:4,
            habitId:1
        
        },
        {
          notes:'Lagged my third attempt',
          level:9,
          habitId:2
      
        }
              ]
              for(const singleLogData of logsData) {
                  const currentLog = await Log.query().findOne(singleLogData)
                  if(!currentLog){
                      await Log.query().insert(singleLogData)
                  }
              }
    }
}

export default LogSeeder