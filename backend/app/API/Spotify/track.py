import requests
import json

"""
 fetch track by id
"""

def fetch(trackId, token):
  url = "https://api.spotify.com/v1/tracks/" + trackId
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  track = response.content
  track = json.loads(track)
  return track

def fetchAudioFeature(trackId, token):
  url = "https://api.spotify.com/v1/audio-features/" + trackId
  headers = { 'Authorization': 'Bearer ' + token }
  response = requests.get(url, headers=headers)
  audioFeatures = response.content
  audioFeatures = json.loads(audioFeatures)
  return audioFeatures