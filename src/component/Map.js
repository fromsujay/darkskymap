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
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/Map.css';
import '../stylesheet/favoris.css';
import { Redirect, Link } from "react-router-dom";
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faCity, faFrown, faSmile, faBan, faCheck, faExclamationTriangle, faLowVision, faSmog, faMoon, faGlobeAsia, faSun, faCloudSun, faCloudShowersHeavy, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/description.css';
import '../stylesheet/details.css';
import { FaRegCalendarAlt, FaWind, FaRegFrown, FaRegMeh, FaRegSmile } from "react-icons/fa";
import { IoIosCalendar, IoIosGlobe, IoIosThermometer } from "react-icons/io";
import { MdLocationCity} from "react-icons/md";
import { FiNavigation2, FiNavigation } from "react-icons/fi";
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


class Layout extends Component {

  componentDidUpdate() {
    if(this.props.map && this.props.activeOverlay ) {
      var getTileUrl = function(tile, zoom){
            return '//gibs.earthdata.nasa.gov/wmts/epsg3857/best/' + 'VIIRS_Black_Marble/default/default/' + 'GoogleMapsCompatible_Level8/' + zoom + '/' + tile.y + '/' + tile.x + '.png';
      }

      var tileSize = new this.props.google.maps.Size(256,256);
      var layerOptions = {
        alt: 'VIIRS_Black_Marble',
        getTileUrl: getTileUrl,
        maxZoom: 8,
        minZoom: 1,
        name: 'VIIRS_Black_Marble',
        tileSize,
        opacity: 0.5
      }

      var imageMapType = new this.props.google.maps.ImageMapType(layerOptions);
      console.log(this.props);
      this.props.map.overlayMapTypes.insertAt(0,imageMapType);
    } else if(this.props.map && this.props.activeOverlay===false){
      this.props.map.overlayMapTypes.removeAt(0);
    }
  }

  render() {
    return <div></div>

  }

  }

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
      showFavorite: false,
      connection: true,
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.returnToDescription = this.returnToDescription.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.displayFavorite = this.displayFavorite.bind(this);
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
      showFavorite: false,
    });
  }

  displayFavorite() {
    this.setState({
      showFavorite: true,
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
    //console.log(response);
    return response.json();
    }).then(function(data) {
    console.log(data.locations);
    ctx.setState({
      locations: data.locations
    })
    });
    }

//-------Import de NavigationBar avant Reducer dans Map------//
//-------Import de NavigationBarDisplay après Reducer dans Map-----//

  addFavorite(userId, locationName, latitude, longitude) {
    if(this.props.logged === true){
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
    } else {
      this.setState({
      connection:false,
      modal: !this.state.modal
        });

    }
    }

  render() {

    const ctx= this;
    console.log(ctx.state.locations);
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
              Nous vous invitons à vous connecter pour accéder à cette fonctionnalité.
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
        streetViewControl={true}
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
      <Layout activeOverlay={this.props.display}/>

      <Marker
      title={'You are here'}
      icon={circle}
      position={{lat: this.state.lat, lng: this.state.lng}}
      />

      </Map>

      <NavigationBarDisplay displayFavoriteParent={this.displayFavorite} />

      }
      {this.state.showDescription ?
            <Description addFavoriteParent={this.addFavorite} data={this.state.data} toggleDetails={this.toggleDetails} closeFunction={this.closeWindow} />
            : null
      }
      {this.state.showDetails?
            <Details addFavoriteParent={this.addFavorite} data={this.state.data} dataObject={this.state.dataObject} returnToDescription={this.returnToDescription} closeFunction={this.closeWindow} />
            : null
      }
      {this.state.showFavorite?
            <Favoris userId={this.props.userId} closeFunction={this.closeWindow} />
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

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
    dd = '0'+dd
    }

    if(mm<10) {
    mm = '0'+mm
    }

    var date = dd +'.'+ mm +'.'+ yyyy;

    this.state = {
       date: date
    }

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
          <h4 className="location-name">{this.props.data.locationName}</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={()=>this.closeComponent()} className="descriptionIconStyle"/>
        </CardHeader>
        <CardBody>
          <CardText className="textdesc"><FaRegCalendarAlt className="calendarIcon"/>{this.state.date}</CardText>
          <CardText className="textdesc">Latitude: {this.props.data.latitude}</CardText>
          <CardText className="textdesc">Longitude: {this.props.data.longitude}</CardText>
          <CardText className="textdesc">Horizon sud dégagé: {this.props.data.isSouthernHorizonClear}</CardText>
          <div className="bortleStyle">
            <CardText className="paraStyle">{this.props.data.explanationOfBortleScale}</CardText>
          </div>
          <div className="weatherInfo">
            <FontAwesomeIcon icon={faSun} className="weatherIconStyle"/>
            <div className="weatherTextStyle">
             <p className="weatherdesc">Météo actuelle</p>
             <p className="weatherdesc">Ciel dégagé</p>
             <p className="weatherdesc">23 C<IoIosThermometer className="thermoIcon"/></p>
             <p className="weatherdesc">Brise légère, 2.6 m/s<FaWind className="windIcon"/></p>
             </div>
          </div>
          <CardText className="textdesc">{this.props.data.observationCategory}<FontAwesomeIcon icon={faGlobeAsia} className="othersIcon"/><FontAwesomeIcon icon={faMoon} className="othersIcon"/></CardText>
          {this.props.data.urbanCompromise ? <CardText className="textdesc">Compromis urbain<MdLocationCity className="cityIcon"/></CardText> : null}
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

