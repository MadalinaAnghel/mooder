import React from "react";
import DateFormat from "dateformat";

export default function Message(props) {

  const currentUserMessage = (localStorage.getItem("userId") === props.sender)

  return (
      <div className={currentUserMessage ? "message right-allign" : "message message-friend"}>
          <p className="message-date">{DateFormat(props.date, "d mmm yyyy, H:MM")}</p>
          <p className="message-text">{props.content}</p>
      </div>
  );

}
