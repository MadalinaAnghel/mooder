import React, {useState, useEffect, useRef} from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import querystring from "querystring";

export default function FriendButton(props) {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');

  const [showButton, setShowButton] = useState(false);
  const [friends, setFriends] = useState(false);

  useEffect(() => {
    setShowButton(props.id);

    if(props.id) {
      axios.get(
        process.env.REACT_APP_API_URL + "/check-friendship",
        { params:
          {
            id: props.id
          },
          headers:
          {
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        if (_isMounted.current) {
          setFriends(true);
        }
      })
      .catch(err => {
        setFriends(false);
      });
      return () => {
        _isMounted.current = false;
      }
    }
  }, [props.id, jwt]);

  function handleClick() {
    if(!friends) {
      axios.post(
        process.env.REACT_APP_API_URL + "/add-friend",
        querystring.stringify({id: props.id}),
        { headers:
          {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        setFriends(true);
      })
      .catch(err => {
        setFriends(false);
      });
    } else {
      axios.post(
        process.env.REACT_APP_API_URL + "/remove-friend",
        querystring.stringify({id: props.id}),
        { headers:
          {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        setFriends(false);
      })
      .catch(err => {
        setFriends(true);
      });
    }
  }

  return (
    <div>
      <Button className={friends ? "friend-btn" : "friend-req-btn"} style={{display: showButton ? "block" : "none"}} onClick={handleClick}>
        {friends ? "Friends" : "Add friend"}
      </Button>
    </div>
  );
}
