import React, {useState, useEffect, useRef} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import querystring from "querystring";

export default function Description(props) {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');

  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(props.edit)
      setEdit(props.edit);
    axios.get(
      "/description",
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
          setDescription(res.data);
        }
      }
    })
    .catch(err => {
      setDescription("");
    });
    return () => {
      _isMounted.current = false;
    }
  }, [props.edit, props.id, jwt]);

  function handleChange(event) {

    setDescription(event.target.value);

    if(jwt) {

      axios.post(
        "/description",
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
    <div className="description">
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
