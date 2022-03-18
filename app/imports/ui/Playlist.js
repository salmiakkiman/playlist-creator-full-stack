import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
//import components
import TracksTab from './components/common/TracksTab'
import RequestTab from './components/common/RequestTab'
import TopBar from './components/common/TopBar'
import SendRequestTab from './components/common/SendRequestTab'
// import RequestDialog from './components/common/RequestDialog'
import Footer from './components/common/Footer'
import styled from 'styled-components'
// import controllers
import PlaylistController from '../controller/Playlist'
import RequestController from '../controller/Request'
import UserController from '../controller/User'
import Token from '../controller/Token'

// import react95
import { 
  Cutout, 
  Window, 
  WindowHeader, 
  WindowContent, 
  Tabs, 
  Tab, 
  TabBody,
  Button
 } from 'react95';

const Content = styled.div`
`
const PlaylistWindow = styled(Window)`
  margin-left: 3px;
  margin-top: 70px;
  width: 100%;
`
const PlaylistWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PlaylistWindowContent = styled(WindowContent)`
  padding: 0;
  margin-right: 0px;
`

const playlistController = new PlaylistController
const userController = new UserController
const requestController = new RequestController
const token = new Token
class Playlist extends Component {
  state = {
    playlist: {
      id: null,
      name: null,
      owner: { id: null },
      error: null,
      tracks: { total: 0, items: [] }
    },
    requeslist: [{
      id: null,
      name: null
    }],
    trackList: [],
    activeTab: 0,
    owner : false,
    // requestCount: 0,
  }
  init = () => {
    this.intializePlaylist()
    this.initializeRequestlist()
  }
  intializePlaylist = () => {
    this.props.playlist.then(playlist => {
      this.isUserOWner(playlist)
      this.setState({
        playlist: playlist
      })
    }
    )
  }
  initializeRequestlist = () => {
    this.props.requeslist.then(
      requestlist => this.setState({
        requestlist: requestlist
      })
    )
  }

  isUserOWner = playlist => { 
    const owner = playlist.owner.id === userController.getUserId() ? true : false    
    owner ? this.setState({owner: true}) : null
  }
  componentDidMount = () => this.init()
  componentWillMount = () => {
    const id = this.props.match.params.id
    playlistController.setPlaylistId(id)
  }
  
  openTab =(tab)=> this.setState({ activeTab: tab })
   
  update = (updateRequestlist=false) => {
    this.updatePlaylist()
    updateRequestlist ? this.updateRequestlist() : null
  }
  updatePlaylist = () => {
    setTimeout(() => {
      const id = this.state.playlist.id
      const playlist = playlistController.fetchPlaylistDetails(id)
      playlist.then(playlist => {
        this.setState({
          playlist: playlist
        })
      }, 1500);
    })
  } 
  refreshToken = () => {
    const url = token.refreshTokenUrl()
    const options = token.refreshTokenOptions()
    fetch(url, options)
    .then((response) => response.json())
    .then(response => {
        token.setAccessToken(response.access_token)
        this.loadPlaylistSet()
    })
  }
  updateRequestlist = () => {
    
    const id = this.state.playlist.id
    const requestlist = requestController.loadRequest(id)
    requestlist.then(requestlist => {
      this.setState({
        requestlist: requestlist
      })
    })

  }
  // renderPlaylistDescription = (description) => (
  //   description ? <p>{description}</p> : <p>No description for the playlist :/</p>
  // )
  renderPlaylistName = (name) => <span>Playlist.exe - {name}</span>
  countPlaylistDuration = () => {
    const { playlist } = this.state
    let totalDuration = 0
    playlist.tracks.items.map(item => {
      totalDuration = totalDuration+item.track.duration_ms 
      
    })
    return totalDuration
  }
  msToHMS = (ms) => {
    let seconds = ms / 1000
    let hours = parseInt( seconds / 3600 )
    seconds = seconds % 3600
    let minutes = parseInt( seconds / 60)
    seconds = seconds & 60
    return hours+":"+minutes+":"+seconds
  }
  render = () => {
    const { playlist, activeTab, owner, requestlist } = this.state
    const playlistName = this.renderPlaylistName(playlist.name)
    // const playlistDescription = this.renderPlaylistDescription(playlist.description)
    const requestCount = requestlist ? requestlist.length : 0
    const playlistDuration = this.countPlaylistDuration()
    const hms = this.msToHMS(playlistDuration)
    return (
      <Content>
        <TopBar 
          path={this.props.location.pathname}
          playlistName={playlist.name} 
          />

        <PlaylistWindow>
          <PlaylistWindowHeader>
            {playlistName}
            {/* {closeBtn} */}
          </PlaylistWindowHeader>
          <PlaylistWindowContent>

            <Cutout>
            Duration of this playlist is: {hms}
            </Cutout>
            <Button onClick={this.update} variant="flat">Update lists</Button>
            <Tabs value={activeTab} onChange={this.openTab}>
              <Tab value={0}>Tracks ({playlist.tracks.total})</Tab>
              <Tab value={1}>Requests ({requestCount})</Tab>
              <Tab value={2}>Send a request</Tab>
              
            </Tabs>
            <div>
              {activeTab === 0 && (
              <TabBody>
                <TracksTab 
                  trackList={playlist.tracks.items}  // playlist.tracks.items
                  openDetailsPopUp={this.openDetailsPopUp} 
                /> 
              </TabBody>
              )}
              {activeTab === 1 && (
                <TabBody> 
                <RequestTab 
                  playlist={playlist.id}
                  trackList={requestlist}
                  update = {this.update}
                  owner={owner}
                />
                </TabBody>
              )}
              {activeTab === 2 && (
                <TabBody> 
                  <SendRequestTab
                    playlistId = {playlist.id}
                    update = {this.update}
                  />
                </TabBody>
              )}
            </div>
          </PlaylistWindowContent>
        </PlaylistWindow>
        <Footer />
      </Content>
    )
  }
}


export default withTracker(() => {
  const url = window.location.href
  const splitted = url.split('playlist/')
  const id = splitted[1]

  async function fetchPlaylistDetails () {    
    const playlist = await playlistController.fetchPlaylistDetails(id)
    return playlist
  
  }
  async function fetchRequested () {
    const requeslist = await requestController.loadRequest(id)
    return requeslist  
  }
  const playlist = fetchPlaylistDetails(id)
  const requeslist = fetchRequested(id)
  return { playlist: playlist, requeslist: requeslist }
})(Playlist);
