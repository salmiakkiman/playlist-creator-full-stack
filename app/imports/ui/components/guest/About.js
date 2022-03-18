import React, { Component } from 'react'
import styled from 'styled-components';
import { Cutout, Fieldset, Window, WindowHeader, WindowContent,} from 'react95';


const AboutWindow= styled(Window)`
  margin-left: 3px;
  margin-top: 70px;
  width: 100%;
`
const Content = styled(WindowContent)`
  margin-left: 3px;
  margin-right:3px;
`
const MainHeader = styled.h1`
  font-family: times new roman;
  text-align: center;
  font-size: 3rem;
  margin-top: 0.5rem;
`
const StyledCutout = styled(Cutout)`
  background: ${({ theme }) => theme.canvas};
`;

// const OrderList = styled(ol)`
// `


class About extends Component {
  /**
   * calls api backend to login to ...
   * 26.01.2020
   */
  render() {
    return (
      <AboutWindow>
      <WindowHeader>About.exe</WindowHeader>
      <Content>
        <StyledCutout>
        <MainHeader>Playlist Creator</MainHeader>
          <Fieldset>
            Playlist Creator is an experimental test.
          </Fieldset>
          <Fieldset>
            <p>How to use:</p>
            <br />
              <p>1. login with your spotify account</p>
              <p>2. create new playlist / open your playlist</p>
              <p>3. link the url of the playlist to your friend</p>
              <p>4. let your pal send requests to your playlist</p>
              <p>5. approve or reject requests</p>
            <br />
            <p>Thank you.</p>
          </Fieldset>
          <Fieldset>
            Contact me on Github <a href='https://github.com/salmiakkiman'>salmiakkiman</a>
          </Fieldset>
          <Fieldset>
            Check out the repository: <a href='https://github.com/salmiakkiman/playlist-creator-full-stack'>github@playlist-creator-full-stack</a>
          </Fieldset>
        </StyledCutout>

      </Content>
    </AboutWindow>
    );
  }
}

export default About;
