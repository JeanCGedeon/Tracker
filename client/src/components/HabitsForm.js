import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import HabitsTileTest from "./HabitsTileTest";
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
  const patchHabit = async (habitBody, habitId) => {
    try {
      const id = props.match.params.id;
      const response = await fetch(`/api/v1/habits/${id}/tables/${habitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitBody),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const updatedHabitsWithErrors = tables.habits.map((habit) => {
            if (habit.id === habitId) {
            }
            habit.errors = body;
            return habit;
          });
          setTables({ ...tables, habits: updatedHabitsWithErrors });
          return false;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        const updatedHabits = tables.habits.map((habit) => {
          if (habit.id === habitId) {
          habit.title = body.habit.title;
          habit.description = body.habit.description;
          habit.good = body.habit.good;
          habit.bad = body.habit.bad;
          habit.date = body.habit.date;
          }
          return habit;
        });
        setErrors({});
        setTables({ ...tables, habits: updatedHabits });
        return true;
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
      return false;
    }
  };



  
  let tablesListItem = tables.habits.map((tableObject) => {
    return (
      <h3 key={tableObject.id}>
        <div className="item">
        <Link to={`/logs/${tableObject.id}&logPost`}><p className="habit-title">{tableObject.title}</p></Link>

          <div className="test">
            <p className="habit-description">{tableObject.description}</p>
          </div>
          <p>{tableObject.good}</p>
          <div className="testing">
            <p className="habit-description">{moment(tableObject.date).format("MM/DD/yyyy")}</p>
          </div>
          <div className="Bottom-habit">
          <div className="something">
            <HabitsTileTest
              key={tableObject.id}
              id={tableObject.id}
              // creatorId={habitObject.userId}
              creator={tableObject.user}
              deleteHabit={deleteHabit}
              // curUserId={curUserId}
              patchHabit={patchHabit}

              // userLoggedIn={userLoggedIn}
            />
            </div>
          </div>
        </div>
      </h3>
    );
  });

  
  // let divChange = document.getElementsByClassName("testt")
  // let doubleTest ;

  // if(isBeingEdited){

  // }
  
  
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
        const filteredHabits = tables.habits.filter((habit) => {
          return habit.id !== habitId;
        });
        setErrors({});
        setTables({ ...tables, habits: filteredHabits });
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
    }
  };

  // const [isBeingEdited, setIsBeingEdited] = useState(false);
  // // const button =

  // //     <div className="habit-edit">
  // //       <input
  // //         className="button"
  // //         type="button"
  // //         value="Edit Habit"
  // //         onClick={() => {
  // //           toggleEdit(id);
  // //         }}
  // //       />
  // //     </div>

  // // let creatorId = tables.habits.userId;
  // // let curUserId = false;
  // // let userLoggedIn = false;
  // // if (props.user) {
  // //   curUserId = props.user.id;
  // //   userLoggedIn = true;
  // // }
  // const toggleEdit = () => {
  //   setIsBeingEdited(!isBeingEdited);
  // };
  // // const habitsTile = tables.habits.map((habitsObject) => {

              

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
  const handleBadRadioSelect = (event) => {
    setNewHabit({ ...newHabit, [event.currentTarget.name]: newHabit[event.currentTarget.name] });
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
console.log(props.userId)
  
  return (
    <div className="show-page-container list">
      <h2 className="intro-first-form">Here on the tracker site you are advised too stay on track for any habits you wish to keep track of wether they are good or bad.
      Under this paragraph you will see a form that you can type in and it will log into your own personal data to help you maintain a list of your own habits.
      click on the title of your habit to keep track of the logs you have for that habit ! Give it a try !</h2>
      <h2 className="add-habits"> Add Habits </h2>
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
          <textarea
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
            id="bad"
            name="good"
            onClick={handleBadRadioSelect}
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

        <input className="button-form" type="submit" value="Submit" />
      </form>
      <div className="habits-list">
        <h1>Habits</h1>

        {tablesListItem}
      </div>
    </div>
  );
    
  
};
export default HabitsForm;
