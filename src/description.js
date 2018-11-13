import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './description.css';

class Description extends Component {
  render() {
    return (
        <Container className="description">
        <Container className="heading">
          <Row >
            <Col xs="12" sm="4"><FontAwesomeIcon icon={faCity} className="iconSize"/></Col>
            <Col xs="12" sm="4">Parc Monceau</Col>
            <Col xs="12" sm="4"><FontAwesomeIcon icon={faTimesCircle} className="iconSize"/></Col>
          </Row>
        </Container>
        <Container className="descriptionBody">
          <Row>
            <Col xs="12">Date d'Observation: 13.10.2018</Col>
          </Row>
          <Row>
            <Col xs="12">Latitude: 48.879684</Col>
          </Row>
          <Row>
            <Col xs="12">Longitude: 2.308955</Col>
          </Row>
          <Row>
            <Col xs="12">Horizon sud dégagé: sud à sud-ouest</Col>
          </Row>
          <Row className="trial">
            <Col xs="12">C9 = Ciel de centre-ville : Les seuls objets célestes qui offrent de belles images au télescope sont la Lune, les planètes, et certains des amas d'étoiles les plus brillants (à condition qu'on puisse les localiser). La magnitude limite à l'œil nu est 4,0 ou moins.</Col>
          </Row>
          <Row>
            <Col xs="12" sm="6"><FontAwesomeIcon icon={faSun} className="weatherIcon"/></Col>

            <Col xs="12" sm="6">
              <p>Météo actuelle</p>
              <p>Ciel dégagé</p>
              <p>25° C</p>
              <p>Brise légère, 2.6 m/s</p>
            </Col>

          </Row>
          <Row>
            <Col xs="12">Observation planétaire et lunaire uniquement</Col>
          </Row>
          <Row>
            <Col xs="12">Compromis urbain</Col>
          </Row>
        <Row className="icons">
          <Col xs="12" sm="6"><FontAwesomeIcon  icon={faPlusCircle} /></Col>
          <Col xs="12" sm="6"><FontAwesomeIcon  icon={faHeart} /></Col>
        </Row>
        </Container>
        </Container>

    );
  }
}


export default Description;
