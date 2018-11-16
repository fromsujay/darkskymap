import React, { Component } from 'react';


class NavigationBarDisplay extends Component {
  render() {
    return (
      <View>
        <Text>Compteur : {        }</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { navbar: state.navbar }
}

export default connect(
    mapStateToProps,
    null
)(NavigationBarDisplay);
