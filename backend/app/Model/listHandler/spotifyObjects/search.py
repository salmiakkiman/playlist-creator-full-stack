"""
  https://developer.spotify.com/documentation/web-api/reference/search/search/
"""

def returnItems(search):
  return search["items"]

def returnResult(search):
  return search["result"]

def returnTracks(search):
  return search["tracks"]