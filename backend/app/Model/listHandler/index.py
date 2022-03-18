from .spotifyObjects import *


# chose only user created playlists
# items = playlists
# item = single playlist object

def returnUserOwnedItems(items, userId):
  userPlaylist = []
  for item in items:
    owner = playlist.returnOwner(item)
    ownerId = user.returnId(owner)
    if ownerId == userId:
      userPlaylist.append(item)
  return userPlaylist


"""
  in playlist there is element items which contains arrays.
  these arrays contain element track which is the track in playlist
"""
def getTracksFast(itemSet):
  trackList = []
  for item in itemSet:
    simpleTrack = playlist.returnTrack(item)
    trackList.append(simpleTrack)
  return trackList

def handleArtistItemSet(itemSet):
  artistList = []
  for item in itemSet:
    artists = track.returnArtists(item)
    artistList.append(artists)
  return artistList

def simplifyTrack(track):
  print(track)
  artistIDlist = []
  trackId = track.returnId(track)
  name = track.returnName(track)
  artists = track.returnArtists(track)
  for artist in artists: 
    print(artist["id"])
    artistIDlist.append(artist["id"])
  uri = track.returnUri(track)
  return {"name": name, "id": trackId, "artists": artistIDlist, "uri": uri}


def simplifyArtist(artist):
  print(artist)
  artistId = artist.returnId(artist)
  name = artist.returnName(artist)
  genres = artist.returnGenres(artist)
  uri = artist.returnUri(artist)
  return {"id": artistId, "name": name, "genres": genres, "uri": uri}