import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Validator from "email-validator";
import axios from "axios";
import { useHistory } from "react-router-dom";
import querystring from "querystring";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();

  function validateForm() {
    return password.length > 3 && confirmPassword.length > 3
           && (password === confirmPassword) && Validator.validate(email);
  }

  function handleSubmit(event) {

    axios.post(
      "/users/register",
      querystring.stringify({username: email, password:password}),
      { headers: { "Content-Type": "application/x-www-form-urlencoded"}}
    )
    .then(res => {
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("jwtToken", res.data.token);
      history.push("/create_profile");
    })
    .catch(err => console.log(err.data));

    event.preventDefault();

  }

  return (
    <div className="form">
      <Form onSubmit={handleSubmit} >
        <Form.Group size="lg" controlId="reg-email" >
          <Form.Control
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="reg-password" >
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="form-btn" block size="lg" type="submit" disabled={!validateForm()}>
          Create account
        </Button>
      </Form>
    </div>
  );
}
