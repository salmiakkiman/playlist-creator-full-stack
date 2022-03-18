class Token {
  refreshTokenUrl = () => 'http://localhost:5000/api/token/refresh'
  refreshTokenOptions = () => {

    const refreshToken = this.getRefreshToken()
    const options =  {
      headers: {
        mode: 'no-cors',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
      credentials: 'same-origin',
    }
    return options 
  }

  getAccessToken = () => sessionStorage.getItem('accessToken')  
  getRefreshToken = () => sessionStorage.getItem('refreshToken')  
  setAccessToken = (access_token) => {
    sessionStorage.setItem("accessToken", access_token)
  }
  setRefreshToken = (refresh_token) => {
    sessionStorage.setItem("refreshToken", refresh_token)
  }
  /**
   * used to decode jwt from url
   * returns token object
   */
  decode_JWT_token = jwt => {
    let token = jwt 
      ? JSON.parse(atob(jwt.split('.')[1]))
      : {access_token: null, refresh_token: null, user: null}; 
    // console.log(token.refresh_token)
    return token
  }
}

export default Token;
