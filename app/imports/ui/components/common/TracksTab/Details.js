import React, { Component } from 'react';
import styled from 'styled-components'

import DetailsArtist from './DetailsArtist'
import DetailsAudioFeatures from './DetailsAudioFeatures'
import DetailsLyrics from './DetailsLyrics'

import Track from '../../../../controller/Track'
import Artist from '../../../../controller/Artist'

const trackController = new Track
const artistController = new Artist

class Details extends Component {
  state = {
    content: 'loading...'
  }
  onToggle = () => {
    const { title, id } = this.props
    title === "lyrics" ? this.getLyrics(id) : null

    title === "artist" ? this.getArtist(id) : null
    title === "audioFeatures" ? this.getAudioFeatures(id) : null
    title === "track" ? this.getTrack(id) : null
  }
  getTrack = id => {
    this.setState({content: 'track'})
  }
  getAudioFeatures = id => {
    const features = trackController.fetchAudioFeatures(id)
    features.then(f => this.setState({content: <DetailsAudioFeatures content={f} /> }))
  }
  getArtist = (id) => {
    let info = artistController.fetchArtist(id)
    info.then(artist => {
      // console.log(artist)
      this.setState({ content: <DetailsArtist content={artist} />})})
    
  }
  getLyrics = (id) => {
    let lyrics = trackController.fetchLyrics(id)
    lyrics.then(response => this.setState({ content: <DetailsLyrics lyrics={response} />}))
    
      
    //   this.setState({content: response.lyrics})
    //   this.lyricsOutput()
    // })
  }
  // lyricsOutput = () => {
  //   const { content } = this.state
  //   console.log(content)
  //   var enteredText = content;
  //   var numberOfLineBreaks = (enteredText.match(/\n/g)||[]).length;
  //   console.log('Number of breaks: ' + numberOfLineBreaks);
  //   var filtered = content.match(/[^\r\n]+/g);
  //   this.setState({content:filtered})

  // }
  render = () => {  
    const { title } = this.props
    const { content } = this.state
    // console.log(content.length)
    return (
      <details onClick={this.onToggle}>
        <summary>{title}</summary>
        <blockquote>{content ? content : 'not available :( '}</blockquote>
      </details>
      )
  }
}

export default Details
