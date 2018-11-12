import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Background from './starry-night.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signin.css";


export default class Signin extends React.Component {
  render() {

    return (
<div className="background">

      <Form inline className="form">

              <h2>Identifiez-vous : </h2>

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
            <Button className="submit" onClick={()=>{ alert('Votre adresse e-mail ou mot de passe est incorrect. Veuillez réessayer.'); }}>Se connecter</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}
