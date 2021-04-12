import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import querystring from "querystring";

export default function Description() {

  const jwt = localStorage.getItem('jwtToken');

  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + "/description",
      { headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if(res.data) {
        setDescription(res.data);
      }
    })
    .catch(err => {
      setDescription("");
    });
  });

  function handleChange(event) {

    setDescription(event.target.value);

    if(jwt) {

      axios.post(
        process.env.REACT_APP_API_URL + "/description",
        querystring.stringify({description: event.target.value}),
        { headers:
          {
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        //setDescription(event.target.value);
      })
      .catch(err => console.log(err.data));
    }
  }

  return (
    <Form.Control
      as="textarea"
      rows={3}
      maxLength="100"
      spellCheck="false"
      placeholder="Write a short description of yourself"
      value={description}
      onChange={handleChange}
    />
  );
}
