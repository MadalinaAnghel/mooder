import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import UserLine from "./UserLine";

export default function FriendsList() {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + "/friends",
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

  return (
    <div>
      <h3> Friends </h3>
      <hr />
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
