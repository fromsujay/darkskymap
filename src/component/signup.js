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
  };
}
  handleClickSignUp=()=> {
    this.setState({
      redirectMap: true,
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
        <Input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
        </FormGroup>


        <FormGroup>
          <Input type="email" name="email" id="email" placeholder="Email" />
        </FormGroup>
        {' '}


        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Mot de passe" />
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
