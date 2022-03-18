import { Mongo } from 'meteor/mongo';

export const TrackListCol = new Mongo.Collection('PlaylistTrack');


if (Meteor.isServer) {
  Meteor.publish('PlaylistTrack', function(id) {
    console.log('finding tracks of the playlist...')
    return TrackListCol.find({playlistId:id})
  });
  // (playlistId) => {
  //   console.log('publishin playlist')
  //   return PlaylistCol.find( 
  //     { id: playlistId },
  //     { fields: { id:1 } }
  //     );
  // });
}
