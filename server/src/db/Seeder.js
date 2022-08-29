/* eslint-disable no-console */
import { connection } from "../boot.js"
import HabitSeeder from "./seeders/HabitSeeder.js"
import LogSeeder from "./seeders/LogSeeder.js"
import UserSeeder from "./seeders/UserSeeders.js"
import CommentSeeder from "./seeders/CommentSeeder.js"
class Seeder {
  static async seed() {
    // include individual seed commands here
   
    console.log('Seeding users')
    await UserSeeder.seed()
    console.log('seeding habits...')
    await HabitSeeder.seed()
    console.log('Seeding logs')
    await LogSeeder.seed()
    console.log('Seeding comments')
    await CommentSeeder.seed()
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder