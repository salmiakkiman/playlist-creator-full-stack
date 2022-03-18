from pymongo import *


# db_connection = MongoClient("mongodb://mongo", 27017)
db_connection = MongoClient("mongodb://mongo", 27017)
db = db_connection["meteor"]

# get spotify access token
# make a function that finds UserAccessToken by access token.
# return the collectoin
def tokenFinder(token):
  col = db["UserAccessToken"]
  accessToken = col.find_one({"access": token},{"_id": 0})
  return accessToken

def trackFinder(trackId):
  col = db["Track"]
  track = col.find_one({"id": trackId}, {"_id": 0})
  return track

def artistFinder(artistId):
  col = db["Artist"]
  artist = col.find_one({
    "id": artistId
  },
  {"_id": 0})
  return artist

# returns list of tracks that requested to the playlist
# 16.3.2020
def requestFinder(playlistId):
  col = db["Request"]
  tracks = col.find({
    "playlistId": playlistId,
    "status": "active"
    },
    { "_id": 0})
  return tracks

def lyricsFinder(trackId):
  col = db["Lyrics"]
  lyric = col.find_one({
    "trackId": trackId
    },
    { "_id": 0})
  return lyric

def artistFinder(artistId):
  col = db["Artist"]
  artist = col.find_one({
    "id": artistId
    },
    { "_id": 0})
  return artist

def audioFeaturesFinder(trackId):
  col = db["AudioFeatures"]
  audioFeatures = col.find_one({
    "id": trackId
  },
  { "_id": 0})
  return audioFeatures

def playlistFinder(playlistId):
  col = db["Playlist"]
  playlist = col.find_one({
    "id": playlistId
  },
  {"_id": 0})
  return playlist