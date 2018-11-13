import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signup.css";


export default class Signup extends React.Component {
  render() {

    return (
<div className="background">

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
            <Button className="btn-Home-Sign1">Annuler</Button>
            <Button className="btn-Home-Sign1">S'inscrire</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}
