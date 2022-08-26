import React, { useState, useEffect } from "react";

const CommentHabitForm = (props) =>{
    // const [comments, setComments] = useState({ comment:"",habitId:0,users:{} });
    const [comments, setComments] = useState({  comments:[]})
  const [newComment, setNewComment] = useState({
   comment:"",
   user:"",
   habitId:0,
   userId:0
  });
  const [errors, setErrors] = useState([]);
    
//   const getComments = async () => {
//     //   userId = props.userId
//     try {
//        const   habitId = props.id
//           const response = await fetch(`/api/v1/habits/${habitId}/tables/allComments`);
//       if (!response.ok) {
//         const errorMessage = `${response.status} (${response.statusText})`;
//         const error = new Error(errorMessage);
//         throw error;
//       }
//       const parsedResponse = await response.json();
//       setComments(parsedResponse.habit);
//     } catch (error) {
//       console.error(`Error in fetch: ${error.message}`);
//     }
//   };

  console.log(props)
// const getComments = async () => {
//     const id = props.id;
//   try {
//     const response = await fetch(`/api/v1/habits/${id}/tables/habitComment`);
//     if (!response.ok) {
//       const errorMessage = `${response.status} (${response.statusText})`;
//       const error = new Error(errorMessage);
//       throw error;
//     }
//     const parsedResponse = await response.json();
//     setComments(parsedResponse.comment);
//   } catch (error) {
//     console.error(`Error in fetch: ${error.message}`);
//   }
// };

  useEffect(() => {
 const getComments = async () => {
    const id = props.id;
  try {
    const response = await fetch(`/api/v1/habits/${id}/tables/allComments`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const parsedResponse = await response.json();
    setComments(parsedResponse.habit);
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
  }
 getComments()
}, []);
console.log(comments)

const commentListItem = comments.comments.map((commentObject)=>{
  return(
      <h1 key={commentObject.id}>
      <div className="comment-list">
        <p>{commentObject.comment}</p>
      <div>
      </div>
      <div>
          <p>{commentObject.user}</p>
          <p>{commentObject.userId}</p>
          <p>{commentObject.habitId}</p>
      </div>
      </div>
      </h1>
  )
})

  const postComment = async (newHabitsData,userId,habitId) => {
  habitId= props.id
     userId = props.userId
        try {
          const response = await fetch(`/api/v1/habits/${userId}/tables/postComment/${habitId}`, {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(newHabitsData),
          });
          if (!response.ok) {
            if (response.status === 422) {
              const body = await response.json();
              const newErrors = translateServerErrors(body.errors.data);
              return setErrors(newErrors);
            }
            throw new Error(`${response.status} (${response.statusText})`);
          } else {
            const body = await response.json();
            const updatedComments = comments.comments.concat(body.commentPost);
            setComments({ ...comments, comments: updatedComments });
            setErrors([]);
          }
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`);
        }
      };
// const postComment = async (newHabitsData) => {
//     try {
//       const userId = props.id;
//       const response = await fetch(`/api/v1/habits/${userId}/tables/postComment`, {
//         method: "POST",
//         headers: new Headers({ "Content-Type": "application/json" }),
//         body: JSON.stringify(newHabitsData),
//       });
//       if (!response.ok) {
//         if (response.status === 422) {
//           const body = await response.json();
//           const newErrors = translateServerErrors(body.errors.data);
//           return setErrors(newErrors);
//         }
//         throw new Error(`${response.status} (${response.statusText})`);
//       } else {
//         const body = await response.json();
//         setComments({ ...comments, comments: body });
//         setErrors([]);
//       }
//     } catch (error) {
//       console.error(`Error in fetch: ${error.message}`);
//     }
//   };

      const handleInputChange = (event) => {
        setNewComment({
          ...newComment,
          [event.currentTarget.name]: event.currentTarget.value,
        });
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
    await postComment(newComment);
        clearForm();
      };
   
      const clearForm = () => {
        setNewComment({
          comment:"",
          user:"",
          habitId:0,
          userId:0,
        });
      };

    return(
        <div className="asda">
            <form onSubmit={handleSubmit}>
            <label htmlFor="comment" id="label-center" >
                comments
                <textarea
                className="comment-description"
                type="text"
                name="comment"
                id="comment-description"
                onChange={handleInputChange}
                value={newComment.comment}
                />
            </label>
            
            <label>
                habitId
                <input
                className="comment-description"
                type="text"
                name="habitId"
                id="comment-description"
                onChange={handleInputChange}
                value={newComment.habitId}/>
            </label>
            <label>
                userId
                <input
                className="comment-description"
                type="text"
                name="userId"
                id="comment-description"
                onChange={handleInputChange}
                value={newComment.userId}/>
            </label>
            {/* <p>{newComment.user}</p> */}
      <input className="button-form" type="submit" value="Submit" id="input" />
      </form>
          {commentListItem}
        {/* <p>{comments.comment}</p>
        <p>{comments.habitId}</p>
        <p>{comments.users.email}</p> */}
        </div>
    )
}

export default CommentHabitForm