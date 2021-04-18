import React from "react";
import Avatar from "../components/Avatar";
import Username from "../components/Username";
import Description from "../components/Description";

export default function Profile(props) {

  return (
    <div>
      <Avatar id={props.id}/>
      <Username edit={false} id={props.id}/>
      <Description edit={false} id={props.id}/>
    </div>
  );
}
