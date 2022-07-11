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
        <Link to={`/habits/${habitObject.id}/logs`}>{habitObject.title}</Link>
        <p>{habitObject.description}</p>
        <p>{habitObject.good}</p>
        <p>{habitObject.userId}</p>
      </h2>
    );
  });

  const postHabit = async (newHabitsData) => {
    try {
      const response = await fetch(`/api/v1/habits`, {
        method: "POST",
        headers: ({ "Content-Type": "application/json" }),
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
        setErrors([]);
        setShouldRedirect(true);
      }
    } catch (error) {}
  };
  
  const handleInputChange = (event) => {
    setNewHabit({
      ...newHabit,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    postHabit(newHabit);
    clearForm();
  };
  
  const clearForm = () => {
    setNewHabit({
      title: "",
      description: "",
      good: false,
      userId: 0,
    });
  };
  
  return (
    <div className="show-page-container list">
      <h2>Ignore </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          title:
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={newHabit.title}
          />
        </label>
  
        <label htmlFor="description">
          description:
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={newHabit.description}
          />
        </label>
  
        <label htmlFor="good">
          Good:
          <input
            type="radio"
            id="good"
            name="good"
            onChange={handleInputChange}
            value={newHabit.good}
          />
        </label>
  
         {/* <label htmlFor="good">
          userId
          <input
            onChange={handleInputChange}
            value={newHabit.userId}
          />
        </label>  */}
  
        <input className="button" type="submit" value="Submit" />
      </form>
      <div className="habitsList">
        <h1>Habits
        </h1>
          {habitListItems}
      
      </div>
    </div>
  );
  // return(
  //     <div className="habitsList">
  //       <h1>Habits
  //       </h1>
  //     {habitListItems}
      
  //     </div>
  // );
};

export default GoodHabitsList;
