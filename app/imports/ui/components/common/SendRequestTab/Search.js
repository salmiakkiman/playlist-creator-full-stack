import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { TextField, Button, Cutout, Toolbar } from 'react95';

// import components

const Dialog = styled.dialog`
  opacity:0.1;
`

class RequestTab extends Component {
  render = () => {
        return (      
      <Toolbar>
          <TextField  id="search" name="search" onChange={e => this.props.setKeyword(e)} />
          <Button 
            value={this.props.keyword} 
            onClick={e => this.props.search(e)}
            disabled={this.props.keyword ? false : true }
          >
            Search
          </Button>
      </Toolbar>
      )
  }
}

export default RequestTab