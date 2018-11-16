import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../stylesheet/signup.css";
import { Redirect, Link } from "react-router-dom";
import {connect} from 'react-redux';
/* captureEmailData captures data entered in email field */
/* capturePasswordData captures data entered in password field */
/* captureUsernameData captures data entered in username field */
/* handleClickSignUp feeds data to backend with fetch function and program redirects user to map */


class Signup extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    redirectMap: false,
    userName: '',
    email: '',
    password: '',
  };
  this.captureUsernameData = this.captureUsernameData.bind(this);
  this.captureEmailData = this.captureEmailData.bind(this);
  this.capturePasswordData = this.capturePasswordData.bind(this);
  this.handleClickSignUp = this.handleClickSignUp.bind(this);
  }


  captureUsernameData(event){
    event.preventDefault();
    this.setState({
      userName: event.target.value
    });

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

  handleClickSignUp(event) {
    event.preventDefault();
    var ctx = this;

    fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'userName='+ctx.state.userName+'&email='+ctx.state.email+'&password='+ctx.state.password
    })
    .then(function(response) {
        return response.json();
        console.log(response.json())
    })
    .then(function(user) {
      console.log(user);
      if(user.email === ctx.state.email && user.password === ctx.state.password){
        ctx.props.onLoginClick();
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


    return (
<div className="background">

  {
    this.state.redirectMap
    ?<Redirect to="/map"/>
    :null
  }
      <Form inline className="form">

        <h2>Veuillez remplir les champs ci-dessous : </h2>

        <FormGroup>
        <Input type="text" name="username" id="username" placeholder="Nom d'utilisateur"
        onChange={this.captureUsernameData}
        />
        </FormGroup>


        <FormGroup>
          <Input type="email" name="email" id="email" placeholder="Email"
          onChange={this.captureEmailData}
          />
        </FormGroup>
        {' '}


        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Mot de passe"
          onChange={this.capturePasswordData}
          />
        </FormGroup>
        {' '}


        <FormGroup>
            <Link to="/map"><Button className="cancelButton">Annuler</Button></Link>
            <Button className="submit" onClick={this.handleClickSignUp}>S'inscrire</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginClick: function() {
        dispatch( {type: 'display'} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Signup);
