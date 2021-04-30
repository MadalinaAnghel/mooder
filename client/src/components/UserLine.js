import React, {useState, useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function UserLine(props) {

  const jwt = localStorage.getItem('jwtToken');

  let history = useHistory();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    let _isMounted = true;

    axios.get(
      "/users/avatar",
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
      if (_isMounted) {
        if(res.data) {
          setAvatar(res.data);
        }
      }
    })
    .catch(err => {
      setAvatar("");
    });

    axios.get(
      "/users/name",
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
      if (_isMounted) {
        if(res.data) {
          setUsername(res.data);
        }
      }
    })
    .catch(err => {
      setUsername("");
    });

    return () => {
      _isMounted = false;
    }
  });

  function handleClick() {
    history.push("/user/" + props.id );
  }

  return (
    <div className={ props.class ? ("user-inline " + props.class) : "user-inline" } onClick={handleClick}>
      <Row>
        <Col xs="auto">
          <Image className="avatar-user-inline" src={avatar}/>
        </Col>
        <Col>
          <p className="name-user-inline"> {username} </p>
        </Col>
      </Row>
    </div>
  );
}
