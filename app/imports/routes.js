import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// views
import Home from './ui/Home'
import Playlist from './ui/Playlist'

class Routes extends Component {
  render() {
    return( 
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/logout" component={Home} />
        <Route path="/token/:token" component={(props) => <Home {...props} />} />
        {/* <Route\ exact path="/" component={Landing} /> */}
        {/* <Route path="/home/:handle" component={Home} /> */}
        <Route path="/playlist/:id" component={Playlist} />
      </Switch>
      {/* <Route exact path="/login" render={redirectToLanding} /> */}
    </BrowserRouter>
    )
  }
}

export default Routes;