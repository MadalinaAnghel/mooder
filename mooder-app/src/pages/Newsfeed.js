import React from "react";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";

export default function Newsfeed() {

  const jwt = localStorage.getItem('jwtToken');

  let history = useHistory();
  if(jwt === null) {
    history.push("/");
    return null;
  } else {
    return(
      <div>
        <Header />
        <h1> Newsfeed </h1>
      </div>
    );
  }

}
