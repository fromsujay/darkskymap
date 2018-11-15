import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../stylesheet/signin.css";
import { Redirect } from "react-router-dom"


export default class Signin extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    redirectMap: false,
    redirectSignIn: false,
    redirectSignUp: false,
  }
}

handleClickSignIn=()=> {
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
          <Button className="cancelButton1">Annuler</Button>
          <Button className="submit1" color="secondary" onClick={this.handleClickSignIn}>Sign in</Button>
        </FormGroup>

      </Form>
      </div>
    );
  }
}
