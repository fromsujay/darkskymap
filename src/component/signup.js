import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../stylesheet/signup.css";
import { Redirect } from "react-router-dom"


export default class Signup extends React.Component {

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
    .then(function(data) {
      console.log(data);
      if(data[0].email === ctx.state.email && data[0].password === ctx.state.password){
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
            <Button className="cancelButton">Annuler</Button>
            <Button className="submit" onClick={this.handleClickSignUp}>S'inscrire</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}
