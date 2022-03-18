import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { Table, TableHead, TableRow, TableHeadCell, TableBody  } from 'react95';

// import components
import TableRowResult from './TableRowResult'

class TableSearchResult extends Component {

  render = () => {
    const { searchResult } = this.props
    return (      
      <Table>
        <TableHead>
          <TableRow head>
          <TableHeadCell>Request this</TableHeadCell>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Artist</TableHeadCell>
          <TableHeadCell>Duration</TableHeadCell>
          <TableHeadCell>Explicit</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { searchResult && (
          searchResult.map(result => (
            <TableRowResult 
              track={result} 
              playlistId={this.props.playlistId} 
              update={this.props.update}
            />
          ))
        // <SearchItem />
        )}

        </TableBody>
      </Table>
      )
  }
}

export default TableSearchResult