import React from "react";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Profile from "../partialPages/Profile";
import Feed from "../partialPages/Feed";
import Friends from "../partialPages/Friends";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

export default function MainPage() {

  const jwt = localStorage.getItem('jwtToken');

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  let history = useHistory();
  if(jwt === null) {
    history.push("/");
    return null;
  } else {
    return(
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
        }
        {isTabletOrMobile &&
          <div className="main-div-mobile">
            <Tabs fill justify defaultActiveKey="feed" className="main-tab">
              <Tab eventKey="profile" title="Profile" tabClassName="tab">
                <div className="profile-div">
                  <Profile />
                </div>
              </Tab>
              <Tab eventKey="feed" title="Feed" tabClassName="tab">
                <div className="posts-div">
                  <Feed />
                </div>
              </Tab>
              <Tab eventKey="friends" title="Friends" tabClassName="tab">
                <div className="friends-div">
                  <Friends />
                </div>
              </Tab>
            </Tabs>
          </div>
        }
      </div>
    );
  }

}
