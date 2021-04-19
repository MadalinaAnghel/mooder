import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/UserProfile";

const Main = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/create_profile" component={CreateProfile}></Route>
      <Route exact path="/feed" component={MainPage}></Route>
      <Route exact path="/user/:id" component={UserProfile}></Route>
    </Switch>
  );
}

export default Main;
