import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Validator from "email-validator";
import axios from "axios";
import { useHistory } from "react-router-dom";
import querystring from "querystring";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function validateForm() {
    return password.length > 3 && Validator.validate(email);
  }

  function handleSubmit(event) {

    axios.post(
      "/users/login",
      querystring.stringify({username: email, password:password}),
      { headers: { "Content-Type": "application/x-www-form-urlencoded"}}
    )
    .then(res => {
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("jwtToken", res.data.token);
      history.push("/feed");
    })
    .catch(err => console.log(err.data));

    event.preventDefault();

  }

  return (
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="log-email">
          <Form.Control
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="log-password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="form-btn" block size="lg" type="submit" disabled={!validateForm()}>
          Log In
        </Button>
      </Form>
    </div>
  );
}
