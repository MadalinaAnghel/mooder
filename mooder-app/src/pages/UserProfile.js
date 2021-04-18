import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profile from "../partialPages/Profile";
import Posts from "../components/Posts";

export default function UserProfile() {

  const { id } = useParams();

  return (
    <div>
      <Header />
      <Container fluid className="main">
        <Row>
          <Col xs lg="3">
            <div className="profile-div">
              <Profile id={id} />
            </div>
          </Col>
          <Col md="6">
            <div className="posts-div">
              <Posts id={id} />
            </div>
          </Col>
          <Col xs lg="3">
          </Col>
        </Row>
      </Container>
    </div>
  );

}
