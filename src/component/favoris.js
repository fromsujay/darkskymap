import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Background from '../images/starry-night.jpg';
import { faSun, faCloudSun, faCloudShowersHeavy, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../stylesheet/favoris.css';

/* This component displays locations identified as favorites by a given user */
export default class Example extends React.Component {
  render() {
    return (

      <div className="background">

      <Container>

        <Row className="main-block">

          <Col className="main" xs="11" sm="8" md={{ size: 8}}>Mes favoris</Col>

          <Col className="favItem" xs="11" sm="8" md={{ size: 8 }}>Lieu
            <FontAwesomeIcon className="iconStyle" icon={faSun}/>
            <h6>Météo actuelle</h6>
            <p>Ciel dégagé, 25°C, Brise légère, 2.6 m/s</p>
            <FontAwesomeIcon className="iconStyle" icon={faTimesCircle} />
            </Col>

          <Col className="favItem" xs="11" sm="8" md={{ size: 8}}>Lieu
            <FontAwesomeIcon className="iconStyle" icon={faCloudSun} />
            <h6>Météo actuelle</h6>
            <p>Ciel dégagé, 25°C, Brise légère, 2.6 m/s</p>
            <FontAwesomeIcon className="iconStyle" icon={faTimesCircle} />
            </Col>

          <Col className="favItem" xs="11" sm="8" md={{ size: 8}}>Lieu
             <FontAwesomeIcon className="iconStyle" icon={faCloudShowersHeavy} />
            <h6>Météo actuelle</h6>
            <p>Ciel dégagé, 25°C, Brise légère, 2.6 m/s</p>
            <FontAwesomeIcon className="iconStyle" icon={faTimesCircle} />
            </Col>

            <Col className="favItem" xs="11" sm="8" md={{ size: 8}}>
              <Button className="backButton">Retour</Button>
              </Col>

        </Row>

      </Container>

      </div>
    );
  }
}
