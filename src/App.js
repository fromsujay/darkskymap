import React, { Component } from 'react';
import {  } from 'reactstrap';
import Signin from './component/signin.js';
import Signup from './component/signup.js';
import Favoris from './component/favoris.js';
import Map from './component/Map.js';
import LandingPage from './component/landingPage.js'
import Description from './component/description.js'
import Details from './component/details.js'
import GoogleApiWrapper from './component/Map.js'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {
  render() {
    return (
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
    );
  }
}



export default App;
