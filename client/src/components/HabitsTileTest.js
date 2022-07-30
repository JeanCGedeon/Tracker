import React, { useState } from "react";
import HabitsTestForm from "./HabitsTestForm";
import moment from "moment"
const HabitsTileTest = ({
  id,
  title,
  description,
  good,
  bad,
  date,
  deleteHabit,
  creatorId,
  curUserId,
  patchHabit,
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
        value="Edit Habit"
        onClick={() => {
          toggleEdit();
        }}
      />
      <input
        className="button"
        type="button"
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
  console.log(patchHabit)

  return (
    <div className="ree">
      {buttons}
    </div>
  );
};
export default HabitsTileTest;
