import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import './landingPage.css';
import Background from "./backgroundHome.jpg"

class LandingPage extends Component {
  render() {
    return (
      <div className="home">
        <Container>
          <Row>
            <Col xs={{size:3, offset:2}} sm={{size:3, offset:3}} md={{size: 1, offset: 9}}>
              <Col xs="1" md="5">
                <Button className="btn-Home-Sign1" color="secondary">Sign In</Button>
              </Col>
            </Col>
            <Col xs={{size:1}} md={{size: 1}}>
              <Col xs={{offset:4}} md={{size:2, offset:8}}>
                <Button className="btn-Home-Sign2" color="secondary">Sign Up</Button>
              </Col>
            </Col>
          </Row>
          <div className="homeContent">
            <h1 id="homeTitle">Dark Sky Map</h1>
            <h2 id="homeText">Découvrez et partagez des lieux pour observer le ciel</h2>
            <Button id="btn-Home-Discover" color="secondary">Découvrez</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default LandingPage;
