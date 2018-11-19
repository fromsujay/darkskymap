import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import '../stylesheet/landingPage.css';
import { Link } from "react-router-dom";

/* Homepage of web application built with react, reactstrap & react-router-dom */
/*Keep responsive and designed for mobile device*/

class LandingPage extends Component {

  render() {

    return (

      <div className="home">
        <Container>
          <Row>
            <Col xs={{size:3, offset:2}} sm={{size:3, offset:3}} md={{size: 1, offset: 9}}>
              <Col xs="1" md="5">
                <Link to="/signin"><Button className="btn-Home-Sign1" color="secondary">Sign In</Button></Link>
              </Col>
            </Col>
            <Col xs={{size:1}} md={{size: 1}}>
              <Col xs={{offset:4}} md={{size:2, offset:8}}>
                <Link to="/signup"><Button className="btn-Home-Sign2" color="secondary">Sign Up</Button></Link>
              </Col>
            </Col>
          </Row>
          <div className="homeContent">
            <h1 id="homeTitle">Dark Sky Map</h1>
            <h2 id="homeText">Découvrez et partagez des lieux pour observer le ciel</h2>
            <Link to="/map"><Button id="btn-Home-Discover" color="secondary">Découvrez</Button></Link>
          </div>
        </Container>
      </div>
    );
  }
}


export default LandingPage;
