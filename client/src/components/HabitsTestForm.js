import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const HabitsTestForm = (props) =>{
    const [ editHabit, setEditHabit] = useState({

        title:props.title,
          description:props.description,
          good:props.good,
          bad:props.bad,
          date:props.date
         })

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
            if (await props.patchHabit(editHabit,props.id)) {
                props.toggleEdit(props.id)
            }

        };
        const errorList = props.errors ?( <ErrorList errors={props.errors} />) : null;
          return(
            <div>
                <p>Update Your Habit</p>
                {errorList}
            <form
                onSubmit={async (event) => {
                  await handleSubmit(event);
                }}>
                <label htmlFor="title-san">
                  Title:
                  <input type="text"className="title-san" name="title" onChange={handleInputChange} value={editHabit.title}  />
                </label>
                <label >
                  Description:
                  <input type="text" className="description-san"  name="description" onChange={handleInputChange} value={editHabit.description} />
                </label>
                <label htmlFor="good" >
                  Good:
                  <input
                    type="radio"
                    id="good"
                    name="good"
                    className="hehe"
                    onClick={handleRadioSelect}
                    value={editHabit.good}
                  />
               

                  Bad:
                  <input
                    type="radio"
                    id="bad"
                    name="good"
                    className="haha"
                    onClick={handleBadRadioSelect}
                    value={editHabit.bad}
                  />
                </label>
                <label  htmlFor="date">
                  Date:
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="see"
                    onChange={handleInputChange}
                    value={editHabit.date}
                  />
                </label>
                <input className="button"  type="submit" value="Update Habit" />
              </form>
            </div>
              )
        


};
export default HabitsTestForm