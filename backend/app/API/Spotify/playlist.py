import requests
import json


# creates playlist to spotify
# name = playlist's name
# id = user's id
# public = boolean
# toimii
def create(name, userId, token):
  url="https://api.spotify.com/v1/users/" + userId + "/playlists"
  headers = {'Authorization': 'Bearer ' + token}
  params = json.dumps({'name': name})
  response = requests.post(url, headers=headers, data=params)
  raw = response.content
  formattedObj = json.loads(raw)
  return formattedObj


def fetchPlaylistSet(userId, token, offset="0"):
  url="https://api.spotify.com/v1/users/" + userId + "/playlists?offset=" + offset + "&limit=50"
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  raw = response.content
  formattedObj = json.loads(raw)
  return formattedObj

def fetchPlaylist(playlistId, token):
  url="https://api.spotify.com/v1/playlists/"+playlistId
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  raw = response.content
  formattedObj = json.loads(raw)
  return formattedObj


def getTracks(playlistId, token, url):
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  raw = response.content
  formattedObj = json.loads(raw)
  return formattedObj


# to add tracks to playlist
# used especially when approving track from other users
def addTrack(playlistId, uris, token, position=0):
  url = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?uris=" + uris
  headers = {
    'Authorization': 'Bearer ' + token, 
    'Content-Type': 'application/json' 
  }
  params = {
    'uris': uris,
    'position': position
  }
  response = requests.post(url, headers=headers) 
  raw = response.content 
  formattedObj = json.loads(raw)
  return formattedObj
