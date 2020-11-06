import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
//import "./App.css";

import Home from "./components/pages/Home";
import Userstate from "./context/users/UsersState";

const App = () => {
  return (
        <Userstate>
        <Router>
          <div className="App">
            <Navbar/>
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                   component={Home}
                ></Route>
              </Switch>
            </div>
          </div>
        </Router>
        </Userstate>
  );
};

export default App;
