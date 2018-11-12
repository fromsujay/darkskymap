import React, { Component } from 'react';
import { Button } from 'reactstrap';
import LandingPage from './landingPage.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <LandingPage/>
        </header>
      </div>
    );
  }
}

export default App;
