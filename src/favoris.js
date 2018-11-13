import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Background from './starry-night.jpg';
import { faSun, faCloudSun, faCloudShowersHeavy, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './favoris.css';

export default class Example extends React.Component {
  render() {
    return (

      <div className="background">

      <Container>

        <Row>
          <Col className="main">Mes favoris</Col>
        </Row>

        <Row className="main-block">

          <Col className="favItem" sm="12">Lieu
            <FontAwesomeIcon icon={faSun}/>
            <h6>Météo actuelle</h6>
            <p>Ciel dégagé, 25C, Brise légère, 2.6 m/s</p>
            <FontAwesomeIcon icon={faTimesCircle} />
            </Col>

          <Col className="favItem" sm="12">Lieu
            <FontAwesomeIcon icon={faCloudSun} />
            <h6>Météo actuelle</h6>
            <p>Ciel dégagé, 25C, Brise légère, 2.6 m/s</p>
            <FontAwesomeIcon icon={faTimesCircle} />
            </Col>

          <Col className="favItem" sm="12">Lieu
             <FontAwesomeIcon icon={faCloudShowersHeavy} />
            <h6>Météo actuelle</h6>
            <p>Ciel dégagé, 25C, Brise légère, 2.6 m/s</p>
            <FontAwesomeIcon icon={faTimesCircle} />
            </Col>

        </Row>

      </Container>

      </div>
    );
  }
}
