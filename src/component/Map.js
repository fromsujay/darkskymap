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
import '../stylesheet/favoris.css';
import { Redirect, Link } from "react-router-dom";
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faHeart, faCity, faFrown, faSmile, faBan, faCheck, faExclamationTriangle, faLowVision, faSmog, faMoon, faGlobeAsia, faSun, faCloudSun, faCloudShowersHeavy, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/description.css';
import '../stylesheet/details.css';
import { FaRegCalendarAlt, FaWind, FaRegFrown, FaRegMeh, FaRegSmile } from "react-icons/fa";
import { IoIosCalendar, IoMdPlanet } from "react-icons/io";
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
      weatherDatas: {}
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
     console.log('data @@@@@@@@@@', data);

     var ctx = this;
     fetch('http://localhost:3000/getLocationWeatherInfos', {
     method: 'POST',
     headers: {'Content-Type':'application/x-www-form-urlencoded'},
     body: 'latitude='+data.latitude+'&longitude='+data.longitude
     })
 .then(function(response) {
     return response.json();
 })
 .then(function(weatherData) {
     console.log('weather data: ', weatherData);
     var weatherDataCopy = {...weatherData}
     ctx.setState({
       weatherDatas: weatherDataCopy
     })
 });

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
      console.log(response);
    return response.json();
    }).then(function(data) {
      console.log('data',data);
    ctx.setState({
      locations:data.locations
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
console.log('this state weatherDatas', this.state.weatherDatas);

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
        <Marker
        title={'You are here'}
        icon={circle}
        position={{lat: this.state.lat, lng: this.state.lng}}
        />
      </Map>

      <NavigationBarDisplay displayFavoriteParent={this.displayFavorite} />

      }
      {this.state.showDescription ?
            <Description weatherDatas={this.state.weatherDatas} userId={this.props.userId} addFavoriteParent={this.addFavorite} data={this.state.data} toggleDetails={this.toggleDetails} closeFunction={this.closeWindow} />
            : null
      }
      {this.state.showDetails?
            <Details addFavoriteParent={this.addFavorite} data={this.state.data} dataObject={this.state.dataObject} returnToDescription={this.returnToDescription} closeFunction={this.closeWindow} />
            : null
      }
      {this.state.showFavorite?
            <Favoris weatherDatas={this.state.weatherDatas} userId={this.props.userId} closeFunction={this.closeWindow} />
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
       date: date,
       weatherDatas: null,
       userId: null,
       favorites: null
    }

  }

  componentWillMount() {

    const ctx= this;
    if (ctx.props.userId) {
    fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'userId='+ctx.props.userId
    })

    .then(function(response) {
    return response.json();
    })

    .then(function(data) {

      var userFavorites = data.favorites
      console.log("userFavorites", userFavorites);
    ctx.setState({
      favorites:userFavorites
     })
    })}

    }

  componentDidUpdate(prevProps) {
    var ctx = this;
    var userIdCopy = {...ctx.props.userId}
    var weatherDatasCopy = {...ctx.props.weatherDatas}
    if (this.props.weatherDatas !== prevProps.weatherDatas) {
      ctx.setState({
        weatherDatas: weatherDatasCopy
      })
      if (this.props.userId !== prevProps.userId) {
        ctx.setState({
          userId: userIdCopy
        })
    }
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
    // var weatherDescription = this.state.weatherDatas;
    if(this.props.data.bortleScale == 'C1 (Ciel excellent)'){
      this.props.data.explanationOfBortleScale = "La lumière zodiacale, le gegenschein, et la bande zodiacale sont tous visibles, la lumière zodiacale est impressionnante, et la bande zodiacale traverse tout le ciel. Même en vision directe, la galaxie M33 est un objet évident à l'œil nu. La Voie Lactée dans la région du Scorpion et du Sagittaire projette au sol une ombre diffuse évidente. A l'œil nu, la magnitude limite se situe entre 7,6 et 8,0 (avec effort). La présence de Jupiter ou de Vénus dans le ciel semble dégrader la vision nocturne. Une lueur diffuse dans l'atmosphère est perceptible (un très faible halo naturel, plus particulièrement notable jusqu'à 15' au-dessus de l'horizon). Avec un instrument de 32 cm d'ouverture, les étoiles de magnitude 17,5 peuvent être détectées avec effort, tandis qu'un instrument de 50 cm avec un grossissement modéré atteindra la 19ème magnitude. En observant depuis une étendue bordée d'arbres, le télescope, vos compagnons, votre voiture, sont pratiquement totalement invisibles. C'est le paradis de l'observateur."

  } else if (this.props.data.bortleScale == 'C2 (Ciel vraiment noir)'){
    this.props.data.explanationOfBortleScale = "Une lueur peut être faiblement visible le long de l'horizon. M33 est plutôt facile à voir en vision directe. La Voie Lactée de l'été est fortement structurée à l'œil nu, et ses parties les plus brillantes apparaissent comme marbrées avec des jumelles ordinaires. La lumière zodiacale est encore assez brillante pour projeter de faibles ombres juste avant l'aurore et après le crépuscule, et sa couleur est distinctement jaunâtre comparée à la teinte blanc-bleutée de la Voie Lactée. Les nuages dans le ciel se manifestent comme des trouées noires ou des vides sur le fond étoilé. Le télescope et le paysage ne sont vus que vaguement, si ce n'est découpés contre le ciel. La plupart des amas globulaires du catalogue de Messier sont des objets distincts à l'œil nu. La magnitude limite à l'œil nu est de 7,1 à 7,5, quand un télescope de 32 cm atteint 16 ou 17."

  } else if (this.props.data.bortleScale == 'C3 (Ciel rural)'){
    this.props.data.explanationOfBortleScale = "Quelques signes de pollution lumineuse sont évidents dans certaines directions de l'horizon. Les nuages y apparaissent faiblement éclairés mais restent noirs en quittant l'horizon. La Voie Lactée apparaît toujours complexe, et l'on distingue à l'œil nu les amas globulaires comme M4, M5, M15 ou, M22. M33 est facile à détecter en vision décalée. La lumière zodiacale est impressionnante au Printemps et à l'Automne (elle s'étend alors à 60' au dessus de l'horizon après le crépuscule et avant l'aurore), et sa couleur est au moins faiblement reconnaissable. Le télescope est vaguement visible à 7-10 mètres. La magnitude limite à l'oeil nu est de 6,6 à 7,0, et un réflecteur de 32 cm atteint la 16ème magnitude."

  } else if (this.props.data.bortleScale == 'C3 (Ciel rural)'){
    this.props.data.explanationOfBortleScale = "Dans plusieurs directions, des dômes de pollution lumineuse apparaissent clairement au-dessus des agglomérations. La lumière zodiacale reste évidente mais ne dépasse même plus 45° au-des sus de l'horizon en début et fin de nuit. La Voie Lactée reste impressionnante à distance raisonnable de l'horizon mais ne conserve que ses principales structures. M33 est un objet difficile en vision décalée et n'est délectable qu'à une hauteur de 50° au-dessus de l'horizon. Les nuag es en direction des sources de pollution lumineuse sont éclairés, bien que faiblement, et restent noirs au zénith. Le télescope est vu de loin assez distinctement. La magnitude limite à l'œil nu est située entre 6,1 et 6,5, et un réflecteur de 32 cm avec un grossissement modéré révèlera des étoiles de magnitude 15,5."

  } else if (this.props.data.bortleScale == 'C4 (Transition rural-urbain)'){
    this.props.data.explanationOfBortleScale = "Dans plusieurs directions, des dômes de pollution lumineuse apparaissent clairement au-dessus des agglomérations. La lumière zodiacale reste évidente mais ne dépasse même plus 45° au-des sus de l'horizon en début et fin de nuit. La Voie Lactée reste impressionnante à distance raisonnable de l'horizon mais ne conserve que ses principales structures. M33 est un objet difficile en vision décalée et n'est délectable qu'à une hauteur de 50° au-dessus de l'horizon. Les nuag es en direction des sources de pollution lumineuse sont éclairés, bien que faiblement, et restent noirs au zénith. Le télescope est vu de loin assez distinctement. La magnitude limite à l'œil nu est située entre 6,1 et 6,5, et un réflecteur de 32 cm avec un grossissement modéré révèlera des étoiles de magnitude 15,5."

  } else if (this.props.data.bortleScale == 'C5 (Ciel péri-urbain)'){
    this.props.data.explanationOfBortleScale = "Seulement quelques indices de lumière zodiacale sont vus aux meilleures nuits du Printemps et de l'Automne. La Voie Lactée est très faible ou invisible à l'approche de l'horizon, et apparaît délavée au-delà. Les sources de lumières sont évidentes dans presque sinon toutes les directions. Pratiquement dans tout le ciel, les nuages sont notablement plus clairs que le ciel lui-même. La magnitude limite à l'œil nu est comprise entre 5,6 et 6,0 et un réflecteur de 32 cm atteindra environ les magnitudes 14,5 à 15."

  } else if (this.props.data.bortleScale == 'C6 (Ciel de banlieue)'){
    this.props.data.explanationOfBortleScale = "Aucune trace de la lumière zodiacale ne peut être vue, même aux meilleures nuits. La présence de la Voie Lactée n'est apparente que vers le zénith. Le ciel jusqu'à 35° au-dessus de l'horizon on émet une lumière grise orangée. Les nuages partout dans le ciel sont lumineux. Il n'y a pas de difficulté à voir les oculaires et les accessoires du télescope sur une table d'observation. M33 n'est pas détectée sans une paire de jumelles, et M31 n'est que modestement visible à l'œil nu. La magnitude limite est de l'ordre de 5,5, et un télescope de 32 cm utilisé avec un grossissement modéré montrera des étoiles de magnitudes 14,0 à 14,5."

  } else if (this.props.data.bortleScale == 'C7 (Transition banlieue-ville)'){
    this.props.data.explanationOfBortleScale = "Le fond de l'ensemble du ciel présente une vague teinte grise orangée. Des sources puissantes de lumière sont évidentes dans toutes les directions. La Voie Lactée est totalement invisible ou presque. M44 ou M31 peuvent être aperçus à l'œil nu mais très indistinctement. Les nuages sont fortement éclairés. Même dans un télescope d'ouverture moyenne, les objets les plus brillants du catalogue de Messier ne sont que de pâles fantômes d'eux-mêmes. La magnitude limite à l'œil nu est de 5,0 en forçant, et un réflecteur de 32 cm atteindra à peine la 14ème magnitude."

  } else if (this.props.data.bortleScale == 'C8 (Ciel de ville)'){
    this.props.data.explanationOfBortleScale = "Le ciel est orangé, et on peut lire les titres des journaux sans difficulté. M31 et M44 sont tout juste décelés par un observateur expérimenté les nuits claires, et seuls les objets Messier les plus brillants peuvent être détectés avec un petit télescope. Certaines des étoiles qui participent au dessin classique des constellations sont difficiles à voir, ou ont totalement disparu. L'œil nu peut détecter des étoiles jusqu'à la magnitude 4,5 au mieux, si l'on sait exactement où regarder, et la limite stellaire d'un réflecteur de 32 cm ne va guère au-delà de la magnitude 13."

  } else if (this.props.data.bortleScale == 'C9 (Ciel de centre-ville)'){
    this.props.data.explanationOfBortleScale = "Tout le ciel est éclairé, même au zénith. De nombreuses étoiles qui forment le dessin des constellations sont invisibles, et les faibles constellations comme le Cancer ou les Poissons ne peuvent être vues. Si ce n'est peut-être les Pléiades, aucun objet Messier n'est visible à l'œil nu. Les seuls objets célestes qui offrent de belles images au télescope sont la Lune, les planètes, et certains des amas d'étoiles les plus brillants (si tant est qu'on puisse les localiser). La magnitude limite à l'œil nu est 4,0 ou moins."}

console.log('this props weatherDatas', this.props.weatherDatas.weather );
// console.log('description state weatherDatas', this.state.weatherDatas );


    return (
    <div className="rootStyle">
     <Col xs="11" md="6">
      <Card className="cardStyle">
        <CardHeader className="heading">
          <FontAwesomeIcon icon={faCity} className="descriptionIconStyle"/>
          <h4 className="location-name">{this.props.data.locationName}</h4>
          <FontAwesomeIcon icon={faTimesCircle} onClick={()=>this.closeComponent()} className="descriptionIconStyle"/>
        </CardHeader>
        <CardBody className="descriptionCard">
          <CardText className="textdesc"><FaRegCalendarAlt className="calendarIcon"/>{this.state.date}</CardText>
          <CardText className="textdesc">Latitude: {this.props.data.latitude}</CardText>
          <CardText className="textdesc">Longitude: {this.props.data.longitude}</CardText>
          <CardText className="textdesc">Horizon sud dégagé: {this.props.data.isSouthernHorizonClear}</CardText>
          <div className="bortleStyle">
            <CardText className="paraStyle">{this.props.data.explanationOfBortleScale}</CardText>
          </div>
          <div className="weatherInfo">
            <img style={{height: 100, }} src={this.state.weatherDatas ?"http://openweathermap.org/img/w/" + this.state.weatherDatas.weather[0].icon + ".png" :null} className="weatherIconStyle"/>
            <div className="weatherTextStyle">
             <p className="weatherdesc">Météo actuelle</p>
             <p className="weatherdesc">{this.state.weatherDatas ?this.state.weatherDatas.weather[0].description :null}</p>
             <p className="weatherdesc">{this.state.weatherDatas ?this.state.weatherDatas.main.temp :null} C</p>
             </div>
          </div>
          <CardText className="textdesc">{this.props.data.observationCategory}<IoMdPlanet className="planetIcon"/><FontAwesomeIcon icon={faMoon} className="moonIcon"/></CardText>
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

    if (this.props.dataObject.bortleScale === 'C1 (Ciel excellent)' || this.props.dataObject.bortleScale === 'C2 (Ciel vraiment noir)' || this.props.dataObject.bortleScale === 'C3 (Ciel rural)') {
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
          <CardText className="textDetails">Date d'Observation</CardText>
          <CardText className="textDetails">Echelle de Bortle </CardText>
          <CardText className="smileyIcon">{bortleScale}</CardText>
          <CardText className="textDetails">Transparence </CardText>
          <CardText className="smileyIcon">{transparency}</CardText>
          <CardText className="textDetails">Pollution Lumineuse </CardText>
          <CardText className="smileyIcon">{lightPollution}</CardText>
          <CardText className="textDetails">Seeing(Turbulence) </CardText>
          <CardText className="smileyIcon">{seeing}</CardText>
          <CardText className="textDetails">Sky Quality Meter </CardText>
          <CardText className="smileyIcon">{skyQualityMeter}</CardText>
          <CardText className="textDetails">Facilité d'accès en voiture : {this.props.dataObject.easeOfAccessibilityByCar ? 'oui' : 'non'} </CardText>
          <CardText className="textDetails">Possibilité de stationnement : {this.props.dataObject.parkingAvailability ? 'oui' : 'non'}</CardText>
          <CardText className="textDetails">Disponibilité de courant : {this.props.dataObject.powerSupplyAvailability ? 'oui' : 'non'}</CardText>
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
      console.log('data favorites', data.favorites);
      ctx.setState({
        favorites:userFavorites
      })
      for (var i = 0; i < data.favorites.length; i++) {
        console.log(data.favorites[i]);


    //     fetch('http://localhost:3000/getLocationWeatherInfos', {
    //     method: 'POST',
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //     body: 'latitude='+data[i].latitude+'&longitude='+data[i].longitude
    //     })
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(weatherData) {
    //     console.log('weather data favorite: ', weatherData);
    //     var weatherDataCopy = {...weatherData}
    // });

      }

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
  return { logged: state.logged, userId: state.userId }
}

var Wrapper =  GoogleApiWrapper({
  apiKey: api
})(MapContainer)

export default connect(
    mapStateToProps,
    null
)(Wrapper);
