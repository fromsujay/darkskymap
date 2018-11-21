import React, { Component } from 'react';
import {  } from 'reactstrap';
import Signin from './component/signin.js';
import Signup from './component/signup.js';
import Map from './component/Map.js';
import LandingPage from './component/landingPage.js';
import GoogleApiWrapper from './component/Map.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logged from './reducers/navigationbar.reducer';
import userId from './reducers/userId.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({logged, userId}));


/*react-router-dom implements navigation between different components of webapp*/
/*react-router-dom implements paths to make navigation between components to work*/

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/map" component={Map} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
