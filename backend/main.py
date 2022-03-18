from flask import Flask, jsonify, request, redirect, session, make_response
from flask_cors import CORS, cross_origin
# from flask_celery import make_celery
import os
import jwt
import json
import datetime

from app.dbFunctions import *
from app.listHandling import *
from app.API import *
from app.Model import *

app = Flask(__name__)
app.config.update(
  # for celery
    # CELERY_BROKER_URL='redis://localhost:6379/',
    # CELERY_RESULT_BACKEND='redis://localhost:6379/',
  # for spotify api
    CLIENT_ID='6eddf98560a84bbdaa97810e047f139b',
    CLIENT_SECRET='9b1bbe1933f344de9aa7246b175f2478',
    REDIRECT_URI='http://localhost:5000/callback',
    SCOPE=(
      'playlist-modify-public%20'
      ),
    SECRET= 'medusa app'
    )
# celery = make_celery(app)
CORS(app)

# this does not use spotipy library
# it's deleted 
# 20.01.2020

# Router
@app.route('/')
def hello_world():
    return 'QickLog. Faster than light. Longer than life.'

@app.route('/api/user/login') # *
def getLoginUrl(): 
  loginUrl = Spotify.user.loginUrl()
  return jsonify(loginUrl)

# to get access token from spotify API
# return token to :3000/home/ token
# 21.01.2020
@app.route('/callback/')
def callback():
  code = request.args.get('code')
  token = Spotify.user.getToken(code) # does not return token, return url
  userInformation = Spotify.user.getUser(token["access_token"])  
  jwtToken = jwt.encode({
    "access_token": token["access_token"],
    "refresh_token": token["refresh_token"],
    "user": userInformation
  },
  'medusa'
  )
  redirect_url = "http://localhost/token/" + str(jwtToken)
  return redirect(redirect_url)

@app.route('/api/token/refresh', methods=["POST"])
def refreshAccessToken():
  requestParams = request.get_json()
  refreshToken = requestParams["refresh"]
  token = Spotify.user.refreshToken(refreshToken)
  print('refreshing ')
  return jsonify(token)


""" 
takes userId and access_token for spotify 
return total number of playlists that user has 
"""

@app.route('/api/get/user/playlist/set', methods=["POST"]) # *
def userPlaylistSetRoute():
  requestParams = request.get_json()
  userId = requestParams["id"]
  token = requestParams["token"]
  refreshToken = requestParams["refresh"]
  playlistSet = Spotify.index.initOwnPlaylistSet(userId, token, refreshToken)
  if "error" in playlistSet:
    if playlistSet["error"]["message"] == "The access token expired":
      return playlistSet
  else:
    return jsonify(playlistSet)

# separates single playlist from the set
# then fetch the playlist information
# save the information to db
# return nothin
# @celery.task()
def separatePlaylistSet(playlistSet):
  for playlist in playlistSet:
    savePlaylist(playlist)


# @celery.task()
def savePlaylist(playlist):
  name = listHandler.spotifyObjects.playlist.returnName(playlist)
  playlistId = listHandler.spotifyObjects.playlist.returnId(playlist)
  images = listHandler.spotifyObjects.playlist.returnImages(playlist)
  owner = listHandler.spotifyObjects.playlist.returnOwner(playlist)
  userId = listHandler.spotifyObjects.user.returnId(owner)
  total = listHandler.spotifyObjects.playlist.returnTotal(playlist)
  save.playlistSaver(
    {
      "id": playlistId, 
      "name": name,
      "images": images,
      "total": total    
      }
    )
  print('saved ', name)

@app.route('/api/get/playlist', methods=['POST']) # *
def routePlaylist():
  requestParams = request.get_json()
  playlistId = requestParams["id"]
  playlist = Spotify.index.initFetchPlaylist(playlistId)
  savePlaylist(playlist)
  return jsonify(playlist)

@app.route('/api/request/load/count', methods=['POST'])
def routeloadRequestCount():
  returnThisList = []
  requestParams = request.get_json()
  playlistId = requestParams["playlist"]
  print("searching all the requests and counting them")
  print(playlistId)
  trackList = find.requestFinder(playlistId)

  prettyTrackList = formatList.handleTrackRequestCursor(trackList)
  for item in prettyTrackList:
    track = find.trackFinder(item["trackId"])
    returnThisList.append(track)    
  # return list of tracks :)
  count = len(returnThisList)
  return jsonify(count)


