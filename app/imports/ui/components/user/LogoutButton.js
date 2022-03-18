import React, { Component } from 'react';


import User from '../../../controller/User'

const user = new User

class LogoutButton extends Component {
  logOut = () => {
    console.log('login out')
    user.clearAll()
    window.location = `/logout`;
  };
  render() {
    return (
      <button onClick={this.logOut}>
        🔙  Logout
      </button>
    );
  }
}

export default LogoutButton;
