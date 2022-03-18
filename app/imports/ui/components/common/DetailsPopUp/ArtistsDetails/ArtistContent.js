import React, { Component } from 'react';
import styled from 'styled-components'



// import react95
import { Fieldset, Avatar} from 'react95';

const ArtistAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
`
const Info = styled.div`
  width: 100px;
`

class ArtistContent extends Component {
  state = {
    content: {
      name: null,
      image: null,
      genres: null
    }
  }
  componentDidMount = () => {
    const { artist } = this.props
    const images = artist.images
    const genres = artist.genres
    const name = artist.name

    const imgContent = this.renderAvatar(images)
    const genreContent = this.renderGenres(genres)

    let content = {}
    content.image = imgContent
    content.name = name
    content.genres = genreContent

    this.setState({
      content: content
    })
  }
  renderGenres = (genres) => {
    return ( 
      genres.map(genre=>(
         <p> {genre}</p>
        ))
        
    )
  }
  renderAvatar = (images) => {
    const url = this.avatarUrl(images)
    const avatar = this.avatarElement(url)
    return avatar
  }
  avatarUrl = (images) => images && images.length > 2 ? images[2].url : null
  avatarElement = (url) => <ArtistAvatar square src={url} />
  
  render = () => {
    const { content } = this.state
    return (
      <Fieldset label={content.name}>
      <Content>
        {content.image}
        <Info> 
          <p>Genres:</p>
          {content.genres}
        </Info>
      </Content>
      </Fieldset>
    )
  }
}

export default ArtistContent