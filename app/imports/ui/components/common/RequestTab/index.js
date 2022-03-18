import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
import { RequestListCol } from '../../../../api/requestList'

// import TrackController from '../../../../controller/Track'
// const trackController = new TrackController
import TracksTable from './Table'


class RequestTab extends Component {
  
  
  render = () => (
    <TracksTable 
      {...this.props} 
    />
  )    
}

export default withTracker(() => {
  // const url = window.location.href
  // const splitted = url.split('playlist/')
  // const id = splitted[1]
  // let details = { id: null, name: null, owner: { id: null } }
  // Meteor.subscribe('Request', id); 
  // details = RequestListCol.find({playlistId: id}).fetch() // fetch user playlists IDs
  // return { details: details }
})(RequestTab);