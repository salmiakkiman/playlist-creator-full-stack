import React, { Component } from 'react';
import styled from 'styled-components'

import DetailsPopUp from '../DetailsPopUp'
import Details from './Details'
import Calc from '../../../../controller/Calculator'


const calc = new Calc

const DetailsButton = styled(Button)`
  height:80px;
`
// const TrackItem = styled.li`
//   &:before {
//     counter-increment: position;
//     content: counters(position, '#') '. ';
//   }
// `

// import react95
import { TableRow, TableDataCell, Button } from 'react95';

const AlbumCover = styled.img`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50px;
  position: absolute;
`
const StyledTableRow = styled(TableRow)`
  height: 60px !important;
`

class TrackTableRow extends Component {
  state = {
    row: [],
    openPopUp: false
  }
  openDetailsPopUp = () => {
    const {openPopUp} = this.state
    this.setState({
      openPopUp: !openPopUp
    })
  }
  componentDidMount = () => {
    // console.log(this.props)
    const { track } = this.props
    const duration = calc.millisToMinutesAndSeconds(track.duration_ms)
    const songTitle = this.truncateString(track.name, 20)
    // const details = this.renderDetailsButton("Show details")

    // const albumCoverSet = track ? this.returnAlbumCoverSet(track) : null
    // const albumCoverUrl = track ? this.returnAlbumCoverUrl(albumCoverSet) : null
    const nameCell = this.renderCell(songTitle)
    // console.log(nameCell)
    // const imgCell = albumCoverUrl ?  this.renderCell(this.returnAlbumImg(albumCoverUrl)) : null
    const artistsCell = this.renderCell(this.returnArtistSet(track.artists))
    // console.log(artistsCell)
    const durationCell = this.renderCell(duration)
    const popularityCell = track.popularity ? this.renderCell(track.popularity) : null
    const explicitCell = this.renderCell(track.explicit ? 'explicit' : null) 
    // const cellDetails = this.renderCell(details) 
    
    let tableRowContent = []
    // tableRowContent.push(imgCell)
    tableRowContent.push(nameCell)
    tableRowContent.push(artistsCell)
    // tableRowContent.push(popularityCell)
    tableRowContent.push(durationCell)
    tableRowContent.push(explicitCell)

    // tableRowContent.push(cellDetails)

    
    this.setState({
      row: tableRowContent
    })
  }
  
  handleArtist = (artists) => artists[0]
  returnAlbumCoverSet = track => track ? track.album.images : null
  returnAlbumCoverUrl = albumCover => albumCover && albumCover.length > 2 ? albumCover[2].url : null
  truncateString = (text, n) => {
    const truncateThis = text.toString()
    return (truncateThis.length > n) ? <span>{truncateThis.substr(0, n-1)}&hellip;</span> : truncateThis;
 
  }
  trackDetails = (id, title) => <Details title={title} id={id} />
  
  returnArtistSet = artists => (
    <span>{artists[0].name} {artists.length > 1 ? <span>(+ {artists.length-1} others)</span> : null }</span>
  )
  // renderDetailsButton = (label) => {
  //   return <DetailsButton onClick={this.openDetailsPopUp}>{label}</DetailsButton>
  // }
 
  returnAlbumImg = url => <AlbumCover src={url} />
  renderCell = (cellContent) => (
    <TableDataCell>
        {cellContent}
    </TableDataCell>
  )
  // renderDetails = () =>{

  //   const { track } = this.props
  //   let detailsContent= this.renderCell(<DetailsPopUp openDetailsPopUp={this.openDetailsPopUp} track={track} />)
  //   // let detailsButton = this.renderCell(this.renderDetailsButton("Hide details"))
  //   return [ detailsContent, detailsButton ]
  // }
  render = () => {
    const { row, openPopUp } = this.state
    const { track } = this.props
    // const details = this.renderDetails() 
    return ( 
      <StyledTableRow>

      { row  ? row.map(cell => cell) : null }
         {/* openPopUp 
        ? details.map(cell => cell )
        : row  ? row.map(cell => cell) : null
      } */}
      </StyledTableRow>
    ) 
  }
}

export default TrackTableRow
