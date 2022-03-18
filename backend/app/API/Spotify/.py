# import requests
# import base64
# import json
# from flask import Flask, redirect, request


# # 21.01.2020
# # spotify login 
# # RETURNS URL TO FETCH authorize code from spotify API
# def login(client_id, rediect_uri):
#   ## login page spotifylle
#   # ei toimi tällä hetkelä
#   SCOPE = ('user-read-private%20'+
#           'user-read-email%20' +
#           'playlist-read-collaborative%20' +
#           'playlist-read-private%20' +
#           'playlist-modify-public%20' +
#           'playlist-modify-private')

#   url= ("https://accounts.spotify.com/authorize" 
#         "?response_type=code"
#         "&client_id=" + client_id +
#         "&redirect_uri=" + rediect_uri + 
#         "&scope=" + SCOPE)# + SCOPE)
#   return url

# def createHeaders():
#   # create correct header & params
#   to_encode = CLIENT_ID + ":" + CLIENT_SECRET
#   base64_encoded_id_secret = base64.b64encode(to_encode.encode()).decode()
#   headers = {
#     'Content-Type': 'application/x-www-form-urlencoded',
#     'Authorization': 'Basic {}'.format(base64_encoded_id_secret)
#   }

# # fetch user data
# # TODO: get token from spotify
# # Current state: NOT WORKING
# # 21.1.2020
# def getToken(responseCode, CLIENT_ID, CLIENT_SECRET, URI, methods=["GET", "POST"]):
#   # define url for token poll
#   url="https://accounts.spotify.com/api/token"
#   code = request.args.get("code")
  
  
#   # create correct header & params
#   to_encode = CLIENT_ID + ":" + CLIENT_SECRET
#   base64_encoded_id_secret = base64.b64encode(to_encode.encode()).decode()
#   headers = {
#     'Content-Type': 'application/x-www-form-urlencoded',
#     'Authorization': 'Basic {}'.format(base64_encoded_id_secret)
#   }
#   params = {'grant_type': "authorization_code", "code": responseCode, "redirect_uri": URI}

#   # fetch access token
#   responseSpotifyAPI = requests.post(url, headers=headers, params=params)
#   responseSpotifyAPI = responseSpotifyAPI.json()
#   return responseSpotifyAPI


# # created this funciton to test if access token can be refresh
# # returns now 401 'invalid access token'
# #  neeeds to be fixed
# def getNewToken(refresh, CLIENT_ID, CLIENT_SECRET):
#   url="https://accounts.spotify.com/api/token"
  
#   # create correct header & params
#   to_encode = CLIENT_ID + ":" + CLIENT_SECRET
#   base64_encoded_id_secret = base64.b64encode(to_encode.encode()).decode()
#   headers = {
#     'Content-Type': 'application/x-www-form-urlencoded',
#     'Authorization': 'Basic {}'.format(base64_encoded_id_secret)
#   }
#   params = { 'grant_type': "refresh_token", "refresh_token": refresh }

#   responseSpotifyAPI = requests.post(url, headers=headers, params=params)
#   responseSpotifyAPI = responseSpotifyAPI.json()
#   return responseSpotifyAPI