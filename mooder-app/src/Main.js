import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";

const Main = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/create_profile" component={CreateProfile}></Route>
    </Switch>
  );
}

export default Main;
