import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import querystring from "querystring";

export default function Username() {

  const jwt = localStorage.getItem('jwtToken');

  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + "/name",
      { headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if(res.data) {
        setUsername(res.data);
      }
    })
    .catch(err => {
      setUsername("");
    });
  });

  function handleChange(event) {

    setUsername(event.target.value);

    if(jwt) {

      axios.post(
        process.env.REACT_APP_API_URL + "/name",
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

  return (
    <Form.Control
      type="text"
      placeholder="Choose an username"
      required
      spellCheck="false"
      value={username}
      onChange={handleChange}
    />
  );
}
