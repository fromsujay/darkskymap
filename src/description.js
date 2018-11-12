import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import './description.css';

class Description extends Component {
  render() {
    return (
      <div className="focus">
      <Container>
        <Row className="heading">
          <Col><FontAwesomeIcon icon={faCity}/></Col>
          <Col>Parc Monceau</Col>
          <Col><FontAwesomeIcon icon={faTimesCircle}/></Col>
        </Row>
        <div className="descriptionBody">
        <Row>
          <Col>Date d'observation: 13.10.2018</Col>
        </Row>
        <Row>
          <Col>Latitude: 48.879684</Col>
        </Row>
        <Row>
          <Col>Longitude: 2.308955</Col>
        </Row>
        <Row>
          <Col>Horizon sud dégagé: sud à sud-ouest</Col>
        </Row>
        <Row>
          <Col>Echelle de Bortle: C9</Col>
        </Row>
        <Row>
          <Col>C9 = Ciel de centre-ville : Les seuls objets célestes qui offrent de belles images au télescope sont la Lune, les planètes, et certains des amas d'étoiles les plus brillants (à condition qu'on puisse les localiser). La magnitude limite à l'œil nu est 4,0 ou moins.</Col>
        </Row>
        <Row>
          <Col><FontAwesomeIcon icon={faSun}/></Col>
          <Col>
            <Row>Météo Actuelle</Row>
            <Row>Ciel dégagé</Row>
            <Row>25° C</Row>
            <Row>Brise légère, 2.6 m/s</Row>
          </Col>
        </Row>
        <Row>
          <Col>Observation planétaire et lunaire uniquement</Col>
        </Row>
        <Row>
          <Col>Compromis urbain</Col>
        </Row>
        <Row>
          <Col><FontAwesomeIcon icon={faPlusCircle} size={70}/></Col>
          <Col><FontAwesomeIcon icon={faHeart}/></Col>
        </Row>
        </div>
      </Container>
      </div>


    );
  }
}


export default Description;
