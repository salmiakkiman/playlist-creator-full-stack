import React, { Component } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes, } from 'react95';

import Routes from './routes';

const ResetStyles = createGlobalStyle`
  body {
    background-color: #008080;
  }
  ${reset}
`;




// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div>
        <ResetStyles />
        <ThemeProvider theme={themes.default}>
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;