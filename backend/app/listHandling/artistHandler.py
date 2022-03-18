def spotifyArtist(artist):
  
  artist = {
    "id": artist["id"],
    "name": artist["name"],
    "uri": artist["uri"],
    "images": artist["images"],
    "genres": artist["genres"]
  }
  return artist
