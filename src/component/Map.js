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
import Description from './description.js';
import Details from './details.js';

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
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
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


  componentWillMount() {
    // This bloc of code gets the user's geolocation from his browser
    var ctx = this;
     navigator.geolocation.getCurrentPosition(function(position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
       console.log(pos);
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
    console.log('Data -----',data);
    // let locationsCopy = [...ctx.state.locations]
    // locationsCopy.push()
    ctx.setState({
      locations:data.locations
    })
    });
    }

  render() {


    const ctx= this;
    var markerList = ctx.state.locations.map(
      function(data){
        console.log('location map', data)
        return(
          console.log('returned location lat',data.latitude),
          console.log('returned location lng',data.longitude),
          <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: data.latitude, lng: data.longitude}}
    onClick={this.toggleDescription}
    /> )
      }
    )

    console.log('this.state.locations -------', ctx.state.locations);

    return (

      <div id="wrapper">
      <Map
        google={this.props.google}
        zoom={12}
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
      {
        this.state.connectStatus ?
        <div>
          <Navbar style={{opacity:0.8}} color="dark" light expand="md">
            <Link to="/"><NavbarBrand style={{color:'white'}}>Dark Sky Map</NavbarBrand></Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/" style={{color:'white'}}>Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/favoris" style={{color:'white'}}>Favoris</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div> :
        <div>
          <Navbar style={{opacity:0.8}} color="dark" light expand="md">
            <Link to="/"><NavbarBrand style={{color:'white'}}>Dark Sky Map</NavbarBrand></Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/" className="homeLink" style={{color:'white'}}>Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/signin" className="signInLink" style={{color:'white'}}>Sign-in</Link>
                </NavItem>
                <NavItem>
                  <Link to="/signup" className="signuUpLink" style={{color:'white'}}>Sign-up</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      }
      {this.state.showDescription ?
            <Description
              closePopup={this.toggleDescription.bind(this)}
            />
            : null
          }
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
