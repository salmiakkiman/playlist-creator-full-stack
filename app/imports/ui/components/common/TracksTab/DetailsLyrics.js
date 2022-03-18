import React, { Component } from 'react';
import styled from 'styled-components'

class DetailsLyrics extends Component {
  state = {
    lyricsRender: null
  }
  renderContent = (lyrics) => {
    let filtered
    lyrics.then(ready => {
      filtered = ready.match(/[^\r\n]+/g);
      this.setState({lyrics:ready})
    } )
    
      
    return (
      <div>
      </div>
    )
  }
  renderLyrics = (lyrics) => {
    console.log(lyrics) 
    return lyrics.map(row => <p>{row}</p>)
  }
  render = () => {
    const {lyrics} = this.props
    console.log(lyrics)
    const filtered = lyrics ? lyrics.match(/[^\r\n]+/g) : null
    const content = filtered ? this.renderLyrics(filtered) : 'sorry no lyrics'
    // const { lyrics } = this.props
    // {lyrics ? this.renderContent(lyrics) : 'no content :/'}
    // console.log(lyrics)
    return <article>{content}</article>
  }
}

export default DetailsLyrics