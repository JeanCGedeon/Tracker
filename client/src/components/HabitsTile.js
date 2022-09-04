import React, { useState } from "react";
import { useRef } from "react";
import ErrorList from "./layout/ErrorList";
const HabitsTile = (props) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const [ editHabit, setEditHabit] = useState({

 title:props.title,
   description:props.description,
   good:props.good,
   bad:props.bad,

  }

  )
//   const button =
  
//       <div className="habit-edit">
//         <input
//           className="button"
//           type="button"
//           value="Edit Habit"
//           onClick={() => {
//             toggleEdit();
//           }}
//         />
//       </div>
   

const handleInputChange = (event) => {
    setEditHabit({ ...editHabit, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleRadioSelect = (event) => {
    setEditHabit({ ...editHabit, [event.currentTarget.name]: !editHabit[event.currentTarget.name] });
  };

  const handleBadRadioSelect = (event) => {
    setEditHabit({ ...editHabit, [event.currentTarget.name]: editHabit[event.currentTarget.name] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await props.patchHabit(editHabit)) {
      props.toggleEdit(props.id);
    }
  };
  const errorList = props.errors ? <ErrorList errors={props.errors} /> : null;


//   const toggleEdit = () => {
//     setIsBeingEdited(!isBeingEdited);
//   };

//   if(isBeingEdited){
     


      return(
    <div>
        <h1>Update Your Review</h1>
        {errorList}
        {/* <div className="habit-edit"> */}
        {/* <input
          className="button"
          type="button"
          value="Edit Habit"
          onClick={() => {
            toggleEdit();
          }}
        />
      </div> */}
   
    <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <label htmlFor="title">
          Title:
          <input type="text" className="title" onChange={handleInputChange} value={editHabit.title}  />
        </label>
        <label htmlFor="description">
          Description:
          <input type="text" className="description" onChange={handleInputChange} value={editHabit.description} />
        </label>
        <label htmlFor="good">
          Good:
          <input
            type="checkbox"
            id="good"
            name="good"
            onClick={handleRadioSelect}
            value={editHabit.good}
          />
          Bad:
          <input
            type="checkbox"
            id="bad"
            name="good"
            onClick={handleBadRadioSelect}
            value={editHabit.good}
          />
          {/* <input
            type="checkbox"
            id="bad"
            name="good"
            onClick={handleBadRadioSelect}
            value={editHabit.bad}
          /> */}
        </label>
    
        <input  className="button" type="submit" value="Update Habit"/>
      </form>
    </div>
      )
    
}

//   const handleInputChange = (event) => {
//     setEditHabit({ ...editHabit, [event.currentTarget.name]: event.currentTarget.value });
//   };

//   const handleRadioSelect = (event) => {
//     setNewHabit({ ...newHabit, [event.currentTarget.name]: !newHabit[event.currentTarget.name] });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (await patchHabit(editHabit.id)) {
//       toggleEdit();
//     }
//   };
//   const errorList = errors ? <ErrorList errors={errors} /> : null;

//   return (
//     <div className="test">
//       <div>{button}</div>
//       <h1>Update Your Review</h1>
//       {errorList}
//     </div>
//   )


export default HabitsTile;
