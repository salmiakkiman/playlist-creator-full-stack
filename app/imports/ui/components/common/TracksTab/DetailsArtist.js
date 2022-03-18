import React, { Component } from 'react';
import styled from 'styled-components'

const TrackList = styled.ul`
  height: 250px;
  overflow-y: scroll;
`

const ArtistImage = styled.img`
  height: 50px;
  width: 50px;
`

class DetailsArtist extends Component {
  state = {
      image: null,
      name: null,
      popularity: null,
      id: null,
      genres:[]
  }
  // componentDidMount = () => {
    //   const {artist} = this.props
    //   let image
    //   artist.then(artist=> {
      //     image = artist.images.length > 1 ? this.handleImages(artist.images) : {url: null} 
      //     this.setState({
        //       name: artist.name,
        //       id: artist.id,
        //       genres: artist.genres,
        //       image: image,
        //       popularity: artist.popularity
        //     })
        //   })
        // }
        // returnImg = (img) 
  handleImages = (images) => images[2].url
  returnmRow = (rowContent) => rowContent
  returnArrayEl = (genericArray) => genericArray.map((row, i, arr) => arr.length -1 === i ? row : row+", ")
  render = () => {
    const { content } = this.props
    const imageUrl = content.images.length > 1 ? this.handleImages(content.images) : null
    const nameEl = content.name ? this.returnmRow(content.name) : null
    const popularityEl = content.popularity ? this.returnmRow(content.popularity) : null
    const genreEl = content.genres ? this.returnArrayEl(content.genres) : null
    return (
      <article>
        <ArtistImage src={imageUrl} />
        <p>{nameEl}</p>
        <p>popularity score on Spotify: {popularityEl}</p>
        <p>Genres: {genreEl}</p>
      </article>
    )
  }
}

export default DetailsArtist