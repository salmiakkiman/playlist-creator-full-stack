import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { Cutout, } from 'react95';

// import controllers
import Track from '../../../../controller/Track'
const trackController = new Track

class Audio extends Component {
  state = {
    content: null
  }
  componentDidMount = () => {
    const { track } = this.props
    const features = trackController.fetchAudioFeatures(track.id)
    features.then(audioFeatures => this.setState({content: audioFeatures}))
  }
  renderRow = (title, value) => <p>{title}: {value}</p>
  renderContent = (content) => {
    return (
      <div>
        {this.renderRow('Tempo', content.tempo)}
        {this.renderRow('Acousticness', content.acousticness)}
        {this.renderRow('Energy', content.energy)}
        {this.renderRow('Liveness', content.liveness)}
      </div>
    )
  }
  render = () => {
    const {content} = this.state
    return (
      <Cutout>
        {content ? this.renderContent(content) : 'no content :/'}
      </Cutout>
    )
  }
}

export default Audio