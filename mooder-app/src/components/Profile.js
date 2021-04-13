import React from "react";
import Avatar from "./Avatar";
import Username from "./Username";
import Description from "./Description";

export default function Profile() {

  return (
    <div>
      <Avatar />
      <Username edit={false} />
      <Description edit={false} />
    </div>
  );
}
