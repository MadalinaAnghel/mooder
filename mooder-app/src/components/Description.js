import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import querystring from "querystring";

export default function Description(props) {

  const jwt = localStorage.getItem('jwtToken');

  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(props.edit)
      setEdit(props.edit);
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

  function handleClick() {
    setEdit(true);
  }

  function handleBlur() {
    setEdit(false);
  }

  return (
    <div>
      <p style={{display: edit ? "none" : "block"}} onClick={handleClick}> {description} </p>
      <Form.Control
        as="textarea"
        rows={3}
        maxLength="100"
        spellCheck="false"
        placeholder="Write a short description of yourself"
        value={description}
        onChange={handleChange}
        style={{display: edit ? "block" : "none"}}
        onBlur={handleBlur}
      />
    </div>
  );
}
