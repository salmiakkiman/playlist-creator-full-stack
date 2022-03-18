import React, { Component } from 'react';
import styled from 'styled-components'

// import components
import SearchToolbar from './Search'
import TableSearchResult from './TableSearchResult'

// import controllers 
import Search from '../../../../controller/Search'

const search = new Search


class SendRequestTab extends Component {
  state = {
    keyword: null,
    searchResult: null
  }
  resetResult = () => {
    this.setState({
      searchResult: []
    })
  }
  search = () => {
    this.resetResult()
    const result = search.fetchSearch(this.state.keyword)
    result.then(result => {
      this.setState({searchResult: result})
    })
  }
  setKeyword = (e) =>{
    const keyword = e.target.value
    this.setState({keyword:keyword})
  }
  render = () => {

    return (      
      <div>
        {/* <Button variant="menu" >Send Selected </Button> */}
        <SearchToolbar
          search={this.search}
          setKeyword={this.setKeyword}
          keyword={this.state.keyword}
        />
        {this.state.searchResult && (
          <TableSearchResult
            searchResult={this.state.searchResult}
            playlistId={this.props.playlistId}
            update={this.props.update}
          />
        )}
      </div>
      )
  }
}

export default SendRequestTab