import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../stylesheet/signin.css";
import { Redirect } from "react-router-dom"

/* captureEmailData captures data entered in email field */
/* capturePasswordData captures data entered in password field */
/* handleClickSignIn sends data to backend with fetch function and verifies if user exists in database and if yes program directs user to map */


export default class Signin extends React.Component {

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

    fetch('https://whispering-crag-36699.herokuapp.com/signin', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'email='+this.state.email+'&password='+this.state.password
  })
      .then(function(response) {
        return response.json();
        console.log('coucou');
    })
    .then(function(data) {
        this.setState({redirectMap: true});
        console.log('hello');
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
          <Button className="cancelButton1">Annuler</Button>
          <Button type="submit" onClick={this.handleClickSignIn} className="submit1" color="secondary">Sign in</Button>
        </FormGroup>
      </Form>
    </div>
    );
  }
};
