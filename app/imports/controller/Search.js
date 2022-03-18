class Search {
  url = () => 'http://localhost:5000/api/get/track/search'
  options = (keyword) => {
    const options = {
      headers: {
      mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ keyword: keyword }),
      credentials: 'same-origin'
    }
    return options
  }
  fetchSearch = (keyword) => {
    const url = this.url()
    const options = this.options(keyword)
    return fetch(url, options)
    .then(result => result.json())
    .then(result => result)
  }
}

export default Search