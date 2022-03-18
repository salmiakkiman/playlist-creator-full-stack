import requests
import json

# find specific artist and its information
# from Spotify
# def find(artistId, token):
#   url = "https://api.spotify.com/v1/artists/" + artistId
#   headers = {'Authorization': 'Bearer ' + token}
#   response = requests.get(url, headers=headers)
#   artist = response.content
#   artist = json.loads(artist)
#   return artist

def fetchArtist(artistId, token):
  url = "https://api.spotify.com/v1/artists/" + artistId
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  artist = response.content
  artist = json.loads(artist)
  return artist