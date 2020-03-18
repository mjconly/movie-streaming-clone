import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/landing"
import Register from "./components/register"
import Dashboard from "./components/dashboard"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Landing}/>
      <Route path="/register" component={Register}/>
      <Route path="/dashboard/:id" component={Dashboard}/>
    </Router>
  );
}

export default App;
