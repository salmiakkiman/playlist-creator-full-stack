import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

// imoport components 
import CreatePlaylistBtn from './CreatePlaylist'

// import controllers
import Token from '../../../controller/Token'
import RequestController from '../../../controller/Request'
import PlaylistController from '../../../controller/Playlist'
// import react95 components
import {Button, TextField, Table, TableBody, TableRow, TableHead, TableHeadCell, TableDataCell, WindowHeader, Window, WindowContent, Toolbar } from 'react95'

const MyPlaylistExe = styled(Window)`
  width: 100%;
  margin-top: 70px;
`

const PlaylistImage = styled.img`
`
const requestController = new RequestController
const token = new Token
const playlistController = new PlaylistController

/** 17.4.2020
 * this will start the fetching process to load all the users playlists (which are public)
 * also starts background tasks to load tracks, lyrics, and other staff related to tracks
 */
class PlaylistSet extends Component {
  state = {
    playlistSet: [{
      id: null,
      name: null,
      images: [{
        url: null
      }],
      tracks:{
        total: 0
      }
    }],
    requestCount: [],
    create: false,
    newPlaylist: null
  }
  getUrl = () => 'http://localhost:5000/api/get/user/playlist/set'
  getOptions = () => {
    const userId = sessionStorage.getItem("userId")
    const accessToken = token.getAccessToken()
    const refreshToken = token.getRefreshToken()
    const options =  {
      headers: {
        mode: 'no-cors',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ token: accessToken, refresh: refreshToken, id: userId }),
      credentials: 'same-origin',
    }
    return options 
  }
  loadPlaylistSet = () => {
    const url = this.getUrl()
    const options = this.getOptions()
    fetch(url, options)
      .then((response) => response.json())
      .then(response => this.handleResponse(response))
  } 
  handleResponse = (response) => {
    
    response.error 
    ? this.refreshToken()
    : this.setState({
        playlistSet: response
      })
    response.map(playlist => this.loadRequesList(playlist.id))
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
  loadRequesList = (id) => {
    const count = requestController.loadCountOfRequest(id)
    count.then( c=> {
      id ? this.setState({requestCount: this.state.requestCount.concat({playlist:id, requests:c})}) : 0
    } )

  }
  handleImage = images => images[2].url
  /**
   * does not laod user 
   * loads user too late
   * so unable to load playlistset
   */

   /**
    * 17.4.2020
    * note: when component mounts -> start to fetch users playlists -> save it the db
    * -> load how many playlists will load
    * -> then load the playlists names etc from the db
    */
  componentDidMount = () => this.loadPlaylistSet()
  /**
   * calls api backend to login to ...
   * 26.01.2020
   */
  toggleInput = () => this.setState({create: !this.state.create})
  initNewPlaylist = () => {
    this.setState({newPlaylist: null})
    this.toggleInput()
  }
  saveNewPlaylist = (e) => {
    const { newPlaylist } = this.state
    const userId = sessionStorage.getItem("userId")
    const accessToken = token.getAccessToken()
    const response = newPlaylist ? playlistController.createPlaylist(newPlaylist, accessToken, userId) : null
    this.handleResponseNewPlaylist(response)
    this.initNewPlaylist()
    setTimeout(() => {
      this.loadPlaylistSet()
    }, 1000);
  }
  // make anti antipattern response handler when new playlist is created
  // should check if the response is valid (if token was valid)
  // then reload playlistSet so the newest playlist will display on top of the playlists
  handleResponseNewPlaylist = (response) => {
    response.then(msg => msg)
  }
  newPlaylistName = (e) => {
    this.setState({newPlaylist: e})
  }
  createPlaylistInput = () => {
    const { newPlaylist } = this.state
    return (
      <TableRow> 
        <TableDataCell>
        </TableDataCell>  
        <TableDataCell>
          <TextField 
            onChange={(e)=>this.newPlaylistName(e.target.value)} 
            label="Enter playlist name..."
          />
          </TableDataCell>
          <TableDataCell>
          <Button onClick={()=>this.initNewPlaylist()}>Discard</Button>
          </TableDataCell>
          <TableDataCell>
        { newPlaylist 
          ? <Button onClick={()=>this.saveNewPlaylist()}>Create</Button> 
          : <Button disabled>Create</Button> }
        </TableDataCell>
      </TableRow> 
    )
  }
  // renderDescription = (description) => {
  //   return (
  //     <details>
  //       <summary>description</summary>
  //       <p>{description}</p>
  //     </details>
  //     )
  // }
  renderPlaylistImage = (img) => {
    const url = img.length > 1 ? this.handleImage(img) : {url: null} 
    return <PlaylistImage src={url} />
  }
  renderPlaylistName = (playlist) => playlist.name  
  renderTrackCount = (total) =>  total
  renderRequestCount = (id) => (
    // brute forcettamalla array ...
    // there must be another way...
    this.state.requestCount.map(col => 
      col.playlist === id 
        ? col.requests
        : null 
      )

  )
  renderPlaylistListItem = (playlist) => {
    const playlistImg = this.renderPlaylistImage(playlist.images)
    const name = this.renderPlaylistName(playlist)
    const trackCount = this.renderTrackCount(playlist.tracks.total)
    const requestCount = this.renderRequestCount(playlist.id)
    return (      
      <TableRow>        
        <TableDataCell> <Link to={'/playlist/' + playlist.id}>{playlistImg}</Link></TableDataCell>
        <TableDataCell> <Link to={'/playlist/' + playlist.id}>{name}</Link></TableDataCell>
        <TableDataCell><Link to={'/playlist/' + playlist.id}>{trackCount}</Link></TableDataCell>
        <TableDataCell> <Link to={'/playlist/' + playlist.id}>{requestCount}</Link></TableDataCell>
      </TableRow>
      )
  }
  render = () => {
    // 17.4.2020
    // if playlistCounts is not the same as playlistSet.lenght
    // then show loading playlist
    // other wise display the playlist list item

    const { playlistSet, requestCount, create } = this.state
    const isCount = (element) => element.playlist
    const createPlaylistInput = create ? this.createPlaylistInput() : null
    let img, count=0;
    return (
      <MyPlaylistExe>
        <WindowHeader>MyPlaylists.exe</WindowHeader>
        <Toolbar>  
          <CreatePlaylistBtn  
            createPlaylist={this.toggleInput}
            create={create} 
            />
        </Toolbar>
        <WindowContent>
          <Table>
            <TableHead>
              <TableRow head>
                <TableHeadCell>Image</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Tracks</TableHeadCell>
                <TableHeadCell>Requests</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { createPlaylistInput }
              { playlistSet.map(playlist => (
                  this.renderPlaylistListItem(playlist)
                ))}
            </TableBody>
          </Table>
        </WindowContent>
      </MyPlaylistExe>
      );
    }
  }
  

  export default PlaylistSet;