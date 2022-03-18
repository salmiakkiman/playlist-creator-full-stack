import React, { Component } from 'react';
import styled from 'styled-components'

// import components
import ArtistContent from './ArtistContent'

// import react95
import { Cutout} from 'react95';

// import controllers
import Artist from '../../../../../controller/Artist'
const artistController = new Artist

class Artists extends Component {
  state = {
    content: []
  }
  componentDidMount = () => {
    const { artists } = this.props
    let artistFullInfo = this.mapArtists(artists)
  }
  mapArtists = artists => artists.map(artist => this.getArtist(artist.id))
  getArtist = (id) => {
    const artists = this.state.artists
    let helpData ;
    let info = artistController.fetchArtist(id)
    return info.then(artist => {
      this.setState({content: this.state.content.concat(artist)})
    })
  }
  
  renderContent = (content) => {
    return (
      <p>
        {content.map(artist=> <ArtistContent artist={artist} />)}
      </p>
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

export default Artists