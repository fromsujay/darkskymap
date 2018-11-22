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
  import '../stylesheet/landingPage.css';


class NavigationBarDisplay extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.displayFavorite = this.displayFavorite.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

   displayFavorite() {
      this.props.displayFavoriteParent();
    }

  handleChange(event) {
    console.log('ON SWITCH');
    this.props.switchOverlay(event)
  }


  render() {
    console.log('Favoris -------',this.props.logged);
    return (

    <div>
    {  this.props.logged ?
      <div>
        <Navbar style={{opacity:0.8, backgroundColor: "#028090"}} light expand="md">
          <Link to="/"><NavbarBrand style={{color:'white', fontFamily: 'Actor', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img className="logoNavBar" src={require('../images/logo.svg')}  />Dark Sky Map</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
<<<<<<< HEAD
                <Switch style={{marginRight:10}} checkedChildren="Day" unCheckedChildren="Night" onChange={(event)=>this.handleChange(event)} defaultChecked />
=======
                <Switch style={{marginRight:10, fontFamily: 'Actor'}} checkedChildren="Day" unCheckedChildren="Night" defaultChecked />
>>>>>>> 07a0b1bacd026e39dc55b363d9961adbee7a8431
              </NavItem>
              <NavItem>
                <Link to="/" style={{color:'white', fontFamily: 'Actor'}}>Home</Link>
              </NavItem>
              <NavItem>
                <AddLocation/>
              </NavItem>
              <NavItem>
                <Link to="/map" className="favorisLink" style={{color:'white', marginRight:"10px", fontFamily: 'Actor'}} onClick={()=>this.displayFavorite()}>Favoris</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      :
      <div>
        <Navbar style={{opacity:0.8, backgroundColor: "#028090"}} light expand="md">
          <Link to="/"><NavbarBrand style={{color:'white', fontFamily: 'Actor', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img className="logoNavBar" src={require('../images/logo.svg')}  />Dark Sky Map</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Switch style={{marginRight:10}} checkedChildren="Day" unCheckedChildren="Night" onChange={(event)=>this.handleChange(event)} defaultChecked />
              </NavItem>
              <NavItem>
                <Link to="/" className="homeLink" style={{color:'white', fontFamily: 'Actor'}}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/signin" className="signInLink" style={{color:'white', fontFamily: 'Actor'}}>Sign-in</Link>
              </NavItem>
              <NavItem>
                <Link to="/signup" className="signuUpLink" style={{color:'white', fontFamily: 'Actor', marginRight: 15}}>Sign-up</Link>
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

function mapDispatchToProps(dispatch) {
  return {
    switchOverlay: function(event) {
        dispatch( {type: 'swap', switchStatus: event} )
    }

  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarDisplay);
