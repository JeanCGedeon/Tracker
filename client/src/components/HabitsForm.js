import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import HabitsTileTest from "./HabitsTileTest";
import ErrorList from "./layout/ErrorList";
import CommentHabitForm from "./CommentHabitForm";
import translateServerErrors from "../../../server/src/services/translateServerErrors";
import moment from "moment";
import GraphHabits from "./GraphHabits";

const HabitsForm = (props) => {
  const [tables, setTables] = useState({ habits: [] });
  // const [goodHabits,setGoodHabits] = useState({ good:[]})
  // const [badHabits,setBadHabits] = useState({ good:[]})
  // const [goodMonthsHabits,setGoodMonthsHabits] = useState({jan:[],feb:[],mar:[],may:[],apr:[],may:[],june:[],july:[],aug:[],sept:[],oct:[],nov:[],dec:[]})
  //  const [badMonthsHabits,setBadMonthsHabits] = useState({jan:[],feb:[],mar:[],may:[],apr:[],may:[],june:[],july:[],aug:[],sept:[],oct:[],nov:[],dec:[]})
 
//Good Months
// let [habitsTotalCount, setHabitsTotalCount] = useState(0)
// let [goodHabitsCount, setGoodHabitsCount] = useState(0)
// let [badHabitsCount, setBadHabitsCount] = useState(0)
// let [goodJanHabitsCount, setGoodJanHabitsCount] = useState(0)
// let [goodFebHabitsCount,setGoodFebHabitsCount] = useState(0)
// let [goodMarHabitsCount, setGoodMarHabitsCount] = useState(0)
// let [goodAprHabitsCount, setGoodAprHabitsCount] = useState(0)
// let [goodMayHabitsCount, setGoodMayHabitsCount] = useState(0)
// let [goodJuneHabitsCount, setGoodJuneHabitsCount] = useState(0)
// let [goodJulyHabitsCount, setGoodJulyHabitsCount] = useState(0)
// let [goodAugHabitsCount, setGoodAugHabitsCount] = useState(0)
// let [goodSeptHabitsCount, setGoodSeptHabitsCount] = useState(0)
// let [goodOctHabitsCount, setGoodOctHabitsCount] = useState(0)
// let [goodNovHabitsCount, setGoodNovHabitsCount] = useState(0)
// let [goodDecHabitsCount, setGoodDecHabitsCount] = useState(0)


// //Bad Months

// let [badJanHabitsCount, setBadJanHabitsCount] = useState(0)
// let [badFebHabitsCount,setBadFebHabitsCount] = useState(0)
// let [badMarHabitsCount, setBadMarHabitsCount] = useState(0)
// let [badAprHabitsCount, setBadAprHabitsCount] = useState(0)
// let [badMayHabitsCount, setBadMayHabitsCount] = useState(0)
// let [badJuneHabitsCount, setBadJuneHabitsCount] = useState(0)
// let [badJulyHabitsCount, setBadJulyHabitsCount] = useState(0)
// let [badAugHabitsCount, setBadAugHabitsCount] = useState(0)
// let [badSeptHabitsCount, setBadSeptHabitsCount] = useState(0)
// let [badOctHabitsCount, setBadOctHabitsCount] = useState(0)
// let [badNovHabitsCount, setBadNovHabitsCount] = useState(0)
// let [badDecHabitsCount, setBadDecHabitsCount] = useState(0)



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
 
  
  
  // const getGoodHabits = async () => {
  //   try {
  //     const userId = props.match.params.id;

  //     const response = await fetch(`/api/v1/graphs/${userId}/goodHabits`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const parsedResponse = await response.json();
  //     setGoodHabits(parsedResponse.userGoodHabits);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  // const getBadHabits = async () => {
  //   try {
  //     const userId = props.match.params.id;

  //     const response = await fetch(`/api/v1/graphs/${userId}/badHabits`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const parsedResponse = await response.json();
  //     setBadHabits(parsedResponse.userBadHabits);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };
  
  // const getGoodMonthsHabits = async () => {
  //   try {
  //     const userId = props.match.params.id;

  //     const response = await fetch(`/api/v1/graphs/${userId}/allGood`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const parsedResponse = await response.json();
  //     setGoodMonthsHabits(parsedResponse.userGoodHabits);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  // const getBadMonthsHabits = async () => {
  //   try {
  //     const userId = props.match.params.id;

  //     const response = await fetch(`/api/v1/graphs/${userId}/allBad`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const parsedResponse = await response.json();
  //     setBadMonthsHabits(parsedResponse.userBadHabits);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };


  //get Use Effects
  useEffect(() => {
    getTables();
  }, []);

  // useEffect(()=>{
  //   getGoodHabits()
  // },[])

  // useEffect(()=>{
  //   getBadHabits()
  // },[])

  // useEffect(()=>{
  //   getGoodMonthsHabits()
  // },[])
  // useEffect(()=>{
  //   getBadMonthsHabits()
  // },[])
 
 //Count use effects
//  useEffect(() =>{
//   const numberAllHabits = tables.habits.length 
//   setHabitsTotalCount(numberAllHabits)
// })

//   useEffect(()=>{
//     const numberGoodHabits = goodHabits.good.length
//     setGoodHabitsCount(numberGoodHabits)
//   })
  
//   useEffect(()=>{
//     const numberBadHabits = badHabits.good.length
//     setBadHabitsCount(numberBadHabits)
//   })  
//==============================================================================================
//months
  // useEffect(()=>{
  //   const numberGoodMonthsJan = goodMonthsHabits.jan.length
  //   setGoodJanHabitsCount(numberGoodMonthsJan)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsFeb = goodMonthsHabits.feb.length
  //   setGoodFebHabitsCount(numberGoodMonthsFeb)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsMar = goodMonthsHabits.mar.length
  //   setGoodMarHabitsCount(numberGoodMonthsMar)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsApr = goodMonthsHabits.apr.length
  //   setGoodAprHabitsCount(numberGoodMonthsApr)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsMay = goodMonthsHabits.may.length
  //   setGoodMayHabitsCount(numberGoodMonthsMay)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsJune = goodMonthsHabits.june.length
  //   setGoodJuneHabitsCount(numberGoodMonthsJune)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsJuly = goodMonthsHabits.july.length
  //   setGoodJulyHabitsCount(numberGoodMonthsJuly)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsAug = goodMonthsHabits.aug.length
  //   setGoodAugHabitsCount(numberGoodMonthsAug)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsSept = goodMonthsHabits.sept.length
  //   setGoodSeptHabitsCount(numberGoodMonthsSept)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsOct = goodMonthsHabits.oct.length
  //   setGoodOctHabitsCount(numberGoodMonthsOct)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsNov = goodMonthsHabits.nov.length
  //   setGoodNovHabitsCount(numberGoodMonthsNov)
  // })
  // useEffect(()=>{
  //   const numberGoodMonthsDec = goodMonthsHabits.dec.length
  //   setGoodDecHabitsCount(numberGoodMonthsDec)
  // })
//==============================================================================================

// useEffect(()=>{
//   const numberBadMonthsJan = badMonthsHabits.jan.length
//   setBadJanHabitsCount(numberBadMonthsJan)
// })
// useEffect(()=>{
//   const numberBadMonthsFeb = badMonthsHabits.feb.length
//   setBadFebHabitsCount(numberBadMonthsFeb)
// })
// useEffect(()=>{
//   const numberBadMonthsMar = badMonthsHabits.mar.length
//   setBadMarHabitsCount(numberBadMonthsMar)
// })
// useEffect(()=>{
//   const numberBadMonthsApr = badMonthsHabits.apr.length
//   setBadAprHabitsCount(numberBadMonthsApr)
// })
// useEffect(()=>{
//   const numberBadMonthsMay = badMonthsHabits.may.length
//   setBadMayHabitsCount(numberBadMonthsMay)
// })
// useEffect(()=>{
//   const numberBadMonthsJune = badMonthsHabits.june.length
//   setBadJuneHabitsCount(numberBadMonthsJune)
// })
// useEffect(()=>{
//   const numberBadMonthsJuly = badMonthsHabits.july.length
//   setBadJulyHabitsCount(numberBadMonthsJuly)
// })
// useEffect(()=>{
//   const numberBadMonthsAug = badMonthsHabits.aug.length
//   setBadAugHabitsCount(numberBadMonthsAug)
// })
// useEffect(()=>{
//   const numberBadMonthsSept = badMonthsHabits.sept.length
//   setBadSeptHabitsCount(numberBadMonthsSept)
// })
// useEffect(()=>{
//   const numberBadMonthsOct = badMonthsHabits.oct.length
//   setBadOctHabitsCount(numberBadMonthsOct)
// })
// useEffect(()=>{
//   const numberBadMonthsNov = badMonthsHabits.nov.length
//   setBadNovHabitsCount(numberBadMonthsNov)
// })
// useEffect(()=>{
//   const numberBadMonthsDec = badMonthsHabits.dec.length
//   setBadDecHabitsCount(numberBadMonthsDec)
// })
//=============================================================================
// let allHabits = habitsTotalCount

 //============================================================================= 

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


const [userId, setUserId] = useState([{}])
  const getUserId = async () => {
    try {
  
      const response = await fetch(`/api/v1/habits/email/:id`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setUserId(parsedResponse.email);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);



  
  let tablesListItem = tables.habits.map((tableObject) => {

    return (
      <h3 key={tableObject.id}>
        <div className="item">
          <Link to={`/logs/${tableObject.id}&logPost`} className="link-to-logs">
            <p className="habit-title">{tableObject.title}</p>
          </Link>
          <div>
           <label htmlFor="item-body" > </label>
           <div>
           <p className="move-check-x"> View Card </p>
           </div>
             <input type="checkbox" id="item-body" className="view-body"/>
             {/* <input type="checkbox" id="item-body" className="view-body"/>
             <input type="checkbox" id="item-body" className="view-body"/> */}
            <div className="see-body">
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
              // userId={userId.id}
              // creatorId={habitObject.userId}
              creator={tableObject.user}
              deleteHabit={deleteHabit}
        
              // curUserId={curUserId}
              patchHabit={patchHabit}

            />
          </div>
          {/* <div>
           <label htmlFor="comment-new" > View Comments</label>
           <div>
           <p className="move-check">View Comments</p>
           </div>
             <input type="checkbox" id="comment-new" className="view-comment"/>
             <input type="checkbox" id="comment-new" className="view-comment"/>
             <input type="checkbox" id="comment-new" className="view-comment"/>
           <div className="see-comment">
              <CommentHabitForm
              key={tableObject.id}
              id={tableObject.id}
              userId={userId.id}
              />
              </div>
          </div> */}
          </div>
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
    <div className="show-page-container-list">
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
            value={newHabit.good}
          />
        </label> 
   
          {/* <input
            type="checkbox"
            id="bad"
            name="good"
            // className="input"
            onClick={handleBadRadioSelect}
            value={newHabit.bad}
          />
        </label> */}

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
