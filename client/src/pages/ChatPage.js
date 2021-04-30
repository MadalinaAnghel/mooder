import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profile from "../partialPages/Profile";
import Friends from "../partialPages/Friends";
import Chat from "../partialPages/Chat";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

export default function UserProfile() {

  const { id } = useParams();

  const jwt = localStorage.getItem('jwtToken');

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  let history = useHistory();
  if(jwt === null) {
    history.push("/");
    return null;
  } else {
    return (
      <div>
        <Header />
        {isDesktopOrLaptop &&
          <Container fluid className="main">
            <Row>
              <Col xs lg="3">
                <div className="profile-div">
                  <Profile />
                </div>
              </Col>
              <Col md="6">
                <div className="chat-div">
                  <Chat id={id} />
                </div>
              </Col>
              <Col xs lg="3">
                <div className="friends-div">
                  <Friends />
                </div>
              </Col>
            </Row>
          </Container>
        }
        {isTabletOrMobile &&
          <div className="chat-div">
            <Chat id={id} />
          </div>
        }
      </div>
    );
  }

}
