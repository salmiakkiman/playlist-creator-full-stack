"""
 elements that are available
 https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
"""
def returnName(playlist):
  return playlist["name"]

def returnId(playlist):
  return playlist["id"]

def returnImages(playlist):
  return playlist["images"]

def returnDescription(playlist):
  return playlist["description"]

def returnHref(playlist):
  return playlist["href"]

def returnPublic(playlist):
  return playlist["public"]

# track is inside in items
def returnTrack(playlist):
  return playlist["track"]

# collection of tracks
def returnItems(playlist):
  return playlist["items"]

def returnSnapshot(playlist):
  return playlist["snapshot_id"]

def returnUri(playlist):
  return playlist["uri"]

def returnOwner(playlist):
  return playlist["owner"]

def returnTotal(playlist):
  return playlist["tracks"]["total"]


