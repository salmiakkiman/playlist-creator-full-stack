"""
  elements that are available
  https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
"""

def returnDisplayName(user):
  return user["display_name"]

def returnId(user):
  return user["id"]

def returnExternalUrls(user):
  return user["external_urls"]

def returnUri(user):
  return user["uri"]

def returnHref(user):
  return user["href"]