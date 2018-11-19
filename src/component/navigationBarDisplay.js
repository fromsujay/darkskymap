import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Link } from "react-router-dom";
  import {connect} from 'react-redux';


class NavigationBarDisplay extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

  render() {
    console.log('Favoris -------',this.props.favoris);
    return (

    <div>
    {  this.props.favoris ?
      <div>
        <Navbar style={{opacity:0.8, backgroundColor: "#028090"}} light expand="md">
          <Link to="/"><NavbarBrand style={{color:'white'}}>Dark Sky Map</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" style={{color:'white'}}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/favoris" className="favorisLink" style={{color:'white'}}>Favoris</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      :
      <div>
        <Navbar style={{opacity:0.8, backgroundColor: "#028090"}} light expand="md">
          <Link to="/"><NavbarBrand style={{color:'white', fontFamily: 'Actor'}}>Dark Sky Map</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="homeLink" style={{color:'white', fontFamily: 'Actor'}}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/signin" className="signInLink" style={{color:'white', fontFamily: 'Actor'}}>Sign-in</Link>
              </NavItem>
              <NavItem>
                <Link to="/signup" className="signuUpLink" style={{color:'white', fontFamily: 'Actor'}}>Sign-up</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      }
    </div>

    )
  }
}

function mapStateToProps(state) {
  return { favoris: state.favoris }
}

export default connect(
    mapStateToProps,
    null
)(NavigationBarDisplay);
