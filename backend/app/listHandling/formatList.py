# sort track result from api
# return trackName and artistName
# {trackid: 123123, trackname: sda, artistName: asdasd}
def track(itemList):
  trackList = itemList["tracks"]["items"]
  formattedTrackList = []
  for track in trackList:
    artistList = []
    for artist in track["artists"]:
      
      artistList.append({
                          "name": artist["name"], 
                          "id": artist["id"], 
                          "uri": artist["uri"] 
                        })
    trackDetails = { 
      "track": { 
        "name": track["name"], 
        "id": track["id"],
        "uri": track["uri"],
        "artist_id": track["artists"][0]["id"],
      }, 
      "artists": artistList }
    formattedTrackList.append(trackDetails)
  return formattedTrackList


# reformats array of playlist
# returns object of playlist
def handlePlaylistList(playlistRaw, userId):
  playlistLIST = []
  try:
    for iteratePlaylist in playlistRaw:
      playlist = {
        "id": iteratePlaylist["id"],
        "name": iteratePlaylist["name"],
        "ownerId": iteratePlaylist["owner"]["id"],
        "public": iteratePlaylist["public"],
        "images": iteratePlaylist["images"],
        "tracksHref": iteratePlaylist["tracks"]["href"],
        "totalTracks": iteratePlaylist["tracks"]["total"],
        "type": iteratePlaylist["type"],
        "uri": iteratePlaylist["uri"]
      }
      playlistLIST.append(playlist)
  except:
    print("Error on Handling Playlist")
    print()
  return playlistLIST


# selects only playlists which are created by the user
# returns userPlaylistSet which is the list where owner is the user
def selectPlaylistSetCreteadByUser(playlistSet, userId):
  userPlaylistSet = []
  for playlist in playlistSet["items"]:
    if playlist["owner"]["id"] == userId:
      userPlaylistSet.append(playlist)    
  return userPlaylistSet


# takes raw track list which is from spotify api
# returs array that contains track(name, id) and artist(name, id)  elements
def handleTrackList(trackListRaw):
  prettyTrackList = []
  for trackList in trackListRaw["items"]:
    track = {
      "track": {
        "name": trackList["track"]["name"],
        "id": trackList["track"]["id"],
        "uri": trackList["track"]["uri"],
      },
      "artist": {
        "name": trackList["track"]["artists"][0]["name"],
        "id": trackList["track"]["artists"][0]["id"],
        "uri": trackList["track"]["artists"][0]["uri"]
      }
    }
    prettyTrackList.append(track)
  return prettyTrackList


# takes pymongo cursor object which is polled from the db
# this is for the track requests 
def handleTrackRequestCursor(cursorObj):
  trackList = []
  for item in cursorObj:
    trackList.append(item)
  return trackList