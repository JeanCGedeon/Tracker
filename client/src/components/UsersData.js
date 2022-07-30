import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import translateServerErrors from "../../../server/src/services/translateServerErrors";

const UsersData = (props) => {
  const [user, setUsers] = useState([]);
  
  const [errors, setErrors] = useState([]);

  const getUsers = async () => {
    try {
  
      const response = await fetch(`/api/v1/habits`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setUsers(parsedResponse.users);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const usersList = user.map((user) => {
    return (
      <h1 key={user.id}>
      <Link to={`/habits/${user.id}&post`}>  <p>{user.email}</p></Link>
     
      </h1>
    );
  })
    return(
  <div className="logList">
  <h1>Users</h1>
     
     {usersList}
</div>
   ) 
    };


  export default UsersData