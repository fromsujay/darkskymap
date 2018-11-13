import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet/description.css';

class Description extends Component {
  render() {
    return (
    <div className="rootStyle">
     <Col xs="8">
      <Card className="cardStyle">
        <CardHeader className="heading" >
          <FontAwesomeIcon icon={faCity} className="descriptionIconStyle"/>
          <h4>Parc Monceau</h4>
          <FontAwesomeIcon icon={faTimesCircle} className="descriptionIconStyle"/>
        </CardHeader>
        <CardBody>
          <CardText>Date d'Observation: 13.10.2018</CardText>
          <CardText>Latitude: 48.879684</CardText>
          <CardText>Longitude: 2.308955</CardText>
          <CardText>Horizon sud dégagé: sud à sud-ouest</CardText>
          <div className="bortleStyle">
            <CardText>Echelle de Bortle: C9</CardText>
            <CardText className="paraStyle">C9 = Ciel de centre-ville : Les seuls objets célestes qui offrent de belles images au télescope sont la Lune, les planètes, et certains des amas d'étoiles les plus brillants (à condition qu'on puisse les localiser). La magnitude limite à l'œil nu est 4,0 ou moins.</CardText>
          </div>
          <div className="weatherInfo">
            <FontAwesomeIcon icon={faSun} className="weatherIconStyle"/>
            <div className="weatherTextStyle">
             <p>Météo actuelle</p>
             <p>Ciel dégagé</p>
             <p>25° C</p>
             <p>Brise légère, 2.6 m/s</p>
             </div>
          </div>
          <CardText>Observation planétaire et lunaire uniquement</CardText>
          <CardText>Compromis urbain</CardText>
        </CardBody>
        <CardFooter className="footerStyle">
          <FontAwesomeIcon  icon={faPlusCircle} className="descriptionIconStyle"/>
          <FontAwesomeIcon  icon={faHeart} className="descriptionIconStyle"/>
        </CardFooter>
      </Card>
    </Col>
   </div>
    );
  }
}


export default Description;
