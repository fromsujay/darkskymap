import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import './details.css';

class Details extends Component {
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
            <Col xs="12">Transparence: T5</Col>
          </Row>
          <Row>
            <Col xs="12">Pollution Lumineuse: P5</Col>
          </Row>
          <Row>
            <Col xs="12">Seeing(Turbulence): S1</Col>
          </Row>
          <Row>
            <Col xs="12">Sky Quality Meter: 14.6 mag/arcsec2</Col>
          </Row>
          <Row>
            <Col xs="12">Deserte facile en voiture: oui</Col>
          </Row>
          <Row>
            <Col xs="12">Possibilité de stationnement: non</Col>
          </Row>
          <Row>
            <Col xs="12">Disponibilité du courant: non</Col>
          </Row>
          <Row>
            <Col xs="12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Expectoque quid ad id, quod quaerebam, respondeas. At ille non pertimuit saneque fidenter: Istis quidem ipsis verbis, inquit; Eam tum adesse, cum dolor omnis absit;</Col>
          </Row>
        <Row className="icons">
          <Button xs="12" sm="6" outline id="backButton">Back</Button>
          <FontAwesomeIcon xs="12" sm="6" icon={faHeart} />
        </Row>
        </Container>
        </Container>

    );
  }
}


export default Details;
