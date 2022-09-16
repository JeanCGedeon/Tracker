import React, { useState, useEffect } from "react";
import moment from "moment"
const CommentLogForm = (props) =>{
    // const [comments, setComments] = useState({ comment:"",habitId:0,users:{} });
    const [comments, setComments] = useState({  comments:[]})
    const [userEmail, setUserEmail] = useState({})
  
  const [errors, setErrors] = useState([]);

  const getUserEmail = async () => {
    try {
  const id = props.userId
      const response = await fetch(`/api/v1/habits/email/:id`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setUserEmail(parsedResponse.email);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  const getComments = async () => {
      const logId = props.id;
    //using habitsRouter API change instead of tableHabitsRouter
      try {
          const response = await fetch(`/api/v1/logs/${logId}/tables/commentsLogs`);
          if (!response.ok) {
              const errorMessage = `${response.status} (${response.statusText})`;
              const error = new Error(errorMessage);
              throw error;
          }
          const parsedResponse = await response.json();
          setComments(parsedResponse.logs);
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`);
      }
  }
        
                useEffect(() => {
                    getComments()
                }, []);


                // console.log(props)
                const commentListItem = comments.comments.map((commentObject)=>{
                    return(
                        <h1 key={commentObject.id}>
      <div className="comment-list">
        <p className="comments-p">{commentObject.comment}
        {userEmail.userName} commented on {moment(commentObject.date).format("MM/DD/yyyy")}
        </p>
        </div>
      </h1>
  )
})

  const postComment = async (newHabitsData) => {
  const logId= props.id
    const userId = props.userId
        try {
            // const response = await fetch(`/api/v1/habits/${userId}/tables/postComment/${habitId}` first comment API
          //const response = await fetch(`/api/v1/logs/${habitId}/tables/postComment`, {
            const response = await fetch(`/api/v1/habits/postCommentLogs/${logId}`,{
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
        //   user:"",
          logId:0,
          userId:0,
          date:""
        });
      };
      const [newComment, setNewComment] = useState({
        comment:"",
        // user:`${userEmail}`,
        logId:0,
        userId:0,
        date:""
       });
    return(
        <div className="asda">
            <form onSubmit={handleSubmit}>
            <label htmlFor="comment" id="label-center" >
                comment
                <textarea
                className="comment-description"
                type="text"
                name="comment"
                id="comment-description"
                onChange={handleInputChange}
                value={newComment.comment}
                />
            </label>
            <label htmlFor="date" id="label-center">
      date
          <input
             className="comment-description"
            type="date"
            id="comment-description"
            name="date"
            onChange={handleInputChange}
            value={newComment.date}
          />
        </label>
          {/* <label>
             user
                <input
                className="comment-description"
                type="text"
                name="user"
                id="comment-description"
                onChange={handleInputChange}
                value={newComment.user}/>
            </label> */}
            {/* <label>
                userId
                <input
                className="comment-description"
                type="text"
                name="userId"
                id="comment-description"
                onChange={handleInputChange}
                value={newComment.userId}/>
            </label> */}
            {/* <p>{newComment.user}</p> */}
      <input className="button-form" type="submit" value="Submit" id="input-comment" />
      </form>
          {commentListItem}
        {/* <p>{comments.comment}</p>
        <p>{comments.habitId}</p>
        <p>{comments.users.email}</p> */}
        </div>
    )
}

export default CommentLogForm