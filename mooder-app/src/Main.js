import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import Newsfeed from "./pages/Newsfeed";

const Main = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/create_profile" component={CreateProfile}></Route>
      <Route exact path="/newsfeed" component={Newsfeed}></Route>
    </Switch>
  );
}

export default Main;
