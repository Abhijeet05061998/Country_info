import React from "react";
import "./App.css";
import Home from "./component/Home";
import { Switch, Route } from "react-router-dom";
import Country from "./component/Country";
import Header from "./component/Header";

import dotenv from 'dotenv';

dotenv.config()

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id/country" component={Country} />
      </Switch>
    </div>
  );
}

export default App;
