import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { Button, TableRow, TableDataCell } from 'react95';

// import controllers
import Calc from '../../../../../controller/Calculator'
import Request from '../../../../../controller/Request'

const calc = new Calc
const request = new Request

class TableRowResult extends Component {
  state = {
    row: null
  }

  postRequest = (trackId) => {
    const { playlistId } = this.props
    request.postRequest(trackId, playlistId)
    this.props.update(true)
  }
  componentDidMount = () => {
    const { track } = this.props
    const songTitle = this.truncateString(track.name, 20)
    const artist = this.returnArtist(track.artists)
    const duration = calc.millisToMinutesAndSeconds(track.duration_ms)
    const addButton = this.renderAddButton(track.id)
    const explicit = track.explicit ? 'explicit' : ''

    const addButtonCell = this.renderCell(addButton)
    const titleCell = this.renderCell(songTitle)
    const artistCell = this.renderCell(artist)
    const durationCell = this.renderCell(duration)
    const explicitCell = this.renderCell(explicit)

    let tableRowContent = []
    tableRowContent.push(addButtonCell)
    tableRowContent.push(titleCell)
    tableRowContent.push(artistCell)
    tableRowContent.push(durationCell)
    tableRowContent.push(explicitCell)
    
    this.setState({
      row: tableRowContent
    })

  }
  renderAddButton = (trackId) => {
    return <Button value={trackId} onClick={(e)=>this.postRequest(e.target.value)}>+</Button>
  }
  renderCell = (cellContent) => (
    <TableDataCell>
      {cellContent}
    </TableDataCell>
  )
  truncateString = (text, n) => {
    const truncateThis = text.toString()
    return (truncateThis.length > n) ? <span>{truncateThis.substr(0, n-1)}&hellip;</span> : truncateThis;
  }
  returnArtist = artists => (
    <span>{artists[0].name} {artists.length > 1 ? <span>(+ {artists.length-1} others)</span> : null }</span>

  )  
  render = () => {
    const { row } = this.state
    return (
    <TableRow>
      {row ? ( row.map(cell=>cell) ) : null}
    </TableRow>
    )
  }
  
}

export default TableRowResult