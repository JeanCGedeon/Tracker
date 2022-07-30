import React, { useState } from "react";
import LogHabitsForm from "./LogHabitsForm";
const logHabitsTile = ({
  id,
  notes,
  level,
  date,
  deleteLog,
  creatorId,
  curUserId,
  patchLog,
  errors,
  userLoggedIn,
  creator,
},props) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const buttons =
    <div>
      <input
        className="button"
        type="button"
        value="Edit Log"
        onClick={() => {
          toggleLogEdit();
        }}
      />
      <input
        className="button"
        type="button"
        value="Delete Log"
        onClick={() => {
         deleteLog(id);
        }}
      />
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
        toggleEdit={toggleEdit}
        errors={errors}
      />
    )
  }

  return (
    <div className="ree">
      {buttons}
    </div>
  );
};
export default logHabitsTile;
