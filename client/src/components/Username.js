import React, {useState, useEffect, useRef} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import querystring from "querystring";

export default function Username(props) {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');

  const [username, setUsername] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(props.edit)
      setEdit(props.edit);
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
      if (_isMounted.current) {
        if(res.data) {
          setUsername(res.data);
        }
      }
    })
    .catch(err => {
      setUsername("");
    });
    return () => {
      _isMounted.current = false;
    }
  }, [props.edit, props.id, jwt]);

  function handleChange(event) {

    setUsername(event.target.value);

    if(jwt) {

      axios.post(
        "/users/name",
        querystring.stringify({name: event.target.value}),
        { headers:
          {
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        //setUsername(event.target.value);
      })
      .catch(err => console.log(err.data));
    }
  }

  function handleClick() {
    if(props.id) {
      return;
    }
    setEdit(true);
  }

  function handleBlur() {
    if(!props.edit) {
      setEdit(false);
    }
  }

  return (
    <div className="username">
      <h3 style={{display: edit ? "none" : "block"}} onClick={handleClick}> {username} </h3>
      <Form.Control
        type="text"
        placeholder="Choose an username"
        required
        maxLength="30"
        spellCheck="false"
        value={username}
        onChange={handleChange}
        style={{display: edit ? "block" : "none"}}
        onBlur={handleBlur}
      />
    </div>
  );
}
