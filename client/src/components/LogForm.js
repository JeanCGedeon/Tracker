import React, { useState, useEffect } from "react";
import translateServerErrors from "../../../server/src/services/translateServerErrors";
import moment from "moment"

const LogForm = (props) => {
  const [logs, setLogs] = useState({ logs: [] });
  const [newLog, setNewLog] = useState({ notes: "", level:1,date:"" });
  const [errors, setErrors] = useState([]);

  const getLogs = async () => {
    try {
      const habitId = props.match.params.id;
      const response = await fetch(`/api/v1/logs/${habitId}/tables/myLogs`);
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
        <p>{moment(tableObject.date).format("MM/DD/YYYY")}</p>
      </h1>
    );
  });
  const postLog = async (newLogsData) => {
    try {
      const habitId = props.match.params.id;
      const response = await fetch(`/api/v1/logs/${habitId}/tables/logPost`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(newLogsData),
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
        const updatedLogs = logs.logs.concat(body.test);
        setLogs({ ...logs, logs: updatedLogs});
        setErrors([]);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewLog({
      ...newLog,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postLog(newLog);
    clearForm();
  };

  const clearForm = () => {
    setNewLog({
      notes: "",
      level: 1,
      date:""
    });
  };

  return (
      <div className="show-page-container list">
        <h2> Add Habits </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="notes">
            Notes:
            <input
              type="text"
              id="notes"
              name="notes"
              onChange={handleInputChange}
              value={newLog.notes}
            />
          </label>

          <label htmlFor="LEVEL">
            level:
            <input
              type="number"
              id="level"
              name="level"
              min={1}
              max={10}
              onChange={handleInputChange}
              value={newLog.level}
            />
          </label>

          <label htmlFor="date">
        date:
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleInputChange}
          value={newLog.date}
        />
      </label> 

          <input className="button" type="submit" value="Submit" />
        </form>
    <div className="logList">
      <h1>Logs</h1>
      {logListItems}
    </div>
    </div>
  );
};

export default LogForm;
