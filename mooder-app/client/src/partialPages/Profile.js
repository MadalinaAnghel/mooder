import React from "react";
import Avatar from "../components/Avatar";
import Username from "../components/Username";
import Description from "../components/Description";
import FriendButton from "../components/FriendButton";

export default function Profile(props) {

  return (
    <div>
      <Avatar id={props.id}/>
      <Username edit={false} id={props.id}/>
      <Description edit={false} id={props.id}/>
      <FriendButton id={props.id} />
    </div>
  );
}
