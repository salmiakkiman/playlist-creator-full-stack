from pymongo import *

db_connection = MongoClient("mongodb://mongo", 27017)
db = db_connection["meteor"]

# save spotify token
# needed for refresh when token is revoked
# token = { access_token, refresh_token }
def tokenSaver(token):
  col = db["UserAccessToken"]
  try:
    accessToken = token["access_token"]
    refreshToken = token["refresh_token"]
  except:
    accessToken = token["access_token"]
    refreshToken = None
  col.insert_one({ "access": accessToken, "refresh": refreshToken })

# save tracks to db
def trackSaver(track):
  col = db["Track"]
  col.replace_one(
    {"id": track["id"]}, 
    track, 
    True)

def artistSaver(artist):
  col = db["Artist"]
  col.replace_one(
    {"id": artist["id"]},
    artist,
    True)

# save track, playlist and status of request to db
def requestSaver(track, playlist, status):
  col = db["Request"]
  col.replace_one(
    {
      "playlistId": playlist,
      "trackId": track
    }, 
    {
      "trackId": track, 
      "playlistId": playlist, 
      "status": status 
    }, 
    True)
  
def geniusSaver(genius):
  col = db["GeniusTrackPage"]
  col.replace_one(
    {
      "trackId": genius["trackId"],
      "artistId": genius["artistId"],
      "geniusId": genius["geniusId"]
    },
    {
      "trackId": genius["trackId"],
      "artistId": genius["artistId"],
      "geniusId": genius["geniusId"],
      "geniusUrl": genius["geniusUrl"]
    },
    True)

def lyricsSaver(lyrics, url, trackId):
  col = db["Lyrics"]
  col.replace_one(
    {
      "trackId": trackId
    },
    {
      "trackId": trackId,
      "lyrics": lyrics,
      "url": url
    },
    True)

def playlistSaver(playlist):
  col = db["Playlist"]
  col.replace_one(
    {
      "id": playlist["id"]
    },
    playlist,
    True)

def linkPlaylistTrack(playlistId, tracks, offset):
  col = db["PlaylistTrack"]
  col.replace_one(
    { 
      "playlistId": playlistId,
      "offset": offset
    },
    {
      "playlistId": playlistId,
      "tracks": tracks,
      "offset": offset
    },
    True
  )
def audioFeaturesSaver(audioFeatures):
  col = db["AudioFeatures"]
  col.replace_one(
    { "id" : audioFeatures["id"] },
    {
      "duration_ms": audioFeatures["duration_ms"],
      "energy": audioFeatures["energy"],
      "tempo" :audioFeatures["tempo"],
      "mode": audioFeatures["mode"],
      "acousticness": audioFeatures["acousticness"],
      "liveness": audioFeatures["liveness"],
      "id": audioFeatures["id"],
      "uri": audioFeatures["uri"],
      "track_href": audioFeatures["track_href"],
      "analysis_url": audioFeatures["analysis_url"]
    },
    True
  )