"""
  elements that are available 
  https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
"""

def returnAlbum(track):
  return track["album"]

def returnArtists(track):
  return track["artists"]

def returnDurationMs(track):
  return track["duration_ms"]

def returnExplicit(track):
  return track["explicit"]

def returnHref(track):
  return track["href"]

def returnId(track):
  return track["id"]

def returnRestrictions(track):
  return track["restrictions"]

def returnName(track):
  return track["name"]

def returnPopularity(track):
  return track["popularity"]

def returnPreviewUrl(track):
  return track["preview_url"]

def returnUri(track):
  return track["uri"]