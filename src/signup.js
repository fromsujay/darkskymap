import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Background from './starry-night.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signup.css";


export default class Signup extends React.Component {
  render() {

    return (
<div className="background">

      <Form inline className="form">

        <h2>Veuillez remplir les champs ci-dessous : </h2>

        <FormGroup>
        <Input type="text" name="username" id="exampleUsername" placeholder="Nom d'utilisateur" />
        </FormGroup>


        <FormGroup>
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        {' '}


        <FormGroup>
          <Input type="password" name="password" id="examplePassword" placeholder="Mot de passe" />
        </FormGroup>
        {' '}


        <FormGroup>
            <Button className="cancelbutton">Annuler</Button>
            <Button className="submit">S'inscrire</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}
