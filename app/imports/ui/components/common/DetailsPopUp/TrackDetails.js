import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { Cutout, Avatar, Fieldset} from 'react95';

// import controllers
import Track from '../../../../controller/Track'
const trackController = new Track

const Content = styled.div`
  display: flex;
  flex-direction: row;
`
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`
const AlbumCover = styled(Avatar)`
  width: 100px;
  height: 100px;
`
const Info = styled.div`
`

class TrackInformation extends Component {
  state = {
    content: {
      songTitle: null,
      artists: null,
      albumCover: null,
      popularity: null,
      excplicit: null
    }
  }
  componentDidMount = () => {
    const { track } = this.props
    
    const songTitle = track.name
    const artists = track.artists
    const albumCover = track.album.images
    const explicit = track.explicit
    const albumCoverElement = this.renderAvatar(albumCover)
    const explicitElement = this.renderExplicit(explicit)
    const artistsElement = this.renderArtists(artists)
    
    let content = {}
    content.songTitle = songTitle
    content.artists = artistsElement
    content.albumCover = albumCoverElement
    content.explicit = explicitElement
    this.setState({
      content: content
    })
  } 
  renderArtists = (artists) => {
    return this.returnArtistSet(artists)
  }
  returnArtistSet = artists => artists.map((artist, i, arr) => arr.length -1 === i ? artist.name : artist.name+", ")

  checkExplicit = (explicit) => {
    return explicit ? 'explicit' : null    
  }
  renderExplicit = (explicit) => {
    const content = this.checkExplicit(explicit)
    return <p>{content}</p>
  }
  renderAvatar = (images) => {
    const url = this.avatarUrl(images)
    const avatar = this.avatarElement(url)
    return avatar
  }
  avatarUrl = (images) => images && images.length > 2 ? images[2].url : null
  avatarElement = (url) => <AlbumCover square src={url} />

  render = () => {
    const {content} = this.state
    
    return (
      <Fieldset label = {content.songTitle}>
      <Content>
        {content.albumCover}          
        <TextContent>
          <Info> 
            <p>By: {content.artists}</p>          
          </Info>
          <Info> {content.explicit} </Info>
        </TextContent>
      </Content>
        {/* {content.popularity} */}
      </Fieldset>
    )
  }
}

export default TrackInformation