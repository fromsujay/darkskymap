import React, { Component } from 'react';
import { Switch, Icon } from 'antd';
import 'antd/dist/antd.css';
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
    console.log('Favoris -------',this.props.logged);
    return (

    <div>
    {  this.props.logged ?
      <div>
        <Navbar style={{opacity:0.8}} color="dark" light expand="md">
          <Link to="/"><NavbarBrand style={{color:'white'}}>Dark Sky Map</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Switch style={{marginRight:10}} checkedChildren="Day" unCheckedChildren="Night" defaultChecked />
              </NavItem>
              <NavItem>
                <Link to="/" style={{color:'white'}}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/addlocation" className="addlocation" style={{color:'white'}}>Ajouter un lieu</Link>
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
        <Navbar style={{opacity:0.8}} color="dark" light expand="md">
          <Link to="/"><NavbarBrand style={{color:'white'}}>Dark Sky Map</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Switch style={{marginRight:10}} checkedChildren="Day" unCheckedChildren="Night" defaultChecked />
              </NavItem>
              <NavItem>
                <Link to="/" className="homeLink" style={{color:'white'}}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/signin" className="signInLink" style={{color:'white'}}>Sign-in</Link>
              </NavItem>
              <NavItem>
                <Link to="/signup" className="signuUpLink" style={{color:'white'}}>Sign-up</Link>
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
  return { logged: state.logged }
}

export default connect(
    mapStateToProps,
    null
)(NavigationBarDisplay);
