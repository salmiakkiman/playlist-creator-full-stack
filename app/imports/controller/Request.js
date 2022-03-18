class Request {
  urlPost = () => 'http://localhost:5000/api/request/add'
  urlLoadTracks = () => 'http://localhost:5000/api/request/load/tracks'
  loadOptions = (playlistId) => {
    const options = {
      headers: {
        mode: 'no-cors',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ playlist: playlistId }),
        credentials: 'same-origin'
      }
      return options
  }
  loadRequest = (playlistId) => {
    const options=this.loadOptions(playlistId)
    const url=this.urlLoadTracks()
    return fetch(url, options)
      .then(result => result.json())
      .then(result => result)
  }
  options = (trackId, playlistId) => {
    const options = {
      headers: {
      mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ track: trackId, playlist: playlistId, status: 'active' }),
      credentials: 'same-origin'
    }
    return options
  }
  postRequest = (trackId, playlistId) => {
    // console.log(trackId, playlistId)
    const url = this.urlPost()
    const options = this.options(trackId, playlistId)
    return fetch(url, options)
    .then(result => result.json())
    .then(result => {
      // console.log(result)
      return result
    })
  }
  handleSelected = (playlistId, selected) => {
    return selected.map(track=> this.postRequest(track.id, playlistId))
  }
  countUrl = id => 'http://localhost:5000/api/request/load/count'
  loadCountOfRequest = (id) => {
    // console.log('proceding', id)
    const url = this.countUrl()
    const options = this.loadOptions(id)
    return fetch(url, options)
    .then(result => result.json())
    .then(result => result)
  }

}

export default Request