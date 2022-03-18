import React, { Component } from 'react';
import styled from 'styled-components'

// import Details from './Details'

// import DetailsPopUp from '../DetailsPopUp'
import Calc from '../../../../controller/Calculator'
import Track from '../../../../controller/Track'
import Token from '../../../../controller/Token'

// import react95
import { TableRow, TableDataCell, Button } from 'react95';

const DetailsButton = styled(Button)` 
  height:80px;
  margin-bottom: 20px;
  margin-top: 20px;
  top: 10px;
`
// const AlbumCover = styled.img`
//   margin-top: 10px;
//   margin-bottom: 10px;
//   width: 50px;
//   position: absolute;
// `
const StyledTableRow = styled(TableRow)`
  height: 60px !important;
`

const ActionButton = styled(Button)`
  width: 75px;
  height: 40px;
`
const ActionBtnSet = styled.div`
  height:80px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`
const AlbumCover = styled.img`
  margin-top: 40px; 
  width: 50px;
  position: absolute;
`

const calc = new Calc
const trackController = new Track
const token = new Token

class RequestTableRow extends Component {
  state = {
    row: [],
    openPopUp: false,
    handled: false,
    action: false
  }
  openDetailsPopUp = () => {
    const {openPopUp} = this.state
    this.setState({
      openPopUp: !openPopUp
    })
  }
  componentDidMount = () => {
    const { track, owner } = this.props
    this.setRowState(track, owner, )
    
  }
  setRowState = (track, owner) => {
    // console.log(this.state.handled)
    // const albumImage = this.getAlbumImage(track)
    const songTitle = this.truncateString(track.name, 20)
    const artist = this.returnArtist(track.artists)
    const duration = calc.millisToMinutesAndSeconds(track.duration_ms)
    const explicit = track.explicit ? 'explicit' : null
    // const details = this.renderDetailsButton("Show details")    
    const rejectBtn = owner ? this.renderBtn(track, 'rejected', 'Reject') : null
    const approveBtn = owner ? this.renderBtn(track, 'added', 'Add'): null
    // const actionBtnSet = <ActionBtnSet>{rejectBtn} {approveBtn}</ActionBtnSet>

    const cellApprove = this.renderCell(approveBtn)
    // const cellImg = this.renderCell(albumImage)
    const cellName = this.renderCell(songTitle)
    const cellArtist = this.renderCell(artist)
    const cellDuration = this.renderCell(duration)
    const cellExplicit = this.renderCell(explicit)
    const cellReject = this.renderCell(rejectBtn)
    // const cellDetails = this.renderCell(details) 
    
    let tableRowContent = []
    // tableRowContent.push(cellImg)
    tableRowContent.push(cellApprove, cellName)
    tableRowContent.push(cellArtist)
    tableRowContent.push(cellDuration)
    tableRowContent.push(cellExplicit, cellReject)
    // tableRowContent.push(cellActionButtonSet)
    // tableRowContent.push(cellDetails)
    this.setState({
      row: tableRowContent
    })
    
  }
  // getAlbumImage = track => {
  //   const albumCoverSet = this.returnAlbumCoverSet(track)
  //   const url = this.returnAlbumCoverUrl(albumCoverSet)
  //   const albumImage = this.returnAlbumImg(url)
  //   return albumImage
  // }
  returnAlbumImg = url => <AlbumCover src={url} />
  handleApprovement = (action, track) => {
    const playlist = this.props.playlist
    const response = trackController.handleRequest(track, action, playlist)
    
    
    this.setState({
      handled: true,
      action: action
    })
    this.props.update()
  }
  refreshToken = () => {
    // console.log('need to refresh token')
    // const url = token.refreshTokenUrl()
    // const options = token.refreshTokenOptions()
    // fetch(url, options)
    //   .then((response) => response.json())
    //   .then(response => {
    //     token.setAccessToken(response.access_token)
    //     this.loadPlaylistSet()
    //   })    
  }
  truncateString = (text, n) => {
    const truncateThis = text.toString()
    return (truncateThis.length > n) ? <span>{truncateThis.substr(0, n-1)}&hellip;</span> : truncateThis;
  }
  returnArtist = artists => (
    <span>{artists[0].name} {artists.length > 1 ? <span>(+ {artists.length-1} others)</span> : null }</span>
  )  
  // returnAlbumCoverSet = track => track ? track.album.images : null
  // returnAlbumCoverUrl = albumCover => albumCover && albumCover.length > 2 ? albumCover[2].url : null
  // renderDetailsButton = (label) => {
  //   return <DetailsButton onClick={this.openDetailsPopUp}>{label}</DetailsButton>
  // }
 
  // renderDetails = () =>{

  //   const { track } = this.props
  //   let detailsContent= this.renderCell(<DetailsPopUp openDetailsPopUp={this.openDetailsPopUp} track={track.track} />)
  //   let detailsButton = this.renderCell(this.renderDetailsButton("Hide details"))
  //   return [ detailsContent, detailsButton ]
  // }
  returnArtistSet = artists => artists.map((artist, i, arr) => arr.length -1 === i ? artist.name : artist.name+", ")
  renderBtn = (track, btnValue, btnTitle) => (
    <ActionButton 
      disabled={this.state.handled}
      value={btnValue} 
      onClick={(e)=>this.handleApprovement(e.target.value, track.id)}>
        {btnTitle}
    </ActionButton>
  )
  returnExplicit = () => 'explicit'
  renderCell = (cellContent) => {
    // console.log(this.state.handled)
    return <TableDataCell>{cellContent}</TableDataCell>
    }
  renderRow = () => {
    const { row, handled, action } = this.state
    // const details = this.renderDetails() 
    
    return ( 
        <StyledTableRow>
          { row && !handled ? row.map(cell => cell) : this.renderCell(action) }
        </StyledTableRow>
      )
  }
  render = () => this.props.track ? this.renderRow() : null
}

export default RequestTableRow
