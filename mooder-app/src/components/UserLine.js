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
      process.env.REACT_APP_API_URL + "/avatar",
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
          setAvatar(process.env.REACT_APP_IMG_URL + res.data);
        }
      }
    })
    .catch(err => {
      setAvatar("");
    });

    axios.get(
      process.env.REACT_APP_API_URL + "/name",
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
    <div className="user-inline" onClick={handleClick}>
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
