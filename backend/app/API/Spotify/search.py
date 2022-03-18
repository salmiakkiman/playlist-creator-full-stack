import requests
import json


def track(keyWord, token):
  url = "https://api.spotify.com/v1/search"
  itemType = "type=track"
  limit = "50"

  url = url + "?" + "q=" + keyWord + "&" + itemType + "&" + "limit=" + limit
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  searchResult = response.content
  searchResult = json.loads(searchResult)
  return searchResult
