from pymongo import *


db_connection = MongoClient("mongodb://mongo", 27017)
db = db_connection["meteor"]


# removing tracks that are linked to playlist
def playlistTrackRemover(playlistId):
  col = db["PlaylistTrack"]
  print('deleting')
  x = col.delete_many({ 'playlistId' : playlistId })
  print(x.deleted_count, ' deleted')