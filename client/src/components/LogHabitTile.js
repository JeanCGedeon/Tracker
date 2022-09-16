import React, { useState,useEffect } from "react";
import LogHabitsForm from "./LogHabitsForm";
import CommentLogForm from "./CommentLogForm";
const logHabitsTile = ({
  id,
  notes,
  level,
  date,
  deleteLog,
  userId,
  creatorId,
  curUserId,
  patchLog,
  errors,
  userLoggedIn,
  creator,
},props) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isBeingCommented, setIsBeingCommented] = useState(false);
  const [comments, setComments] = useState({ comments: [] });

  const getComments = async () => {
    const habitId = id;
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
let commentLength = comments.comments.length
  const buttons =
    <div className="jar">
      <input
        className="button" id="edit"
        type="button"
        value="Edit Log"
        onClick={() => {
          toggleLogEdit();
        }}
      />
    
      <input
        className="button" id="delete"
        type="button"
        value="Delete Log"
        onClick={() => {
         deleteLog(id);
        }}
      />
       <div></div>
      {/* <a href="#comments-log"> */}
        <input
          className="button"
          type="button"
          id="view-log"
          value="View Comments"
          onClick={() => {
            toggleFlip(id);
          }}
        />
         <p className="comments-length-log">{commentLength} comments</p>
      {/* </a> */}
 
    </div>
  const toggleLogEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };

  if (isBeingEdited) {
    return (
      <LogHabitsForm
        patchLog={patchLog}
        id={id}
       notes={notes}
        date={date}
        toggleLogEdit={toggleLogEdit}
        errors={errors}
      />
    )
  }
  const toggleFlip = () => {
    setIsBeingCommented(!isBeingCommented);
  };
 
  if (isBeingCommented) {
    return (
      <div>
        {/* <a href="comments">View Comments</a> */}
        <div id="comments-log" className="comments-back">
          <div className="comments-box">
          <input
          className="button"
          type="button"
          id="exit"
          value="Exit Comments"
          onClick={() => {
            toggleFlip(id);
          }}
          />
          {/* <a href="" className="closebtn">
              ×
            </a> */}
            <CommentLogForm key={id} id={id} userId={userId} />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="ree" id="ree">
      {buttons}
    </div>
  );
};
export default logHabitsTile;
