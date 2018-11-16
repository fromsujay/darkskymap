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
  DropdownItem
  } from 'reactstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/Map.css';
import { Redirect, Link } from "react-router-dom";

import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faTimesCircle, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/description.css';
import '../stylesheet/details.css';

/*code in componentWillMount capture users current position & centers map on captured position */
/*code in componentDidMount collects locations from database to prepare generation of markers */
/*map function iterating on locations array prepares data for generation of markers */
/*{markerlist} array generates markers on map */
/*ternary operator displays home and favorites links if user is connected and home, signin & signup if not*/
/*export default GoogleApiWrapper component contains map, takes API key as input and needs map container to function */
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
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

   toggleDescription() {
    this.setState({
      showDescription: !this.state.showDescription
    });
  }

  toggleDetails(detailsStatus) {
    this.setState({
      showDescription: detailsStatus,
      showDetails: !detailsStatus,
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
       // console.log(pos);
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
    // console.log('Data -----',data);
    // let locationsCopy = [...ctx.state.locations]
    // locationsCopy.push()
    ctx.setState({
      locations:data.locations
    })
    });
    }

//-------Import de NavigationBar avant Reducer dans Map------//
//-------Import de NavigationBarDisplay après Reducer dans Map-----//

  render() {
    console.log("this.state.showDescription",this.state.showDescription);

    const ctx= this;
    var markerList = ctx.state.locations.map(
      function(data){
        console.log('location map', data)
        return(
          // console.log('returned location lat',data.latitude),
          // console.log('returned location lng',data.longitude),
          <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: data.latitude, lng: data.longitude}}
    onClick={ctx.toggleDescription}
    /> )
      }
    )

    // console.log('this.state.locations -------', ctx.state.locations);

    return (

      <div id="wrapper">
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
      </Map>

      

      }
      {this.state.showDescription ?
            <Description descriptionDisplayStatus={this.state.showDescription} handleStatus={this.toggleDescription} handleDetailsStatus={this.toggleDetails} closeFunction={this.closeWindow}/>
            : null
      }
      {this.state.showDetails?
            <Details closeFunction={this.closeWindow}/>
            : null
      }
    </div>
    );
  }
}

/* Description component displays description concerning a location after cliking on a location icon */
class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.descriptionDisplayStatus,
    };
  }

  toggleDescription=()=>{
    // console.log("status v1");
    // console.log(!this.state.status);
    var tempStatus = !this.state.status;
    this.setState({
      status: !this.state.status
    });
    // console.log("status v2");
    // console.log(!this.state.status);
    this.props.handleDetailsStatus(tempStatus);
  }

  toggleDetails=()=>{
    var tempVariable = !this.state.status;
    this.setState({
      status: !this.state.status
    });
    this.props.handleDetailsStatus(tempVariable);
  }

  closeComponent=()=>{
    this.props.closeFunction();
  }

  render() {
    console.log("render description : ",this.state.status);
    return (
    <div className="rootStyle">
     <Col xs="8">
      <Card className="cardStyle">
        <CardHeader className="heading" >
          <FontAwesomeIcon icon={faCity} className="descriptionIconStyle"/>
          <h4>Parc Monceau</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={this.closeComponent} className="descriptionIconStyle"/>
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
          <FontAwesomeIcon onClick={this.toggleDetails}  icon={faPlusCircle} className="descriptionIconStyle"/>
          <FontAwesomeIcon  icon={faHeart} className="descriptionIconStyle"/>
        </CardFooter>
      </Card>
    </Col>
   </div>
    );
  }
}


/* Details component displays details after cliking on plus sign inside a description page */
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.descriptionDisplayStatus,
    };

  }

  closeComponent=()=>{
    this.props.closeFunction();
  }


  render() {
    return (
    <div className="detailsRootStyle">
     <Col xs="8">
      <Card className="cardDetailsStyle">
        <CardHeader className="headingDetailsStyle" >
          <FontAwesomeIcon icon={faCity} className="detailsIconStyle"/>
          <h4>Parc Monceau</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={this.closeComponent} className="detailsIconStyle"/>
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
  height: '100vh',
}

export default GoogleApiWrapper({
  apiKey: api
})(MapContainer)