# to load playlist tracks
@app.route('/api/get/playlist/tracks', methods=['POST']) # * 
def routeFetchPlaylistTracks():
  requestParams = request.get_json()
  playlistId = requestParams["id"]
  response = fetchPlaylistTracks(playlistId)
  return jsonify(response)

def fetchPlaylistTracks(playlistId, url=None):
  print('fetching...')
  trackList = []
  token = Spotify.index.getToken()
  if url is None:
    url="https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?&limit=10"
  print(url)
  playlistPage = Spotify.playlist.getTracks(playlistId, token, url)
  items = listHandler.spotifyObjects.playlist.returnItems(playlistPage)
  nextPage = listHandler.spotifyObjects.page.returnNext(playlistPage)
  offset = listHandler.spotifyObjects.page.returnOffset(playlistPage)
  tracks = listHandler.index.getTracksFast(items)
  saveTracks(tracks)
  linkPlaylistTracks(playlistId, tracks, offset)
  if nextPage:
    print('got next page dawg')
    playlistPage = fetchPlaylistTracks(playlistId, nextPage)
  print('got tracks')
  return playlistPage

# @celery.task()
def linkPlaylistTracks(playlistId, tracks, offset):
  save.linkPlaylistTrack(playlistId, tracks, offset)


# @celery.task()
def saveTracks(tracks):
  for track in tracks:
    saveTrackToDb(track)

def saveTrackToDb(track):
  save.trackSaver(track)

def findArtist(artistId):
  token = Spotify.index.getToken()
  artist = Spotify.artist.fetchArtist(artistId, token)
  save.artistSaver(artist)

def findLyricsPage(trackTitle, artistName):
  geniusSet = []
  remote_song_info = None
  lyrics = Genius.search.request_song_info(trackTitle,artistName)
  json = lyrics.json()
  for hit in json['response']['hits']:
        if artistName.lower() in hit['result']['primary_artist']['name'].lower():
            remote_song_info = hit
            break
  if remote_song_info:
    geniusSet = {
      "geniusId":remote_song_info["result"]["id"],
      "geniusUrl": remote_song_info["result"]["url"]
    }
  return geniusSet

# search Track with key word
# returns list of tracks
# 23.2.2020
@app.route('/api/get/track/search', methods=['POST']) # *
def searchTrackRoute():
  prettierResult = []
  requestArguments = request.get_json()
  keyword = requestArguments["keyword"]
  clientCredentials = Spotify.index.tokenClientCredentials()
  token = Spotify.index.returnAccessToken(clientCredentials)
  searchResult = Spotify.search.track(keyword, token)
  tracksPage = listHandler.search.returnTracks(searchResult)
  tracks = listHandler.page.returnItems(tracksPage)
  saveTracks(tracks)  
  return jsonify(tracks)

@app.route('/api/get/track/audioFeatures', methods=['POST']) # *
def audioFeaturesRoute():
  requestArguments = request.get_json()
  trackId = requestArguments["track"]
  audioFeatures = getAudioFeatures(trackId)
  return jsonify(audioFeatures)

def getAudioFeatures(trackId):

  print('eti tälle audiofeature', trackId)
  audioFeatures = find.audioFeaturesFinder(trackId)
  if audioFeatures:
    return audioFeatures
  else:
    token = Spotify.index.getToken()
    audioFeatures = Spotify.track.fetchAudioFeature(trackId, token)
    save.audioFeaturesSaver(audioFeatures)
    return audioFeatures

# to Create New Paylist
# token : access_token for spotify API
# id : user ID 
# name : playlist name
@app.route('/api/playlist/create', methods=['POST'])
def createPaylist():
  requestParams = request.get_json()
  userId = requestParams["id"]
  token = requestParams["token"]
  name = requestParams["name"]
  response = Spotify.playlist.create(name, userId, token)
  return jsonify(response)

# add searched track to as a request
# save track, playlist and status of request to db
@app.route('/api/request/add', methods=['POST']) # *
def userPostRequest():
  requestParams = request.get_json()
  playlistId = requestParams["playlist"]
  trackId = requestParams["track"]
  action = requestParams["status"]
  save.requestSaver(trackId, playlistId, action)

  fetchTrack(trackId)  
  return jsonify({"track": [trackId, playlistId, action]})

