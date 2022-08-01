import React, { useState, useEffect } from "react";
import translateServerErrors from "../../../server/src/services/translateServerErrors";
import moment from "moment"
import LogHabitsTile from "./LogHabitTile";

const LogForm = (props) => {
  const [logs, setLogs] = useState({ logs: [] });
  const [newLog, setNewLog] = useState({ notes: "", date:"" });
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
  
  
  
  const patchLog = async (logBody, logId) => {
    try {
      const userId = props.match.params.id;
      const response = await fetch(`/api/v1/logs/${userId}/tables/${logId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logBody),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const updatedLogsWithErrors = logs.logs.map((log) => {
            if (log.id === logId) {
              log.errors = body;
            }
            return log;
          });
          setLogs({ ...logs, logs: updatedLogsWithErrors });
          return false;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        const updatedLogs = logs.logs.map((log) => {
          if (log.id === logId) {
            log.notes = body.log.notes;
            // log.level = body.log.level;
            log.date = body.log.date;
           
            if (log.errors) {
              delete log.errors;
            }
          }
          return log;
        });
        setErrors({});
        setLogs({ ...logs, logs: updatedLogs });
        return true;
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
      return false;
    }
  };
 
  
  
  const deleteLog = async (logId) => {
    try {
      const id = props.match.params.id;
      const response = await fetch(`/api/v1/logs/${id}/tables/${logId}`, {
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
        const filteredLogs = logs.logs.filter((log) => {
          return log.id !== logId;
        });
        setErrors({});
        setLogs({ ...logs, logs: filteredLogs });
      }
    } catch (error) {
      console.error(`Error in fetch ${error.message}`);
    }
  };
  
  
  const logListItems = logs.logs.map((tableObject) => {
    return (
      <h1 key={tableObject.id}>
        <div className="log-item">
          <p className="log-title">{tableObject.notes}</p>
          {/* <div className="testing">
        <p className="log-description"> {tableObject.level}</p>
      </div> */}
{/*           
        <p>{tableObject.habitId}</p> */}
        <div id="log-date-parent" className="jar" >
        <p className="log-description">{moment(tableObject.date).format("MM/DD/yyyy")}</p>
    
        </div>
        <div className="log-tiles">
          <LogHabitsTile
          key={tableObject.id}
          id={tableObject.id}
          creator={tableObject.user}
          deleteLog={deleteLog}
          patchLog={patchLog}
          />
        </div>
      </div>
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
      // level: 1,
      date:""
    });
  };

  return (
      <div className="show-page-container list">
        <div className="log-form">
        <h2> Add Logs </h2>
        <form onSubmit={handleSubmit} className="log-form-test">
          <label htmlFor="notes">
            Notes:
            <textarea
              type="text"
              id="notes"
              name="notes"
              onChange={handleInputChange}
              value={newLog.notes}
            />
          </label>

          {/* <label htmlFor="LEVEL">
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
          </label> */}

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

          <input className="button-form" type="submit" value="Submit" />
        </form>
        </div>
    <div className="logList">
      <h1>Logs</h1>
      {logListItems}
    </div>
    </div>
  );
};

export default LogForm;
