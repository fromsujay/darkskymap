import React, { Component } from 'react';
import {  } from 'reactstrap';
<<<<<<< HEAD
import Signin from './component/signin.js';
import Signup from './component/signup.js';
import Favoris from './component/favoris.js';
import Map from './component/Map.js';
import LandingPage from './component/landingPage.js'
import Description from './component/description.js'
import Details from './component/details.js'
import GoogleApiWrapper from './component/Map.js'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
=======
import Signin from './signin.js';
import Signup from './signup.js';
import Favoris from './favoris.js';
import LandingPage from './landingPage.js'
import Description from './description.js'
import Details from './details.js'
import GoogleApiWrapper from './Map.js'
>>>>>>> 6aaba0009eeeeb1205f7837ecb9eff894fc32dc8
import './App.css';

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/map" component={Map} />
        <Route path="/details" component={Details} />
        <Route path="/description" component={Description} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/favoris" component={Favoris} />
      </Switch>
    </div>
  </Router>
=======

>>>>>>> 6aaba0009eeeeb1205f7837ecb9eff894fc32dc8
    );
  }
}



export default App;
