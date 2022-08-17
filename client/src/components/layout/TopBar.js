import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import '../../assets/scss/main.scss'
import getCurrentUserId from "../../services/getCurrentUserId";
const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];
  const [currentUserId, setCurrentUserId] = useState(0)
  const fetchCurrentUserId = async () =>{
    try{
      const userId = await getCurrentUserId()
      setCurrentUserId(userId)
    } catch(err) {
      setCurrentUserId(null)
    }
  }
  
  useEffect(()=>{
    fetchCurrentUserId()
  },[])
  
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text"></li>
          <li>
            <Link to="/">Home</Link></li>
           <li><Link to={`/habits/${currentUserId}&post`}>Create Habit</Link></li>
           <li><Link to={`/habits/${currentUserId}&myGood`}>Good Habits</Link></li>
           <li><Link to={`/habits/${currentUserId}&myBad`}> Bad Habits</Link></li>
           {/* <li><Link to={`/habits/${1}&post`}>Test Create Habit</Link></li>
           <li><Link to={`/habits/${1}&myGood`}>Test Good Habits</Link></li>
           <li><Link to={`/habits/${1}&myBad`}> Test Bad Habits</Link></li> */}
           
           {/* <li><Link to={`/habits/${currentUserId}&myLogs`}> myLogs</Link></li> */}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
