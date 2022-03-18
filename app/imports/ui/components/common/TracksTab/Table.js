import React, { Component } from 'react';
import styled from 'styled-components'

// import controllers
// import Calc from '../../../../controller/Calculator'
// import Track from '../../../../controller/Track'

//import components
import TrackTableRow from './TableRow'
// import Details from './Details'

// import react95
import { Table, TableHead, TableRow, TableHeadCell, TableBody } from 'react95';

const StyledTableBody = styled(TableBody)`
  overflow: scroll;
  height: 400px;  
`
// const calc = new Calc
// const trackController = new Track

// const TrackList = styled.table`
//   list-style: none;
//   counter-reset: position;
//   overflow-y: scroll;
//   position: absolute;
// `
// const TrackItem = styled.li`
//   &:before {
//     counter-increment: position;
//     content: counters(position, '#') '. ';
//   }
// `


class TrackTable extends Component {
  
  render = () => {
    const { trackList } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow head>
            {/* <TableHeadCell>Album cover</TableHeadCell> */}
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Artist</TableHeadCell>
            {/* <TableHeadCell>Popularity points on Spotify</TableHeadCell> */}
            <TableHeadCell>Duration</TableHeadCell>
            <TableHeadCell>Explicit</TableHeadCell>
            {/* <TableHeadCell>Details</TableHeadCell> */}
          </TableRow>
        </TableHead>
        <StyledTableBody>
          
          {trackList.map((item, index) => (
            <TrackTableRow 
              track={item.track} 
              index={index} 
            />
            ))}
        </StyledTableBody>
      </Table>
    )
  }
}

export default TrackTable