import React, {Component} from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
  } from 'reactstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/Map.css';
import { Redirect, Link } from "react-router-dom";
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun, faFrown, faSmile, faBan, faCheck, faExclamationTriangle, faLowVision, faSmog } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/description.css';
import '../stylesheet/details.css';
import NavigationBarDisplay from './navigationBarDisplay.js';
import circle from '../images/blue_circle.png';
import {connect} from 'react-redux';


/* code in componentWillMount capture users current position & centers map on captured position */
/* code in componentDidMount collects locations from database to prepare generation of markers */
/* map function iterating on locations array prepares data for generation of markers */
/* {markerlist} array generates markers on map */
/* ternary operator displays home and favorites links if user is connected and home, signin & signup if not*/
/* export default GoogleApiWrapper component contains map, takes API key as input and needs map container to function */
/* toggle function is used by hamburger menu */
/* toggleDescription function displays description when user clicks on a marker */
/* toggleDetails function displays details and makes description disappear when user clicks on plus sign */
/* returnToDescription function displays description and makes details disappear when user clicks on retour */
/* closeWindow function closes description and details windows respectively when user clicks on x sign at top right corner */
export class MapContainer extends Component {

  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      isOpen: false,
      connectStatus: false,
      locations:[],
      showDescription: false,
      showDetails: false,
      connection: true,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.returnToDescription = this.returnToDescription.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

   toggleDescription(data) {

    this.setState({
      showDescription: true,
      data: {...data}

    });
   }

  toggleDetails(dataObject) {
    if(this.props.logged === true){
    this.setState({
      showDescription: false,
      showDetails: true,
      connection: true,
      dataObject: {...dataObject}
      });
    } else {
      this.setState({
      connection:false,
      modal: !this.state.modal
        });
      }
    }

  returnToDescription() {
   this.setState({
     showDescription: true,
     showDetails: false,
   });
  }

  closeWindow() {
    this.setState({
      showDescription: false,
      showDetails: false,
    });
  }


  componentWillMount() {
    // This bloc of code gets the user's geolocation from his browser
    var ctx = this;
     navigator.geolocation.getCurrentPosition(function(position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };

       ctx.setState({
         lat: pos.lat,
         lng: pos.lng
       })
     }, function() {
       // this funtion is empty but the whole geolocation process won't work without it
     });

  };

  componentDidMount() {
    const ctx= this;
    fetch('http://localhost:3000/map').then(function(response) {
      console.log(response);
    return response.json();
    }).then(function(data) {
    ctx.setState({
      locations:data.locations
    })
    });
    }

//-------Import de NavigationBar avant Reducer dans Map------//
//-------Import de NavigationBarDisplay après Reducer dans Map-----//

  addFavorite(userId, locationName, latitude, longitude) {
    const ctx= this;
    fetch('http://localhost:3000/addfavorite', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'userId='+ctx.props.userId+'&locationName='+locationName+'&latitude='+latitude+'&longitude='+longitude
    })

    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    console.log(data);
    });
  }

  render() {

    const ctx= this;
    var markerList = ctx.state.locations.map(
      function(data){
        return(
          <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: data.latitude, lng: data.longitude}}
    onClick={()=>ctx.toggleDescription(data)}
    /> )
      }
    )

console.log('This props userId: ', this.props.userId);

    return (

      <div id="wrapper">

        { this.state.connection
        ? null
        :
        <div>
          <Modal isOpen={this.state.modal}>
            <ModalBody className="alertSignIn">
              Veuillez vous connecter pour accéder aux détails.
            </ModalBody>
            <ModalFooter className="alertButton">
              <Link to="/signin"><Button color="primary">Ok</Button>{' '}</Link>
              <Button color="secondary" onClick={this.toggleDetails}>Fermer</Button>
            </ModalFooter>
          </Modal>
        </div>
      }

      <Map
        google={this.props.google}
        zoom={6}
        style={style}
        styles={styles}
        disableDefaultUI={true}
        zoomControl={true}
        initialCenter={{
          lat: 48.885391,
          lng: 2.2979853
          }}
        center={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
      >
        {markerList}
        <Marker
        title={'You are here'}
        icon={circle}
        position={{lat: this.state.lat, lng: this.state.lng}}
        />
      </Map>

      <NavigationBarDisplay />

      }
      {this.state.showDescription ?
            <Description addFavoriteParent={this.addFavorite} data={this.state.data} toggleDetails={this.toggleDetails} closeFunction={this.closeWindow} />
            : null
      }
      {this.state.showDetails?
            <Details addFavoriteParent={this.addFavorite} data={this.state.data} dataObject={this.state.dataObject} returnToDescription={this.returnToDescription} closeFunction={this.closeWindow} />
            : null
      }
    </div>
    );
  }
}

