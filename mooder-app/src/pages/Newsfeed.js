import React from "react";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profile from "../components/Profile";
import { useHistory } from "react-router-dom";

export default function Newsfeed() {

  const jwt = localStorage.getItem('jwtToken');

  let history = useHistory();
  if(jwt === null) {
    history.push("/");
    return null;
  } else {
    return(
      <div>
        <Header />
        <Container fluid className="newsfeed">
          <Row>
            <Col xs lg="3">
              <div className="profile-div">
                <Profile />
              </div>
            </Col>
            <Col md="6">
              <div className="posts-div">
                <h1> Posts </h1>
              </div>
            </Col>
            <Col xs lg="3">
              <div className="friends-div">
                <h1> Friends </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}
