
import { User } from "../../models/index.js";

class UserSeeder{
    static async seed(){
      const usersData = [
        {
          email: 'jean@hotmail.com',
          cryptedPassword: 'test'
        },
        {
          email: 'gedeon@gmail.com',
          cryptedPassword: 'second'
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
