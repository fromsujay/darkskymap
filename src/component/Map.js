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
import '../stylesheet/Map.css'
import { Redirect } from "react-router-dom"

export class MapContainer extends Component {

  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      button: 'none',
      redirectHome: false,
    };

    this.handleClickHome = this.handleClickHome.bind(this);
    this.toggle = this.toggle.bind(this);
       this.state = {
         isOpen: false
       };
  }

  toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

  handleClickHome(){
    this.setState({
      redirectHome: true
    })
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
    this.setState({
      button: 'block'
    });
  }

  render() {

    return (

      <div id="wrapper">
      <Map
        google={this.props.google}
        zoom={12}
        style={style}
        styles={styles}
        disableDefaultUI={true}
        initialCenter={{
          lat: 48.885391,
          lng: 2.2979853
          }}
        center={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
      >
      </Map>


      <div>
        <Navbar style={{opacity:0.8}} color="dark" light expand="md">
          <NavbarBrand style={{color:'white'}} onClick={this.handleClickHome} >Dark Sky Map</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{color:'white'}} onClick={this.handleClickHome} >Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color:'white'}}>Favoris</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      {
        this.state.redirectHome
        ?<Redirect to="/"/>
        :null
      },
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