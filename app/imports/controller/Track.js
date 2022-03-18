class Track {
  lyricsUrl = () => 'http://localhost:5000/api/get/track/lyrics'
  getTrack = () => 'http://localhost:5000/api/get/track'
  getAudioFeaturesUrl = () => 'http://localhost:5000/api/get/track/audioFeatures'
  // loadUrl = () => 'http://localhost:5000/api/get/db/lyrics'
  options = (trackId=null, action=null, playlistId=null, token=null) => {
    const options = {
      headers: {
      mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ track: trackId, action: action, playlist: playlistId, token: token }),
      credentials: 'same-origin'
    }
    return options
  }
  fetchTrack = (id) => {
    const url = this.getTrack()
    const options = this.options(id)
    return fetch(url, options)
    .then(track => track.json())
    .then(track => track)
  }
   fetchLyrics = async (id) => {
    const url = this.lyricsUrl()
    const options = this.options(id)
    return await fetch(url, options)
    .then(result => result.json())
    .then(result => result)
  }
  fetchAudioFeatures = id => {
    const url = this.getAudioFeaturesUrl()
    const options = this.options(id)
    return fetch(url, options)
    .then(track => track.json())
    .then(track => track)
  }
  handleRequestUrl = () => 'http://localhost:5000/api/post/request/approvement'
  getToken = () => sessionStorage.getItem("accessToken")
  handleRequest = (track, action, playlist) => {
    console.log(action)
    const token = this.getToken()
    const url = this.handleRequestUrl()
    const options = this.options(track, action, playlist, token)
    return fetch(url, options)
      .then(result=>result.json())
      .then(result => result)
    // console.log(options)

  }
}

export default Track;
