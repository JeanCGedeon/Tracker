import React , {useState,useEffect } from "react";
import ErrorList from "./layout/ErrorList";
const LogHabitsForm = (props) =>{
    const [ editLog, setEditLog] = useState({

          notes:props.notes,
          date:props.date
         })

         const handleInputChange = (event) => {
            setEditLog({ ...editLog, [event.currentTarget.name]: event.currentTarget.value });
          };
        
          // const handleRadioSelect = (event) => {
          //   setEditLog({ ...editLog, [event.currentTarget.name]: !editHabit[event.currentTarget.name] });
          // };
        
          // const handleBadRadioSelect = (event) => {
          //   setEditLog({ ...editLog, [event.currentTarget.name]: editHabit[event.currentTarget.name] });
          // };

          const handleSubmit = async (event) => {
            event.preventDefault();
            if (await props.patchHabit(editLog,props.id)) {
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
                  notes:
                  <input type="text"className="title-san" name="title" onChange={handleInputChange} value={editLog.notes}  />
                </label>
                
                <label>
                  Date:
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="see"
                    onChange={handleInputChange}
                    value={editLog.date}
                  />
                </label>
                <input className="button"  type="submit" value="Update Habit" />
              </form>
            </div>
              )
        


};
export default LogHabitsForm