/* Description component displays description concerning a location after cliking on a marker on map */
/* toggleDetails function displays details and makes description disappear through parent function in map component */
/* closeComponent function closes description through closeWindow function in parent map component */
class Description extends Component {
  constructor(props) {
    super(props);
    this.closeComponent = this.closeComponent.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  toggleDetails(dataObject){
    this.props.toggleDetails(dataObject);
  }

  closeComponent(){
    this.props.closeFunction();
  }

  addFavorite(userId, locationName, latitude, longitude){
    this.props.addFavoriteParent(userId, locationName, latitude, longitude)
  }

  render() {

    return (
    <div className="rootStyle">
     <Col xs="11" md="6">
      <Card className="cardStyle">
        <CardHeader className="heading">
          <FontAwesomeIcon icon={faCity} className="descriptionIconStyle"/>
          <h4>{this.props.data.locationName}</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={this.closeComponent} className="descriptionIconStyle"/>
        </CardHeader>
        <CardBody>
          <CardText>Date d'Observation: {this.props.data.observationDate}</CardText>
          <CardText>Latitude: {this.props.data.latitude}</CardText>
          <CardText>Longitude: {this.props.data.longitude}</CardText>
          <CardText>Horizon sud dégagé: {this.props.data.isSouthernHorizonClear}</CardText>
          <div className="bortleStyle">
            <CardText className="paraStyle">{this.props.data.explanationOfBortleScale}</CardText>
          </div>
          <div className="weatherInfo">
            <FontAwesomeIcon icon={faSun} className="weatherIconStyle"/>
            <div className="weatherTextStyle">
             <p>Météo actuelle</p>
             <p>Ciel dégagé</p>
             <p>23 C</p>
             <p>Brise légère, 2.6 m/s</p>
             </div>
          </div>
          <CardText>{this.props.data.observationCategory}</CardText>
          {this.props.data.urbanCompromise ? <CardText className="text">Compromis urbain</CardText> : null}
        </CardBody>
        <CardFooter className="footerStyle">
          <FontAwesomeIcon onClick={()=>this.toggleDetails(this.props.data)} icon={faPlusCircle} className="descriptionIconStyle"/>
          <FontAwesomeIcon onClick={()=>this.addFavorite(this.props.userId, this.props.data.locationName, this.props.data.latitude, this.props.data.longitude)}  icon={faHeart} className="descriptionIconStyle"/>
        </CardFooter>
      </Card>
    </Col>
   </div>
    );
  }
}


/* Details component displays details after cliking on plus sign inside a description page */
/* toggleDetails function displays description and makes details disappear through returnToDescription function in parent map component */
/* closeComponent function closes details through closeWindow function in parent map component */
class Details extends Component {
  constructor(props) {
    super(props);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.closeComponent = this.closeComponent.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  toggleDetails(){
    this.props.returnToDescription();
  }

  closeComponent(){
    this.props.closeFunction();
  }

  addFavorite(userId, locationName, latitude, longitude){
    this.props.addFavoriteParent(userId, locationName, latitude, longitude)
  }

  render() {

    return (
    <div className="detailsRootStyle">
     <Col xs="11" md="6">
      <Card className="cardDetailsStyle">
        <CardHeader className="headingDetailsStyle" >
          <FontAwesomeIcon icon={faCity} className="detailsIconStyle"/>
          <h4>{this.props.dataObject.locationName}</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={this.closeComponent} className="detailsIconStyle"/>
        </CardHeader>
        <CardBody className="detailsBodyStyle">
          <CardText>Echelle de Bortle: {this.props.dataObject.bortleScale}</CardText>
          <CardText>Transparence: {this.props.dataObject.transparency}</CardText>
          <CardText>Pollution Lumineuse: {this.props.dataObject.lightPollution}</CardText>
          <CardText>Seeing(Turbulence): {this.props.dataObject.seeing}</CardText>
          <CardText>Sky Quality Meter: {this.props.dataObject.skyQualityMeter} mag/arcsec2</CardText>
          <CardText>Deserte Facile en voiture: {this.props.dataObject.easeOfAccessibilityByCar ? 'oui' : 'non'} </CardText>
          <CardText>Possibilité de stationnement: {this.props.dataObject.parkingAvailability ? 'oui' : 'non'}</CardText>
          <CardText>Disponibilité de courant: {this.props.dataObject.powerSupplyAvailability ? 'oui' : 'non'}</CardText>
          <CardText className="detailsTextStyle">{this.props.dataObject.additionalInformation}</CardText>
        </CardBody>
        <CardFooter className="detailsFooterStyle">
        <Button outline onClick={this.toggleDetails} className="backButtonStyle">Retour</Button>
        <FontAwesomeIcon onClick={()=>this.addFavorite(this.props.userId, this.props.data.locationName, this.props.data.latitude, this.props.data.longitude)}  icon={faHeart} className="detailsIconStyle"/>
        </CardFooter>
      </Card>
    </Col>
   </div>
    );
  }
}


// Api google map
const api = 'AIzaSyD2nYRM-_UJWtKVCdtOFdJtEWS1mTp4Ajk';

// Custom map style
const styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]

const style = {
  width: '100vw',
  minHeight: '100vh',
}


function mapStateToProps(state) {
  return { logged: state.logged, userId: state.userId }
}

var Wrapper =  GoogleApiWrapper({
  apiKey: api
})(MapContainer)

export default connect(
    mapStateToProps,
    null
)(Wrapper);
