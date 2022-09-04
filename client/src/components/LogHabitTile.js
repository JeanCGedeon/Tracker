import React, { useState } from "react";
import LogHabitsForm from "./LogHabitsForm";
import CommentHabitForm from "./CommentHabitForm";
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
      {/* <a href="#comments"> */}
        <input
          className="button"
          type="button"
          id="view"
          value="View Comments"
          onClick={() => {
            toggleFlip(id);
          }}
        />
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


  return (
    <div className="ree" id="ree">
      {buttons}
    </div>
  );
};
export default logHabitsTile;
