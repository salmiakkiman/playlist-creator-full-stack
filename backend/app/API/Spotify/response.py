# check api response
def check(response):
  try:
    if response["error"]['message']:
      return True
      # fetch refresh token from the db :)
  except:
    return False