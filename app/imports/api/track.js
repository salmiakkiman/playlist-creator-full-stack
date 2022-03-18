
import { Mongo } from 'meteor/mongo';

export const TrackCol = new Mongo.Collection('Track');


if (Meteor.isServer) {
  Meteor.publish('Track', function(id) {
    return TrackCol.find( { id: id } )
  });
  // (playlistId) => {
  //   console.log('publishin playlist')
  //   return PlaylistCol.find( 
  //     { id: playlistId },
  //     { fields: { id:1 } }
  //     );
  // });
}
