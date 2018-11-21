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
  import AddLocation from './addLocation.js'
  import {connect} from 'react-redux';


class NavigationBarDisplay extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.displayFavorite = this.displayFavorite.bind(this);
  }

  toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

   displayFavorite() {
      this.props.displayFavoriteParent();
    }


  render() {
    console.log('Favoris -------',this.props.logged);
    return (

    <div>
    {  this.props.logged ?
      <div>
        <Navbar style={{opacity:0.8, backgroundColor: "#028090"}} light expand="md">
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
                <AddLocation/>
              </NavItem>
              <NavItem>
                <Link to="/map" className="favorisLink" style={{color:'white'}} onClick={()=>this.displayFavorite()}>Favoris</Link>
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
                <Switch style={{marginRight:10}} checkedChildren="Day" unCheckedChildren="Night" defaultChecked />
              </NavItem>
              <NavItem>
                <Link to="/" className="homeLink" style={{color:'white'}}>Home</Link>
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
  return { logged: state.logged }
}

export default connect(
    mapStateToProps,
    null
)(NavigationBarDisplay);
