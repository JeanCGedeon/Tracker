import React, { useState } from "react";
import HabitsTestForm from "./HabitsTestForm";
import CommentHabitForm from "./CommentHabitForm";
import moment from "moment";
import LogFormHabit from "./LogFormHabit";

const HabitsTileTest = ({
  id,
  title,
  description,
  good,
  bad,
  date,
  deleteHabit,
  userId,
  getComments,
  creatorId,
  curUserId,
  patchHabit,
  errors,
  userLoggedIn,
  creator,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isBeingLogged, setIsBeingLogged] = useState(false);
  const [isBeingCommented, setIsBeingCommented] = useState(false);
  const buttons = (
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
      <div></div>
      <a href="#logs">
        <input
          className="button"
          type="button"
          id="view"
          value="View Logs"
          onClick={() => {
            toggleBack(id);
          }}
        />
      </a>
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
  );
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
    );
  }

  const toggleFlip = () => {
    setIsBeingCommented(!isBeingCommented);
  };
  // const toggleUnFlip = () => {
  //   setIsBeingCommented(!isBeingCommented);
  // };
  if (isBeingCommented) {
    return (
      <div>
        {/* <a href="comments">View Comments</a> */}
        <div id="comments" className="comments-back">
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
            <CommentHabitForm key={id} id={id} userId={userId} />
          </div>
        </div>
      </div>
    );
  }

  const toggleBack = () => {
    setIsBeingLogged(!isBeingLogged);
  };

  if (isBeingLogged) {
    return (
      <div>
        <a href="#logs">View Logs</a>
        <div id="logs" className="logs-back">
          <div className="logs-box">
            <a href="" className="closebtn">
              ×
            </a>
            <LogFormHabit key={id} id={id} userId={userId} />
          </div>
        </div>
      </div>
    );
  }

  return <div className="ree">{buttons}</div>;
};
export default HabitsTileTest;
