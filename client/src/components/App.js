import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route,useParams } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import getCurrentUserId from "../services/getCurrentUserId";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import GoodHabitsList from "./GoodHabitsList";
import HabitsForm from "./HabitsForm";
import LogData from "./LogData";
import BadHabitsList from "./BadHabitsList";
import LogForm from "./LogForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path={`/habits/:id&myGood`} component={GoodHabitsList}/>
        <Route exact path={`/habits/:id&myBad`} component={BadHabitsList}/>
        <Route exact path={`/habits/:id&post`} component={HabitsForm}/>
        {/* <Route exact path={`/habits/:id&myLogs`} component={LogData}/> */}
        <Route exact path={`/logs/:id&logPost`} component={LogForm}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
