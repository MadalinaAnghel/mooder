import React from "react";
import Avatar from "../components/Avatar";
import Username from "../components/Username";
import Description from "../components/Description";

export default function Profile() {

  return (
    <div>
      <Avatar />
      <Username edit={false} />
      <Description edit={false} />
    </div>
  );
}
