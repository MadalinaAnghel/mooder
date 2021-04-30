import React, {useState, useEffect, useRef} from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserLine from "./UserLine";

export default function FriendsList() {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');

  const [friends, setFriends] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios.get(
      "/users/friends",
      { headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if(_isMounted.current) {
        setFriends(res.data);
      }
    })
    .catch(err => {});

    return () => {
      _isMounted.current = false;
    }
  }, [friends, jwt]);

  function handleClick() {
    history.push("/messages");
  }

  return (
    <div>
      <div className="friends-title">
      <h3> Friends </h3>
        <Button className={"message-btn"} onClick={handleClick}>
          <i className="far fa-comment-alt"></i> Messages
        </Button>
        <hr />
      </div>
      <div className="friends-list">
        {friends.map( (id, idx) =>
          (<UserLine
              key={idx}
              id={id}
          />)
        )}
      </div>
    </div>
  );
}
