import React, { Component } from 'react';
import styled from 'styled-components'

class DetailsAudioFeatures extends Component {
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
    const {content} = this.props
    return (
      <article>
        {content ? this.renderContent(content) : 'no content :/'}
      </article>
    )
  }
}

export default DetailsAudioFeatures