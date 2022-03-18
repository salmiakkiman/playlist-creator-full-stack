import React, { Component } from 'react';
import styled from 'styled-components'

// import components
import Lyrics from './LyricsDetails'
import Audio from './AudioDetails'
import Artists from './ArtistsDetails'
import Track from './TrackDetails'

// import react95
import { WindowContent, Tabs, Tab, TabBody } from 'react95';


class PopUpContent extends Component {
  state = {
    activeTab:0
  }
  openTab =(tab)=> this.setState({ activeTab: tab })
  render = () => {
    const { activeTab } = this.state
    return(        
        <WindowContent>
            <Tabs value={activeTab} onChange={this.openTab}>
              <Tab value={0}>Track</Tab>
              <Tab value={1}>Audio</Tab>
              <Tab value={2}>Lyrics</Tab>
              <Tab value={3}>Artists</Tab>
              
            </Tabs>
            <div>
              {activeTab === 0 && (
              <TabBody>
                <Track track={this.props.track} />
              </TabBody>
              )}
              {activeTab === 1 && (
              <TabBody>
                <Audio track={this.props.track} />
              </TabBody>
              )}
              {activeTab === 2 && (
              <TabBody>
                <Lyrics track={this.props.track} />
              </TabBody>
              )}
              {activeTab === 3 && (
              <TabBody>
                <Artists artists={this.props.track.artists} />
              </TabBody>
              )}
            </div>
        </WindowContent>
      )
  }
}

export default PopUpContent