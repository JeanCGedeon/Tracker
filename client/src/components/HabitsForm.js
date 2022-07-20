import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../../../server/src/services/translateServerErrors";
import moment from "moment";
const HabitsForm = (props) => {
  const [tables, setTables] = useState({ habits: [] });
  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    good: false,
    bad: false,
    date: "",
  });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to="/habits" />;
  }

  const getTables = async () => {
    try {
      const userId = props.match.params.id;

      const response = await fetch(`/api/v1/habits/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setTables(parsedResponse.user);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  const tablesListItem = tables.habits.map((tableObject) => {
    return (
      <h3 key={tableObject.id}>
        <div className="item">
         
            <p className="habit-title">{tableObject.title}</p>
  
          <div className="test">
            <p className="habit-description">{tableObject.description}</p>
          </div>
          <p>{tableObject.good}</p>
          <div className="testing">
            <p className="habit-description">{moment(tableObject.date).format("MM/DD/YYYY")}</p>
          </div>
        </div>
      </h3>
    );
  });

  const postHabit = async (newHabitsData) => {
    try {
      const userId = props.match.params.id;
      const response = await fetch(`/api/v1/habits/${userId}/tables/post`, {
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
        const updatedHabits = tables.habits.concat(body.table);
        setTables({ ...tables, habits: updatedHabits });
        setErrors([]);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewHabit({
      ...newHabit,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleRadioSelect = (event) => {
    setNewHabit({ ...newHabit, [event.currentTarget.name]: !newHabit[event.currentTarget.name] });
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
      bad: false,
      date: "",
    });
  };

  return (
    <div className="show-page-container list">
      <h2> Add Habits </h2>
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
            onClick={handleRadioSelect}
            value={newHabit.good}
          />
          Bad:
          <input
            type="radio"
            id="good"
            name="bad"
            onClick={handleRadioSelect}
            value={newHabit.bad}
          />
        </label>

        <label htmlFor="date">
          date:
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={newHabit.date}
          />
        </label>

        <input className="button" type="submit" value="Submit" />
      </form>
      <div className="habits-list">
        <h1>Habits</h1>
        {tablesListItem}
      </div>
    </div>
  );
};

export default HabitsForm;
