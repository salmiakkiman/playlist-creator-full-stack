import React, { Component } from 'react';


import User from '../../../controller/User'
//impot react 95
import { Button } from 'react95'

const user = new User

class CreatePlaylist extends Component {
  // state = {
  //   create: false
  // }
  render = () => (
      <Button onClick={this.props.createPlaylist} variant="menu">
        New Playlist...
      </Button>
    );
}

export default CreatePlaylist;
