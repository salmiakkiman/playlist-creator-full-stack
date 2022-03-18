import React, { Component } from 'react';

// import controller
import User from '../controller/User'
import Token from '../controller/Token'

// import components
import PlaylistSet from './components/user/PlaylistSet'
import About from './components/guest/About'
import Footer from './components/common/Footer'
import TopBar from './components/common/TopBar'

import styled from 'styled-components';

const Content = styled.div`
`


// import react95 compontents

const userController = new User
const tokenController = new Token 



/** 17.4.2020s
 * displays users playlists if logged in
 * otherwise just about page of this website
 * 
 * when site mounts:
 * -start fetching users playlists/tracks and save 'em to the db
 * async load the playlists from the db
 */
class Home extends Component {
  
  UNSAFE_componentWillMount = () => {
    this.parseUrl()
  }
  /**
   * Parse url for access token
   * decodes access & refresh token from the url.
   * sets access token
   */
  parseUrl = () => {
    const url = this.props.location.pathname
    const jwt = this.props.match.params.token  

    // decodes access token from the url
    /**
     * 17.4.2020
     * setting access token to the session storage should be in the other funciton
     * maybe in the other class
     */
    const token = tokenController.decode_JWT_token(jwt)
    token.access_token ? tokenController.setAccessToken(token.access_token) : null
    token.refresh_token ? tokenController.setRefreshToken(token.refresh_token) : null
    token.user ? userController.initializeUser(token.user) : null
  }
  // isLogged = () => {
  //   return userController.getUserId() ? <LogoutButton /> : <LoginButton />
    
  // }
  loadContent = () => {
    // loads playlist set
    // which is the list of the users playlists
    return userController.getUserId() ? <PlaylistSet user={userController}/> : <About />

  }
  render = () => {
    // console.log(this.props.location.pathname)
    return (
    <Content>
      <TopBar 
        path={this.props.location.pathname}
      />
      <div>
      {this.loadContent()}
      </div>
      <Footer />
    </Content>
    )
  }
}

export default Home;
