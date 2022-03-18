import React, { Component } from 'react';
import styled from 'styled-components'

// import react95
import { Cutout, Window, WindowHeader, WindowContent, Button, Tabs, Tab, TabBody, Toolbar } from 'react95';

// import components
import PopUpContent from './PopUpContent'

const PopUpWindow = styled(Window)`
  width: 80vh;
`

class DetailsPopUp extends Component {

  render = () => {
    return (            
        <PopUpWindow>
          <PopUpContent track={this.props.track} />
        </PopUpWindow>
      )
  }
}

export default DetailsPopUp