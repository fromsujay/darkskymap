import React from 'react';
import { Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../stylesheet/signin.css";
import { Redirect, Link } from "react-router-dom";
import {connect} from 'react-redux';

/* captureEmailData captures data entered in email field */
/* capturePasswordData captures data entered in password field */
/* handleClickSignIn sends data to backend with fetch function and verifies if user exists in database and if yes program directs user to map */


class Signin extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    redirectMap: false,
    email: '',
    password: '',
  }
  this.captureEmailData = this.captureEmailData.bind(this);
  this.capturePasswordData = this.capturePasswordData.bind(this);
  this.handleClickSignIn = this.handleClickSignIn.bind(this);
}

captureEmailData(event){
  event.preventDefault();
  this.setState({
    email: event.target.value,
  });

}

capturePasswordData(event){
  event.preventDefault();
  this.setState({
    password: event.target.value,
  });

}


handleClickSignIn(event) {
  event.preventDefault();
    var ctx = this;

    fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'email='+ctx.state.email+'&password='+ctx.state.password
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(user) {
      console.log(user)
      if(user.email === ctx.state.email && user.password === ctx.state.password){
        ctx.props.onLoginClick(user._id);
        ctx.setState({
          redirectMap: true
        })
      }
    })
    .catch(function(error) {
        console.log('Request failed', error)
    });
  }


  render() {
    console.log('props userId: ', this.props.userId);
    var userId = this.state.userId;
    return (

<div >
  {
    this.state.redirectMap
    ?<Redirect to="/map"/>
    :null
  }

  <div className="background">

    <div className="signUpToogle">
      <h6 className= "signInText">Vous ne disposez pas de compte ? <Link to="/signup"><Badge className="badgeLook" color="light">Inscrivez-vous</Badge></Link></h6>
    </div>

    <div className="allContent">

      <Form inline className="form">

              <h2>Identifiez-vous : </h2>

        <FormGroup>
          <Input type="email" name="email" onChange={this.captureEmailData} id="email" placeholder="Email" />
        </FormGroup>
        {' '}


        <FormGroup>
          <Input type="password" name="password" onChange={this.capturePasswordData} id="password" placeholder="Mot de passe" />
        </FormGroup>
        {' '}


        <FormGroup>
          <Link to="/map"><Button className="cancelButton1">Aller à la carte</Button></Link>
          <Button type="submit" onClick={this.handleClickSignIn} className="submit1" color="secondary">Sign in</Button>
        </FormGroup>

        </Form>
      </div>
    </div>
  </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onLoginClick: function(userId) {
        dispatch( {type: 'display', userId:userId} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Signin);
