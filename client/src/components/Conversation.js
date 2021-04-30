import React from "react";
import DateFormat from "dateformat";
import UserLine from "../components/UserLine";
import { useHistory } from "react-router-dom";

export default function Message(props) {

  let history = useHistory();

  function handleClick() {
    history.push("/chat/" + props.id );
  }

  return (
      <div className="conversation" onClick={handleClick}>
        <UserLine class="conversation-user" id={props.id} />
        <p className="conversation-date"> Last message: {DateFormat(props.last_date, "d mmm yyyy, H:MM")}</p>
      </div>
  );

}
