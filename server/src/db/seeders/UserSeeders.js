
import { User } from "../../models/index.js";

class UserSeeder{
    static async seed(){
      const usersData = [
        {
          email: 'jean@hotmail.com',
          // userName:"First",
          cryptedPassword: 'test',
          userName:"Jean Gedeon Test Seeder"
        },
        {
          email: 'gedeon@gmail.com',
          // userName:"Second",
          cryptedPassword: 'second',
          userName:"YaBoyJeanTestSeeder"
        }
      ];
  
      for (const singleUserData of usersData) {
        const currentUser = await User.query().findOne(singleUserData);
        if (!currentUser) {
          await User.query().insert(singleUserData);
        }
      }
    }
  }
  
  export default UserSeeder;
