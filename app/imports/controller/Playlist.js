class Playlist {
  fetchUrlDetails = () => 'http://localhost:5000/api/get/playlist'
  fetchUrlTrackList = () => 'http://localhost:5000/api/get/playlist/tracks'
  setPlaylistId = id => sessionStorage.setItem("playlistId", id)
  getPlaylistId = () => sessionStorage.getItem("playlistId")
  fetchOptions = (id) => {
    return {
      headers: {
        mode: 'no-cors',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ id: id }),
      credentials: 'same-origin',
    }
  }
  fetchPlaylistDetails = (id) => {
    const url = this.fetchUrlDetails()
    const options = this.fetchOptions(id)
    return fetch(url, options)
    .then(playlist => playlist.json())
    .then(playlist =>  playlist)
  }
  fetcTrackList = (id) => {
    const url = this.fetchUrlTrackList()
    const options = this.fetchOptions(id)
    return fetch(url, options)
    .then(trackList => trackList.json())
    .then(trackList => trackList)
  }
  newPlaylistUrl = () => 'http://localhost:5000/api/playlist/create'
  newPlaylistOptions = (name, token, userId) => {
    return {
      headers: {
        mode: 'no-cors',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name: name, token: token, id: userId }),
      credentials: 'same-origin',
    }
  }
  createPlaylist = (name, token, userId) => {
    const url = this.newPlaylistUrl()
    const options = this.newPlaylistOptions(name, token, userId)
    return fetch(url, options)
    .then(response => response.json())
    .then(response => response)
  }
}

export default Playlist