def fetchTrack(trackId):
  clientCredentials = Spotify.index.tokenClientCredentials()
  token = Spotify.index.returnAccessToken(clientCredentials)
  track = Spotify.track.fetch(trackId, token)
  save.trackSaver(track)
  return track

@app.route('/api/get/track/lyrics', methods=['POST']) # * 
def getTrackLyricsRoute():
  requestParams = request.get_json()
  trackId = requestParams["track"]
  lyrics = fetchLyrics(trackId)
  return jsonify(lyrics)

def fetchLyrics(trackId):
  lyrics = lyricsFromDB(trackId)
  track = find.trackFinder(trackId)
  if lyrics:
    return lyrics["lyrics"]
  elif track:
    lyrics = lyricsByTrackId(trackId)
    return lyrics
  else: 
    return "no track"
  
def lyricsFromDB(trackId):
  lyrics = find.lyricsFinder(trackId)
  return lyrics

def lyricsByTrackId(trackId):
  lyrics = False
  # check if track is in db
  track = find.trackFinder(trackId)
  urlSet = getUrlList(track)
  lyrics = fetchLyricsByUrlSet(urlSet, trackId)
  return lyrics

def saveLyrics(lyrics, trackId):
  save.lyricsSaver(lyrics, trackId)

# takes set
# if set contains url then scrape lyrics
# saves lyrics to db
# return lyrics
def fetchLyricsByUrlSet(urlSet, trackId):
  lyrics = False
  for url in urlSet:
    if url:
      lyrics = Genius.scrape.lyricsUrl(url["geniusUrl"])
      if lyrics:
        save.lyricsSaver(lyrics, url["geniusUrl"], trackId)
      return lyrics

# connects track name and artist name
# then check does this combination has genius search result
def getUrlList(track):
  urlSet = []
  trackName = listHandler.track.returnName(track)
  artists = listHandler.track.returnArtists(track)
  for artist in artists:
    artistName = listHandler.artist.returnName(artist)
    url = findLyricsPage(trackName, artistName)
    urlSet.append(url)
  return urlSet

@app.route('/api/get/track', methods=['POST']) # * 
def getTrackRoute():
  requestParams = request.get_json()
  trackId = requestParams["track"]
  track = fetchTrack(trackId)
  return jsonify(track)

@app.route('/api/request/load/tracks', methods=['POST']) # *
def loadRequest():
  prettyTrackList = []
  track = []
  artist = []
  returnThisList = []
  requestParams = request.get_json()
  playlistId = requestParams["playlist"]
  trackList = find.requestFinder(playlistId)
  prettyTrackList = formatList.handleTrackRequestCursor(trackList)
  for item in prettyTrackList:
    track = find.trackFinder(item["trackId"])
    returnThisList.append(track)    
  return jsonify(returnThisList)


# route for when user want artist details
@app.route('/api/get/artist/details', methods=['POST'])
def routeArtistDetails():
  requestParams = request.get_json()
  artistId = requestParams["artist"]
  artist = checkForArtist(artistId)
  return jsonify(artist)

## fetching artist
def checkForArtist(artistId):
  artist = find.artistFinder(artistId)
  if artist:
    return artist
  else:
    return Spotify.index.initFetchArtist(artistId)


@app.route('/api/post/request/approvement', methods=['POST'])
def routeRequestApprovement():
  requestParams = request.get_json()
  trackId = requestParams["track"]
  playlistId = requestParams["playlist"]
  action = requestParams["action"]
  token = requestParams["token"]
  print(action)
  done = handleApproment(trackId, playlistId, action, token)
  save.requestSaver(trackId, playlistId, 'in-active')
  return jsonify(done)

def handleApproment(trackId, playlistId, action, token):
  print(action)
  if action == "added":
    track = find.trackFinder(trackId)
    trackUri = listHandler.track.returnUri(track)
    response = saveTrackToPlaylist(playlistId, trackUri, token, trackId)
    return response
  else:
    return "rejected"

def saveTrackToPlaylist(playlistId, uri, token, trackId):
  response = Spotify.playlist.addTrack(playlistId, uri, token) # def addTrack(playlistId, token, track, 
  return response

