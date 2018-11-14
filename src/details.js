import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardFooter, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet/details.css';

class Details extends Component {
  render() {
    return (
    <div className="detailsRootStyle">
     <Col xs="8">
      <Card className="cardDetailsStyle">
        <CardHeader className="headingDetailsStyle" >
          <FontAwesomeIcon icon={faCity} className="detailsIconStyle"/>
          <h4>Parc Monceau</h4>
          <FontAwesomeIcon icon={faTimesCircle} className="detailsIconStyle"/>
        </CardHeader>
        <CardBody className="detailsBodyStyle">
          <CardText>Transparence: T5</CardText>
          <CardText>Pollution Lumineuse: P5</CardText>
          <CardText>Seeing(Turbulence): S1</CardText>
          <CardText>Sky Quality Meter: 14.6 mag/arcsec2</CardText>
          <CardText>Deserte Facile en voiture: oui</CardText>
          <CardText>Possibilité de stationnement: non</CardText>
          <CardText>Disponibilité de courant: non</CardText>
          <CardText className="detailsTextStyle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</CardText>
        </CardBody>
        <CardFooter className="detailsFooterStyle">
        <Button outline className="backButtonStyle">Retour</Button>
        <FontAwesomeIcon  icon={faHeart} className="detailsIconStyle"/>
        </CardFooter>
      </Card>
    </Col>
   </div>
    );
  }
}


export default Details;
