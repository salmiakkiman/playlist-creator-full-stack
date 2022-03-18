class Artist {
  url = () => 'http://localhost:5000/api/get/artist/details'
  options = (id) => {
    const options = {
      headers: {
      mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ artist: id }),
      credentials: 'same-origin'
    }
    return options
  }
  fetchArtist = (id) => {
    
    const url = this.url()
    const options = this.options(id)
    return fetch(url, options)
    .then(result => result.json())
    .then(result => result)
  }
}

export default Artist