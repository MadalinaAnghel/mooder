import React from "react";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profile from "../partialPages/Profile";
import Feed from "../partialPages/Feed";
import Friends from "../partialPages/Friends";
import { useHistory } from "react-router-dom";

export default function MainPage() {

  const jwt = localStorage.getItem('jwtToken');

  let history = useHistory();
  if(jwt === null) {
    history.push("/");
    return null;
  } else {
    return(
      <div>
        <Header />
        <Container fluid className="main">
          <Row>
            <Col xs lg="3">
              <div className="profile-div">
                <Profile />
              </div>
            </Col>
            <Col md="6">
              <div className="posts-div">
                <Feed />
              </div>
            </Col>
            <Col xs lg="3">
              <div className="friends-div">
                <Friends />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}
