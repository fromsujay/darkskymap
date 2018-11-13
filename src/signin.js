import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signin.css";


export default class Signin extends React.Component {
  render() {

    return (
<div className="background">

      <Form inline className="form">

              <h2>Identifiez-vous : </h2>

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
          <Button className="submit" color="secondary" onClick={()=>{ alert('Votre adresse e-mail ou mot de passe est incorrect. Veuillez réessayer.'); }}>Sign in</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}
