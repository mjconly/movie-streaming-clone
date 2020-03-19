import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/landing"
import Register from "./components/register"
import Dashboard from "./components/dashboard"
import Search from "./components/search"
import Genre from "./components/genre"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/dashboard/:id" component={Dashboard}/>
        <Route exact path="/dashboard/:id/search" component={Search}/>
        <Route exact path="/dashboard/:id/:genre" component={Genre}/>
      </Switch>
    </Router>
  );
}

export default App;
