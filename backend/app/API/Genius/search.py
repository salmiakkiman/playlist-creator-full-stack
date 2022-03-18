import requests

def request_song_info(songTitle, artistName):
  base_url = 'https://api.genius.com'
  headers = {'Authorization': 'Bearer ' + '98l8PIDC4-W-a-0mdwsJearHYaxYmdp-uTaqRYSS6Y-VUwlywbOBatYh0KuJ37hc'}
  search_url = base_url + '/search'
  data = {'q': songTitle + ' ' + artistName}
  response = requests.get(search_url, data=data, headers=headers)
  return response