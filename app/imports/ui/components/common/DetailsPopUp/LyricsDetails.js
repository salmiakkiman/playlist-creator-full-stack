import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { Cutout, } from 'react95';

// import controllers
import Track from '../../../../controller/Track'
const trackController = new Track

class Lyrics extends Component {
  state = {
    lyrics: null
  }
  componentDidMount = () => {
    
    let fetchLyrics = trackController.fetchLyrics(this.props.track.id)
    fetchLyrics.then(response => this.setState({ lyrics: response}))

  }
  renderLyrics = (lyrics) => {
    return lyrics.map(row => <p>{row}</p>)
  }
  render = () => {
    const {lyrics} = this.state
    const filtered = lyrics ? lyrics.match(/[^\r\n]+/g) : null
    const content = filtered ? this.renderLyrics(filtered) : 'sorry no lyrics'
    return (      
      <Cutout>
        {content}
      </Cutout>
    )
  }
}

export default Lyrics