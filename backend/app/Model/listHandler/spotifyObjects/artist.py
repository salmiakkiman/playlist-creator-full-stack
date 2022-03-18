"""
  elements for artist object by spotify
  https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
"""
def returnId(artist):
  return artist["id"]

def returnGenres(artist):
  return artist["genres"]

def returnName(artist):
  return artist["name"]

def returnUri(artist):
  return artist["uri"]

def returnImages(artist):
  print(artist)
  return artist["images"]