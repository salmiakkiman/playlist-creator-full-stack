import requests
import json
import base64
from flask import current_app
# fetch user data
# 26.01.202
def getUser(token):
  url="https://api.spotify.com/v1/me"
  # print('access token ', token)
  headers = {'Authorization': 'Bearer ' + token}
  response = requests.get(url, headers=headers)
  userObjRaw = response.content
  userObj = json.loads(userObjRaw)
  return userObj


# https://developer.spotify.com/documentation/general/guides/authorization-guide/
# user login
# return access token
def loginUrl():
  rediect_uri = current_app.config['REDIRECT_URI']
  client_id = current_app.config['CLIENT_ID']
  scope = current_app.config['SCOPE']

  url= ("https://accounts.spotify.com/authorize" 
        "?response_type=code"
        "&client_id=" + client_id +
        "&redirect_uri=" + rediect_uri + 
        "&scope=" + scope)# + SCOPE)
  return url

# Get Authorization Code from 
def getToken(code):
  print(code)
  URI = current_app.config['REDIRECT_URI']
  # # define url for token poll
  url="https://accounts.spotify.com/api/token"
  # # code = request.args.get("code")
  headers = defineHeaders()  
  params = {'grant_type': "authorization_code", "code": code, "redirect_uri": URI}

  # # fetch access token
  responseSpotifyAPI = requests.post(url, headers=headers, params=params)
  responseSpotifyAPI = responseSpotifyAPI.json()
  return responseSpotifyAPI

def refreshToken(refreshToken):
  print('refreshing this.')
  url="https://accounts.spotify.com/api/token"
  # # code = request.args.get("code")
  headers = defineHeaders()  
  params = { 'grant_type': "refresh_token", "refresh_token": refreshToken }
  responseSpotifyAPI = requests.post(url, headers=headers, params=params)
  responseSpotifyAPI = responseSpotifyAPI.json()
  return responseSpotifyAPI

# define headers for access token when user is login in
def defineHeaders():
  CLIENT_ID = current_app.config['CLIENT_ID']
  CLIENT_SECRET = current_app.config['CLIENT_SECRET']
  # # create correct header
  to_encode = CLIENT_ID + ":" + CLIENT_SECRET
  base64_encoded_id_secret = base64.b64encode(to_encode.encode()).decode()
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic {}'.format(base64_encoded_id_secret)
  }
  return headers
