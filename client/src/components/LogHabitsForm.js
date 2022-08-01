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
            if (await props.patchLog(editLog,props.id)) {
                props.toggleLogEdit(props.id)
            }

        };
        const errorList = props.errors ?( <ErrorList errors={props.errors} />) : null;
          return(
            <div>
                <p>Update Your Log</p>
                {errorList}
            <form
                onSubmit={async (event) => {
                  await handleSubmit(event);
                }}>
                <label htmlFor="notes-san">
                  notes:
                  <input type="text"className="notes-san" name="notes" onChange={handleInputChange} value={editLog.notes}  />
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
                <input className="button"  type="submit" value="Update Log" />
              </form>
            </div>
              )
        


};
export default LogHabitsForm