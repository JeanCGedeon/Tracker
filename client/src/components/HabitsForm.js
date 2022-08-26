import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import HabitsTileTest from "./HabitsTileTest";
import ErrorList from "./layout/ErrorList";
import CommentHabitForm from "./CommentHabitForm";
import translateServerErrors from "../../../server/src/services/translateServerErrors";
import moment from "moment";
import LogForm from "./LogForm";
const HabitsForm = (props) => {
  const [tables, setTables] = useState({ habits: [] });
  const [isBeingCommented, setIsBeingCommented] = useState(false);
  const [comments, setComments] = useState([]);
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
  // const postComment = async (newHabitsData) => {
  //   try {
  //     const userId = props.match.params.id;
  //     const response = await fetch(`/api/v1/habits/${userId}/tables/postComment`, {
  //       method: "POST",
  //       headers: new Headers({ "Content-Type": "application/json" }),
  //       body: JSON.stringify(newHabitsData),
  //     });
  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         const body = await response.json();
  //         const newErrors = translateServerErrors(body.errors.data);
  //         return setErrors(newErrors);
  //       }
  //       throw new Error(`${response.status} (${response.statusText})`);
  //     } else {
  //       const body = await response.json();
  //       const updatedComments = comments.concat(body.commentPost);
  //       setComments({ ...comments, comments: updatedComments });
  //       setErrors([]);
  //     }
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };
      
  
  const userId = props.match.params.id
  let tablesListItem = tables.habits.map((tableObject) => {
    const getComments = async () => {
      //   userId = props.userId
      try {
         const   habitId = tableObject.id
            const response = await fetch(`/api/v1/habits/${habitId}/tables/allComments`);
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const parsedResponse = await response.json();
        setComments(parsedResponse.habit);
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    };
    return (
      <h3 key={tableObject.id}>
        <div className="item">
          <Link to={`/logs/${tableObject.id}&logPost`}>
            <p className="habit-title">{tableObject.title}</p>
          </Link>

          <div className="test">
            <p className="habit-description">{tableObject.description}</p>
          </div>
          <p>{tableObject.good}</p>
          <div className="testing">
            <p className="habit-description">{moment(tableObject.date).format("MM/DD/yyyy")}</p>
          </div>
          {/* <input
              className="button-comment"
              type="button"
              value="View Comments"
              onClick={()=>{
                toggleBack()
              }}
              /> */}
          {/* <div className="trek">
                <input
                  className="button-comment"
                  type="button"
                  value="View Comments"
                  onClick={() => {
                    toggleBack();
                  }}
                />
              </div> */}
          <div className="something-else">
            <HabitsTileTest
             
              id={tableObject.id}
              userId={userId}
              // creatorId={habitObject.userId}
              creator={tableObject.user}
              deleteHabit={deleteHabit}
              getComments={getComments}
              // curUserId={curUserId}
              patchHabit={patchHabit}

              // userLoggedIn={userLoggedIn}
            />
          </div>
          {/* <a href="#day">View Comments</a>
            <div id="day" className="comments-back">
              <div className="comments-box">
               <a href="" className="closebtn">
                ×
              </a>
            <CommentHabitForm
            key={tableObject.id}
            id={tableObject.id}
            userId={userId}
            />
            </div>
      
          </div> */}
          {/* <div className="flip-card-back">
          </div> */}
        </div>
      </h3>
    );
  });
  const toggleBack = () => {
    setIsBeingCommented(!isBeingCommented);
  };

  if (isBeingCommented) {
    return <CommentHabitForm />;
  }

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
  // const postComment = async (newHabitsData) => {
  //   try {
  //     const userId = props.match.params.id;
  //     const response = await fetch(`/api/v1/habits/${userId}/tables/postComment`, {
  //       method: "POST",
  //       headers: new Headers({ "Content-Type": "application/json" }),
  //       body: JSON.stringify(newHabitsData),
  //     });
  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         const body = await response.json();
  //         const newErrors = translateServerErrors(body.errors.data);
  //         return setErrors(newErrors);
  //       }
  //       throw new Error(`${response.status} (${response.statusText})`);
  //     } else {
  //       const body = await response.json();
  //       const updatedComments = comments.concat(body.commentPost);
  //       setComments({ ...comments, comments: updatedComments });
  //       setErrors([]);
  //     }
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

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
 

  return (
    <div className="show-page-container list">
      <h2 className="intro-first-form"></h2>
      <h2 className="center"> Create Habit(s) </h2>
      <form onSubmit={handleSubmit} className="breathe">
        <label htmlFor="name" className="title" id="label-center">
          title
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={newHabit.title}
          />
        </label>

        <label htmlFor="description" className="title" id="label-center">
          description
          <textarea
            className="input"
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={newHabit.description}
          />
        </label>

        <label htmlFor="good" className="title" id="label-center">
          Good
          <input
            type="radio"
            id="good"
            name="good"
            // className="input"
            onClick={handleRadioSelect}
            value={newHabit.good}
          />
          Bad
          <input
            type="radio"
            id="bad"
            name="good"
            // className="input"
            onClick={handleBadRadioSelect}
            value={newHabit.bad}
          />
        </label>

        <label htmlFor="date" className="title" id="label-center">
          date:
          <input
            className="input"
            type="date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={newHabit.date}
          />
        </label>

        <input className="button-form" type="submit" value="Submit" id="input" />
      </form>
      <div className="habits-list">
        <h1 className="center"></h1>

        {tablesListItem}
      </div>
    </div>
  );
};
export default HabitsForm;
