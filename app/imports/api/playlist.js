import { Mongo } from 'meteor/mongo';

export const PlaylistCol = new Mongo.Collection('Playlist');


if (Meteor.isServer) {
  Meteor.publish('Playlist', function(id) {
    return PlaylistCol.find( { id: id } )
  });
  // (playlistId) => {
  //   console.log('publishin playlist')
  //   return PlaylistCol.find( 
  //     { id: playlistId },
  //     { fields: { id:1 } }
  //     );
  // });
}
