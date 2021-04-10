import React from "react";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";

export default function CreateProfile() {

  let history = useHistory();

  if(localStorage.getItem("jwtToken") === null) {
    history.push("/");
    return null;
  } else {
    return(
      <div>
        <Header />
        <h1> Profile </h1>;
      </div>
    );
  }
}
