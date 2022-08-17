import React, { useState, useEffect } from "react";
import HabitsForm from "./HabitsForm";
import HabitsTileTest from "./HabitsTileTest";
import { Link } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import moment from "moment"

import { Redirect } from "react-router-dom";

import translateServerErrors from "../../../server/src/services/translateServerErrors";

const BadHabitsList = (props) => {
  const [habits, setHabits] = useState({ habits: [] });
  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    good: false,
    userId: 0,
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to="/habits" />;
  }

  const getHabits = async () => {
    try {
      const userId = props.match.params.id;
      const response = await fetch(`/api/v1/habits/${userId}/tables/myBad`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setHabits(parsedResponse.myBadHabits);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  const patchHabit = async (habitBody, habitId) => {
    try {
      const userId = props.match.params.id;
      const response = await fetch(`/api/v1/habits/${userId}/tables/${habitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitBody),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const updatedHabitsWithErrors = habits.habits.map((habit) => {
            if (habit.id === habitId) {
              habit.errors = body;
            }
            return habit;
          });
          setHabits({ ...habits, habits: updatedHabitsWithErrors });
          return false;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        const updatedHabits = habits.habits.map((habit) => {
          if (habit.id === habitId) {
            habit.title = body.habit.title;
            habit.description = body.habit.description;
            habit.good = body.habit.good;
            habit.bad = body.habit.bad;
            habit.date = body.habit.date;
            if (habit.errors) {
              delete habit.errors;
            }
          }
          return habit;
        });
        setErrors({});
        setHabits({ ...habits, habits: updatedHabits });
        return true;
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
      return false;
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      const id = props.match.params.id;
      const response = await fetch(`/api/v1/habits/${id}/tables/${habitId}`, {
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
        const filteredHabits = habits.habits.filter((habit) => {
          return habit.id !== habitId;
        });
        setErrors({});
        setHabits({ ...habits, habits: filteredHabits });
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
    }
  };

  const habitListItems = habits.habits.map((habitObject) => {
    return (
      <h2 key={habitObject.id}>
        <div className="item">
          <Link to={`/logs/${habitObject.id}&logPost`}>
            <p className="habit-title">{habitObject.title}</p>
          </Link>
          <div className="test">
            <p className="habit-description">{habitObject.description}</p>
          </div>
          <p>{habitObject.good}</p>
          <p>{habitObject.bad}</p>
          <div className="testing">
            <p className="habit-description">{moment(habitObject.date).format("MM/DD/yyyy")}</p>
          </div>
          <div className="something">
            <HabitsTileTest
              key={habitObject.id}
              id={habitObject.id}
              // creatorId={habitObject.userId}
              creator={habitObject.user}
              deleteHabit={deleteHabit}
              // curUserId={curUserId}
              patchHabit={patchHabit}

              // userLoggedIn={userLoggedIn}
            />
          </div>
        </div>
      </h2>
    );
  });



  return (
    <div className="badHabitsList">
      <h1 className="center">Bad Habits</h1>
      <h3 className="good-bad-list-intro"></h3>
      {habitListItems}
    </div>
  );
};

export default BadHabitsList;
