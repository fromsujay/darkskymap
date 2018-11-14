import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import '../stylesheet/landingPage.css';
import Background from "../images/backgroundHome.jpg";
import { Redirect } from "react-router-dom"

/*Keep responsive and designed for mobile device*/

class LandingPage extends Component {

    constructor(props) {
    super(props);
    this.state = {
      redirectMap: false,
      redirectSignIn: false,
      redirectSignUp: false,
    };

    // This binding is necessary to make `this` work in the callback
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClickMap=()=> {
    this.setState({
      redirectMap: true,
    });
  }

  handleClickSignIn=()=> {
    this.setState({
      redirectSignIn: true,
    });
  }

  handleClickSignUp=()=> {
    this.setState({
      redirectSignUp: true,
    });
  }

  render() {

    return (

      <div className="home">

        {
          this.state.redirectMap
          ?<Redirect to="/map"/>
          :null
        },

        {
          this.state.redirectSignIn
          ?<Redirect to="/signin"/>
          :null
        },

        {
          this.state.redirectSignUp
          ?<Redirect to="/signup"/>
          :null
        }

        <Container>
          <Row>
            <Col xs={{size:3, offset:2}} sm={{size:3, offset:3}} md={{size: 1, offset: 9}}>
              <Col xs="1" md="5">
                <Button className="btn-Home-Sign1" color="secondary" onClick={this.handleClickSignIn}>Sign In</Button>
              </Col>
            </Col>
            <Col xs={{size:1}} md={{size: 1}}>
              <Col xs={{offset:4}} md={{size:2, offset:8}}>
                <Button className="btn-Home-Sign2" color="secondary" onClick={this.handleClickSignUp}>Sign Up</Button>
              </Col>
            </Col>
          </Row>
          <div className="homeContent">
            <h1 id="homeTitle">Dark Sky Map</h1>
            <h2 id="homeText">Découvrez et partagez des lieux pour observer le ciel</h2>
            <Button id="btn-Home-Discover" color="secondary" onClick={this.handleClickMap} >Découvrez</Button>
          </div>
        </Container>
      </div>
    );
  }
}


export default LandingPage;
