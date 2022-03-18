import { Mongo } from 'meteor/mongo';

export const RequestListCol = new Mongo.Collection('Request');


if (Meteor.isServer) {
  Meteor.publish('Request', function(id) {
    console.log('finding request of the playlist...')
    return RequestListCol.find({playlistId:id})
  });
  // (playlistId) => {
  //   console.log('publishin playlist')
  //   return PlaylistCol.find( 
  //     { id: playlistId },
  //     { fields: { id:1 } }
  //     );
  // });
}
