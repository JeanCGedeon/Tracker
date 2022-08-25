import React, { useState } from "react";
import HabitsTestForm from "./HabitsTestForm";
import CommentHabitForm from "./CommentHabitForm";
import moment from "moment"
const HabitsTileTest = ({
  id,
  title,
  description,
  good,
  bad,
  date,
  deleteHabit,
  userId,
  creatorId,
  curUserId,
  patchHabit,
  errors,
  userLoggedIn,
  creator,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isBeingCommented,setIsBeingCommented] = useState(false)
  const buttons =
    <div>
      <input
        className="button"
        type="button"
        value="Edit Habit"
        onClick={() => {
          toggleEdit();
        }}
      />
      <input
        className="button"
        type="button"
        id="delete"
        value="Delete Habit"
        onClick={() => {
       deleteHabit(id);
        }}
      />
    </div>
  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };

  if (isBeingEdited) {
    return (
      <HabitsTestForm
        patchHabit={patchHabit}
        id={id}
        title={title}
        description={description}
        good={good}
        bad={bad}
        date={date}
        toggleEdit={toggleEdit}
        errors={errors}
      />
    )
  }
  
  const toggleBack = () =>{
    setIsBeingCommented(!isBeingCommented)
  }
  
  // if(isBeingCommented){
  // return(
  //   <div>
  //   <a href="#day">View Comments</a>
  //   <div id="day" className="comments-back">
  //     <div className="comments-box">
  //      <a href="" className="closebtn">
  //       ×
  //     </a>
  //   <CommentHabitForm
  //   key={tableObject.id}
  //   id={tableObject.id}
  //   userId={userId}
  //   />
  //   </div>

  // </div>
  // </div>
  //   )
  // }
  return (
    <div className="ree">
      <div className="comment-card">
      <a href="#day">View Comments</a>
    <div id="day" className="comments-back">
      <div className="comments-box">
       <a href="" className="closebtn">
        ×
      </a>
    <CommentHabitForm
   id={id}

    userId={userId}
    />
    </div>

  </div>
      </div>
      {buttons}
    </div>
  );
};
export default HabitsTileTest;
