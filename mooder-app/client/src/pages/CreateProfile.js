import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import Username from "../components/Username";
import Description from "../components/Description";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

export default function CreateProfile() {

  const jwt = localStorage.getItem('jwtToken');

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  let history = useHistory();

  function handleClick() {
    history.push("/feed");
  }

  if(jwt === null) {
    history.push("/");
    return null;
  } else {
    return(
      <div>
        <Header />
        {isDesktopOrLaptop &&
          <Container fluid>
            <Row>
              <Col xs lg="3"></Col>
              <Col md="6">
                <div className="create-profile-div">
                  <div className="form">
                  <Form onSubmit={handleClick}>
                    <Avatar />
                    <Form.Group size="lg" >
                      <Username edit={true} />
                    </Form.Group>
                    <Form.Group >
                      <Description edit={true} />
                    </Form.Group>
                    <Button className="form-btn" block size="lg" type="submit"  >
                      Finish
                    </Button>
                  </Form>
                  </div>
                </div>
              </Col>
              <Col xs lg="3"></Col>
            </Row>
          </Container>
        }
        {isTabletOrMobile &&
          <Container fluid>
            <div className="create-profile-div">
              <div className="form">
              <Form onSubmit={handleClick}>
                <Avatar />
                <Form.Group size="lg" >
                  <Username edit={true} />
                </Form.Group>
                <Form.Group >
                  <Description edit={true} />
                </Form.Group>
                <Button className="form-btn" block size="lg" type="submit"  >
                  Finish
                </Button>
              </Form>
              </div>
            </div>
          </Container>
        }
      </div>
    );
  }
}
