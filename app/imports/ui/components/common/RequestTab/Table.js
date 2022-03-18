import React, { Component } from 'react';
import styled from 'styled-components'

import RequestTableRow from './TableRow'

// import react95
import { Table, TableHead, TableRow, TableHeadCell, TableBody } from 'react95';

// import RequestController from '../../../../controller/Request'

// const requestController = new RequestController

const TrackRow = styled.tr`
  list-style: none;
  counter-reset: position;
  height: 250px;
  overflow-y: scroll;
`

class RequestTable extends Component {
  state = {
    removedItem: null
  }
  render = () => {
    const { trackList, owner } = this.props
    // console.log(trackList)
    const tableRow =  this.props.trackList ?
    (trackList.map((track, index) => {
      return  (
        <RequestTableRow 
          track={track} 
          {...this.props}
        />
      )
    }
    )) : null
    return (
      <Table>
        <TableHead>
          <TableRow head>
            {/* <TableHeadCell>Album cover</TableHeadCell> */}
            { owner ? <TableHeadCell></TableHeadCell> : null }
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Artist</TableHeadCell>
            <TableHeadCell>Duration</TableHeadCell>
            <TableHeadCell>Explicit</TableHeadCell>
            { owner ? <TableHeadCell></TableHeadCell> : null }
            {/* <TableHeadCell>Details</TableHeadCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRow}
          {/* {(trackList.map((track, index) => 
          <RequestTableRow 
            track={track} 
            {...this.props}
          />
        ))} */}
        </TableBody>
      </Table>
      
      )
  }
}

export default RequestTable