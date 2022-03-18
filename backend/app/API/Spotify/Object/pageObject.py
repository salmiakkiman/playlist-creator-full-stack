# these elements are in spotify paging object
# can be used when fethicn list of playlists or playlist's tracks
def returnHref(object):
  return object["href"]

def returnItems(object):
  return object["items"]

def returnLimit(object):
  return object["limit"]

def returnNext(object):
  return object["next"]

def returnOffset(object):
  return object["offset"]

def returnPrevious(object):
  return object["previous"]

def returnTotal(object):
  return object["total"]

def test():
  print('testi testi')