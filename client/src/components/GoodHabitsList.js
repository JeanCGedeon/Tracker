import React, { useState, useEffect } from "react";
import HabitsForm from "./HabitsForm";
import { Link } from "react-router-dom";
import ErrorList from "./layout/ErrorList";

import { Redirect } from "react-router-dom";

import translateServerErrors from "../../../server/src/services/translateServerErrors";

const GoodHabitsList = (props) => {
  const [habits, setHabits] = useState({ habits: [] });
  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    good: false,
    userId:0
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to="/habits" />;
  }

  const getHabits = async () => {
    try {
      const id = props.match.params.id
      const response = await fetch(`/api/v1/habits/${id}/tables/myGood`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setHabits(parsedResponse.myGoodHabits);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  const habitListItems = habits.habits.map((habitObject) => {
    return (
      <h2 key={habitObject.id}>
        <Link to={`/logs/${habitObject.id}&logPost`}>{habitObject.title}</Link>
        <p>{habitObject.description}</p>
        <p>{habitObject.good}</p>
        <p>{habitObject.userId}</p>
      </h2>
    );
  });
  
  return (
      <div className="habitsList">
        <h1>Habits
        </h1>
          {habitListItems}
      
      </div>
  );
};

export default GoodHabitsList;
