import React, { Component } from 'react';
import {connect} from 'react-redux';

class NavigationBar extends Component {
  render() {
    return (
      <View>
        <Button onClick={ this.props.onLoginClick } title="displayFavoris"></Button>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginClick: function() {
        dispatch( {type: 'display'} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(NavigationBar);
