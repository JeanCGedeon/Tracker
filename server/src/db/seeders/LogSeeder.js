import { Log } from "../../models/index.js";

class LogSeeder{
    static async async(){
        const logsData = [{
            id:1
        },
        {
            id:2
        },
        {
            id:3
        }
              ]
    }
}
for(const singleLogsData of logsData) {
    const currentLog = await Log.query().findOne(singleLogsData)
    if(!currentLog){
        await Log.query().insert(singleLogsData)
    }
}

export default LogSeeder