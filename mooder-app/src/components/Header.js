import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";

export default function Header(props) {

  let history = useHistory();

  function handleClick() {
    localStorage.removeItem("userId");
    localStorage.removeItem("jwtToken");
    history.push("/");
  }

  return (
    <header>
      <Container>
        <Row>
          <Col>
            <h1> mooder </h1>
          </Col>
          <Col>
            {props.hideButton ? null: <Button className="float-right" variant="outline-light" onClick={handleClick}>Log Out</Button>}
          </Col>
        </Row>
      </Container>
    </header>
  );
}
