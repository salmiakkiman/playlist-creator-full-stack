import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import User from '../../../controller/User'

const userController = new User
// import components
import LoginButton from '../guest/LoginButton'
import LogoutButton from '../user/LogoutButton'

// win95 components
import { AppBar, Toolbar, Button , List, ListItem, Divider,} from 'react95';

const TopAppBar = styled(AppBar)`
  z-index:10;
`

const Menu = () => {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }
  renderButton = () => {
    return userController.getUserId() ? <LogoutButton /> : <LoginButton />
    
  }
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {open && (
        <List horizontalAlign="left" verticalAlign="bottom" open={open} onClick={handleClose}>
          <Link to='/'>
            <ListItem>{userController.getUserId() ? "My Playlists" : "About "}</ListItem>
          </Link>
          {/* <ListItem>About</ListItem> */}
          <Divider />
          <ListItem>{this.renderButton()}</ListItem>
        </List>
      )}
      <Button onClick={handleClick} active={open} style={{ fontWeight: 'bold' }}>
        Start
      </Button>
    </div>
  );
}


class TopBar extends Component {
  state = {
    firstWindow: <Button active={true}>About.exe</Button>
  }
  renderWindowButton = (activeWindow, label, link) => {
    return (
      <Link to={link}>
        <Button active={activeWindow} >
          {label}
        </Button> 
      </Link>
      )
  }
  componentDidMount = () => {
    // // check if user is logged in
    // // then if not render first windowt to setAboutWindowbutton
    // // if is then render first window and check if the path includes anything else

    const isLoggedIn = this.checkIfUserIsLogged()
    return isLoggedIn ? this.renderUserFirstWindow() : this.setAboutWindownButton()

    // const { path } = this.props
    // const isOnMyPlaylist = path === '/' || path === ''|| path === '/logout' ? true : false
    // const windowLabel = this.checkIfUserIsLogged() ? "MyPlaylists.exe" : "About.exe"
    // const navButton = this.renderWindowButton(isOnMyPlaylist, windowLabel, '/')
    // this.setState({
    //   firstWindow: navButton
    // })
  }
  renderUserFirstWindow = () => {
    // console.log('rendering all the nessary shist')
    const { path } = this.props
    const onFirstPage = path.includes('playlist') ? false : true
    const windowLabel = "MyPlaylists.exe"
    const navButton = this.renderWindowButton(onFirstPage, windowLabel, '/')
    this.setState({
      firstWindow: navButton
    })
  }
  setAboutWindownButton = () => {
    const { path } = this.props
    const label = "About.exe"
    const isActive = path === '/' || path === ''|| path === '/logout' ? true : false
    const windowButton = this.renderWindowButton(isActive, label, '/')
    this.setState({
      firstWindow: windowButton
    })
  }
  checkIfUserIsLogged = () => userController.getUserId() ? true : false
  setPlaylistWindowButton = (playlistName) => {
    const label = <span>Playlist.exe - {playlistName}</span>
    const link = this.props.path
    const button = this.renderWindowButton(true, label, link)
    return button
  }
    
  render = () => {
    const { firstWindow } = this.state
    const { playlistName } = this.props
    const playlistButton = playlistName ? this.setPlaylistWindowButton( playlistName) : null
    return( 
      <TopAppBar>
        <Toolbar>
          <Menu />
          {firstWindow}
          {playlistButton}
       
        </Toolbar>
      </TopAppBar>
    )    
  }
}

export default TopBar