let bortleScale;

    if (this.props.dataObject.bortleScale === 'C1 (Site excellent)' || this.props.dataObject.bortleScale === 'C2 (Site vraiment noir)' || this.props.dataObject.bortleScale === 'C3 (Ciel rural)') {
      bortleScale = < FaRegSmile style={{marginLeft: 10, fontSize: 40}} />
  } else if (this.props.dataObject.bortleScale === 'C4 (Transition rural-urbain)' || this.props.dataObject.bortleScale === 'C5 (Ciel péri-urbain)' || this.props.dataObject.bortleScale === 'C6 (Ciel de banlieue)') {
    bortleScale = < FaRegMeh style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.bortleScale === 'C7 (Transition banlieue-ville)' || this.props.dataObject.bortleScale === 'C8 (Ciel de ville)' || this.props.dataObject.bortleScale === 'C9 (Ciel de centre-ville)') {
bortleScale = < FaRegFrown style={{marginLeft: 10, fontSize: 40}}/>
}

let transparency;

if (this.props.dataObject.transparency === 'T1' || this.props.dataObject.transparency === 'T2' || this.props.dataObject.transparency === 'T3') {
  transparency = < FaRegSmile style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.transparency === 'T4' || this.props.dataObject.transparency === 'T5' || this.props.dataObject.transparency === 'T6') {
transparency = < FaRegMeh style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.transparency === 'T7' || this.props.dataObject.transparency === 'T8' || this.props.dataObject.transparency === 'T9') {
transparency = < FaRegFrown style={{marginLeft: 10, fontSize: 40}} />
}

let lightPollution;

if (this.props.dataObject.lightPollution === 'P1' || this.props.dataObject.lightPollution === 'P2' || this.props.dataObject.lightPollution === 'P3') {
  lightPollution = < FaRegSmile style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.lightPollution === 'P4' || this.props.dataObject.lightPollution === 'P5' || this.props.dataObject.lightPollution === 'P6') {
lightPollution = < FaRegMeh style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.lightPollution === 'P7' || this.props.dataObject.lightPollution === 'P8' || this.props.dataObject.lightPollution === 'P9') {
lightPollution = < FaRegFrown style={{marginLeft: 10, fontSize: 40}}/>
}

let seeing;

if (this.props.dataObject.seeing === 'S1' || this.props.dataObject.seeing === 'S2') {
  seeing = < FaRegFrown style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.seeing === 'S3') {
seeing = < FaRegMeh style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.seeing === 'S4' || this.props.dataObject.seeing === 'S5') {
seeing = < FaRegSmile style={{marginLeft: 10, fontSize: 40}}/>
}

let skyQualityMeter;

