import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Register from "../components/Register";
import Login from "../components/Login";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header hideButton={true} />
      <Container fluid>
        <Row>
          <Col xs lg="3"></Col>
          <Col md="6">
            <Tabs fill justify defaultActiveKey="login" className="tab-view">
              <Tab eventKey="login" title="Log in" tabClassName="tab">
                <div >
                  <Login />
                </div>
              </Tab>
              <Tab eventKey="register" title="Register" tabClassName="tab">
                <div >
                  <Register />
                </div>
              </Tab>
            </Tabs>
          </Col>
          <Col xs lg="3"></Col>
        </Row>
      </Container>
    </div>
  );
}
