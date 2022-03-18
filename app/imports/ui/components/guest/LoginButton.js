import React, { Component } from 'react';


class LoginButton extends Component {
  /**
   * fetch function to get access token
   */
  login = () => {
    const url = 'http://localhost:5000/api/user/login'
    const options =  {
      headers: {
        mode: 'no-cors',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    }
    fetch(url, options)
      .then((spotifyLoginUrl) => spotifyLoginUrl.json())
      .then(spotifyLoginUrl => {
        window.location.href = spotifyLoginUrl
      })
  };
  render() {
    return (
      <button onClick={this.login}>
        Login
      </button>
    );
  }
}

export default LoginButton;
