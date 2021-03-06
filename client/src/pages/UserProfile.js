import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profile from "../partialPages/Profile";
import Posts from "../components/Posts";
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
        }
        {isTabletOrMobile &&
          <Container fluid className="main">
            <div className="profile-div">
              <Profile id={id} />
            </div>
            <div className="posts-div">
              <Posts id={id} />
            </div>
          </Container>
        }
      </div>
    );
  }

}
