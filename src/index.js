import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import SearchBar from "./components/search_bar";
import VideoDetail from "./components/video_detail";
import VideoList from "./components/video_list";

const API_KEY = "AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss";

const axios = require('axios');

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null
    };
  }

  videoSearch = (term) => {
    const url = 'https://www.googleapis.com/youtube/v3/search';

    const params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video'
    };

    axios.get(url, { params: params })
      .then(response => {
        this.setState({
          videos: response.data.items,
          selectedVideo: response.data.items[0]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render () {
    return (
      <div>
        <SearchBar onSearchTermChange={this.videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
