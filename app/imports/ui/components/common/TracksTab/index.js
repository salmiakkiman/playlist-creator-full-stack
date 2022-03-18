import React, { Component } from 'react';
import styled from 'styled-components'

import TrackTable from './Table'

const TrackListComponent = styled.div`


`

class TrackList extends Component { 
 
  render = () => {  
    const { trackList } = this.props
    return (
      <TrackListComponent>
        {
          this.props.trackList.length > 0
            ? <TrackTable trackList={trackList} />
            : null
        }
      </TrackListComponent>
    )
  }
}

export default TrackList;
