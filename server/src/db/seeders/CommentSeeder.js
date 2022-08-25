import { Comment } from "../../models/index.js";

class CommentSeeder {
  static async seed() {
    const commentsData = [{
        comment:"Try using a remeedy to go to sleep",
        // user:"gedeon@gmail.com",
        userId:2,
        habitId:1,
    },
{
        comment:"Do you mix cardio and lifting wieghts up?",
        // user:"gedeon@gmail.com",
        userId:2,
        habitId:2
},

{comment:"try",
// user:"gedeon@gmail.com",
userId:1,
habitId:2
},
      {  comment:"Yes I have , I do mostly cardio",
        // user:"jean@hotmail.com",
        userId:1,
        habitId:2    
  },
  {
      comment:"Whats your favorite workout?",
    //   user:"jean@hotmail.com",
      userId:1,
      habitId:9
  },
    {
        comment:"Push ups",
        // user:"gedeon@gmail.com",
        userId:2,
        habitId:9
    }
];
for(const singleCommentData of commentsData){
    const currentComment = await Comment.query().findOne(singleCommentData);
    if (!currentComment) {
      await Comment.query().insert(singleCommentData);
    }
}
  }
}

export default CommentSeeder