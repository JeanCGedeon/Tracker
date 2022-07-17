import React, { useState, useEffect } from "react";
import translateServerErrors from "../../../server/src/services/translateServerErrors";

const LogData = (props) => {
  const [logs, setLogs] = useState({ logs: [] });
  const [newLog, setNewLog] = useState({ notes: "", level:1 });
  const [errors, setErrors] = useState([]);

  const getLogs = async () => {
    try {
      const habitId = props.match.params.id;
      const response = await fetch(`/api/v1/habits/${habitId}/tables/myLogs`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setLogs(parsedResponse.myLogs);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  const logListItems = logs.logs.map((tableObject) => {
    return (
      <h1 key={tableObject.id}>
        <p>{tableObject.notes}</p>
        <p>{tableObject.level}</p>
        <p>{tableObject.habitId}</p>
      </h1>
    );
  })
    return(
  <div className="logList">
  <h1>Logs</h1>
  {logListItems}

</div>
   ) 
    };


  export default LogData