import React, { Component } from 'react';
import styled from 'styled-components'

const StyledFooter = styled.footer`
  bottom: 0;
  height: 20px;
  margin-top:10px;
`

class Footer extends Component {
  render = () => <StyledFooter>A creation by <a href='https://github.com/salmiakkiman'>salmiakkiman</a></StyledFooter>
}

export default Footer