if (this.props.dataObject.skyQualityMeter < 19) {
  skyQualityMeter = < FaRegFrown style={{marginLeft: 10, fontSize: 40}}/>
} else if (20.5 >= this.props.dataObject.skyQualityMeter > 19) {
skyQualityMeter = < FaRegMeh style={{marginLeft: 10, fontSize: 40}}/>
} else if (this.props.dataObject.skyQualityMeter > 20.5) {
skyQualityMeter = < FaRegSmile style={{marginLeft: 10, fontSize: 40}}/>
}


    return (
    <div className="detailsRootStyle">
     <Col xs="11" md="6">
      <Card className="cardDetailsStyle">
        <CardHeader className="headingDetailsStyle" >
          <FontAwesomeIcon icon={faCity} className="detailsIconStyle"/>
          <h4 className="locationNameDetails">{this.props.dataObject.locationName}</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={()=>this.closeComponent()} className="detailsIconStyle"/>
        </CardHeader>
        <CardBody className="detailsBodyStyle">
          <CardText className="textDetails">Date d'enregistrement: {this.props.dataObject.observationDate}</CardText>
          <CardText className="textDetails">Echelle de Bortle: {bortleScale}</CardText>
          <CardText className="textDetails">Transparence: {transparency}</CardText>
          <CardText className="textDetails">Pollution Lumineuse: {lightPollution}</CardText>
          <CardText className="textDetails">Seeing(Turbulence): {seeing}</CardText>
          <CardText className="textDetails">Sky Quality Meter: {skyQualityMeter}</CardText>
          <CardText className="textDetails">Facilité d'accès en voiture: {this.props.dataObject.easeOfAccessibilityByCar ? '   oui' : '   non'} </CardText>
          <CardText className="textDetails">Possibilité de stationnement: {this.props.dataObject.parkingAvailability ? '   oui' : '   non'}</CardText>
          <CardText className="textDetails">Disponibilité de courant: {this.props.dataObject.powerSupplyAvailability ? '   oui' : '   non'}</CardText>
          <CardText className="detailsTextStyle">{this.props.dataObject.additionalInformation}</CardText>
        </CardBody>
        <CardFooter className="detailsFooterStyle">
        <Button outline onClick={()=>this.toggleDetails()} className="backButtonStyle">Retour</Button>
        <FontAwesomeIcon onClick={()=>this.addFavorite(this.props.userId, this.props.data.locationName, this.props.data.latitude, this.props.data.longitude)}  icon={faHeart} className="detailsIconStyle"/>
        </CardFooter>
      </Card>
    </Col>
   </div>
    );
  }
}




class Favoris extends Component {
  constructor(props) {
    super(props);
    this.state = {
    favorites: []
    };
    this.closeComponent = this.closeComponent.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  closeComponent(){
    this.props.closeFunction();
  }

  componentWillMount() {
    const ctx= this;
    fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'userId='+this.props.userId
    })
    .then(function(response) {
    return response.json();
    }).then(function(data) {
      var userFavorites = data.favorites
    ctx.setState({
      favorites:userFavorites
    })
    });
    }

    componentDidUpdate(){
      const ctx= this;
      fetch('http://localhost:3000/favorites', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'userId='+this.props.userId
      })
      .then(function(response) {
      return response.json();
      }).then(function(data) {
        var userFavorites = data.favorites
      ctx.setState({
        favorites:userFavorites
      })
      });
    }

deleteFavorite(locationName) {
  const ctx = this;
  fetch('http://localhost:3000/deletefavorite', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'userId='+this.props.userId+'&locationName='+locationName
  })
  .then(function(response) {
    console.log('Response delete', response );
  return response.json();
  }).then(function(data) {
    console.log('data delete: ', data );
    var userFavorites = data.user.favorite;
    ctx.setState({
      favorites:userFavorites
    })

  });
  }




  render() {
var ctx = this;
var favoritesList = ctx.state.favorites.map(
  function(data){
    return(
      <Col className="favItem" xs="11" sm="8" md={{ size: 8 }}>{data.locationName}
        <FontAwesomeIcon className="iconStyle" icon={faSun}/>
        <h6 className="favFont">Météo actuelle</h6>
        <p>Ciel dégagé, 25°C, Brise légère, 2.6 m/s</p>
        <FontAwesomeIcon onClick={()=>ctx.deleteFavorite( data.locationName )} className="iconStyle" icon={faTimesCircle} />
        </Col>
    )
  }
  )
    return (

      <div className="background">

      <Container>

        <Row className="main-block">

          <Col className="main" xs="11" sm="8" md={{ size: 8 }}>Mes favoris</Col>

          {favoritesList}

            <Col className="favItem" xs="11" sm="8" md={{ size: 8}}>
              <Link to="/map"><Button outline onClick={()=>this.closeComponent()} className="backButton">Aller à la carte</Button></Link>
            </Col>

        </Row>

      </Container>

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
  return { logged: state.logged, userId: state.userId, display: state.display }
}

var Wrapper =  GoogleApiWrapper({
  apiKey: api
})(MapContainer)

export default connect(
    mapStateToProps,
    null
)(Wrapper);
