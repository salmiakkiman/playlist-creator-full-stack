from .playlist import *
# from .loginFunctio\ns import *
from .user import *
from .search import *
from .artist import *
from .response import *
from .index import *
from .track import *
from .Object import *

import requests
import json
import base64
from flask import current_app


# get client_credentials token
def defineHeaders():
  CLIENT_ID = current_app.config['CLIENT_ID']
  CLIENT_SECRET = current_app.config['CLIENT_SECRET']
  # # create correct header
  to_encode = CLIENT_ID + ":" + CLIENT_SECRET
  base64_encoded_id_secret = base64.b64encode(to_encode.encode()).decode()
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic {}'.format(base64_encoded_id_secret)
  }
  return headers

def defineParams():
  params = {'grant_type': "client_credentials"}
  return params

def tokenClientCredentials():
  url = "https://accounts.spotify.com/api/token"
  headers = defineHeaders()
  params = defineParams()
  clientCredentials = requests.post(url, headers=headers, params=params)
  clientCredentials = clientCredentials.json()
  return clientCredentials

def returnAccessToken(clientCredentials):
  return clientCredentials["access_token"]

def getToken():
  clientCredentials = tokenClientCredentials()
  token = returnAccessToken(clientCredentials)
  return token

def initOwnPlaylistSet(userId, token, refreshToken):
  response = fetchUserPlaylists(userId, token)
  if "error" in response:
    if response["error"]["message"] == "The access token expired":
      return response
  else:
    playlistItems = playlistObject.returnItems(response)
    ownedPlaylistSet = returnUserOwnedItems(playlistItems, userId)
    return ownedPlaylistSet

# to fetch user's playlists from spotify
# returns items of playlist
def fetchUserPlaylists(userId, token):
  playlistSet = fetchPlaylistSet(userId, token)
  return playlistSet

def returnUserOwnedItems(items, userId):
  userPlaylist = []
  for item in items:
    owner = playlistObject.returnOwner(item)
    ownerId = userObject.returnId(owner)
    if ownerId == userId:
      userPlaylist.append(item)
  return userPlaylist

def getPlaylistContent(playlist, token):
  playlistId = playlistObject.returnId(playlist)
  playlistContent = getTracks(playlistId, token)
  return playlistContent

def initFetchPlaylist(playlistId):
  token = getToken()
  playlist = fetchPlaylist(playlistId, token)
  return playlist

def initFetchArtist(artistId):
  token = getToken()
  artist = fetchArtist(artistId, token)
  return artist

# def initAddTrack(playlistId, uri):
#   token = getToken()
#   response = addTrack(playlistId, uri, token)
#   return response