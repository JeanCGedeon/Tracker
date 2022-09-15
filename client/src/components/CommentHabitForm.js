import React, { useState, useEffect } from "react";
import CommentHabitTile from "./CommentHabitTile";
import moment from "moment"
const CommentHabitForm = (props) => {
  // const [comments, setComments] = useState({ comment:"",habitId:0,users:{} });
  const [comments, setComments] = useState({ comments: [] });
  const [userEmail, setUserEmail] = useState({});

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
    const habitId = props.id;
    //using habitsRouter API change instead of tableHabitsRouter
    try {
      const response = await fetch(`/api/v1/logs/${habitId}/tables/comments`);
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
  };

  useEffect(() => {
    getComments();
  }, []);

  const deleteComment = async (habitId) => {
    try {
      const id = props.id;
      const response = await fetch(`/api/v1/logs/${habitId}/tables/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        if (response.status === 401) {
          const body = await response.json();
          return setErrors;
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const filteredComments = comments.comments.filter((comment) => {
          return comment.id !== habitId;
        });
        setErrors({});
        setComments({ ...comments, comments: filteredComments });
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
    }
  };
  
console.log(comments.comments)
  const commentListItem = comments.comments.map((commentObject) => {
    return (
      <h1 key={commentObject.id}>
        <div className="comment-list">
          <p className="comments-p">
            {commentObject.comment}
            <br />
           {userEmail.userName} commented on {moment(commentObject.date).format("MM/DD/yyyy")}
          </p>
          {/* <div className="comment-tile">
              <CommentHabitTile
              id={commentObject.id}
              deleteComment={deleteComment}
              />
            </div> */}
        </div>
      </h1>
    );
  });

  const postComment = async (newHabitsData) => {
    const habitId = props.id;
    const userId = props.userId;
    try {
      // const response = await fetch(`/api/v1/habits/${userId}/tables/postComment/${habitId}` first comment API
      //const response = await fetch(`/api/v1/logs/${habitId}/tables/postComment`, {
      const response = await fetch(`/api/v1/habits/postComment/${habitId}`, {
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
      comment: "",
      //   user:"",
      habitId: 0,
      userId: 0,
      date:""
    });
  };
  const [newComment, setNewComment] = useState({
    comment: "",
    // user:`${userEmail}`,
    habitId: 0,
    userId: 0,
    date:""
  });

  // const buttons = (
  //   <div>
  //     <input
  //       className="button"
  //       type="button"
  //       id="delete"
  //       value="Delete Habit"
  //       onClick={() => {
  //         deleteComment(id);
  //       }}
  //     />
  //   </div>
  // );

  return (
    <div className="asda">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment" id="label-center">
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
  );
};

export default CommentHabitForm;
