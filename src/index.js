import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import SearchBar from "./components/search_bar";
import VideoDetail from "./components/video_detail";
import VideoList from "./components/video_list";

import { onUpdate, forceUpdate, sendEvent } from './state'

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
        sendEvent('setVideos', response.data.items)
        sendEvent('selectVideo', response.data.items[0])
      })
      .catch(error => {
        console.error(error);
      });
  }

  render () {
    return (
      <div>
        <SearchBar onSearchTermChange={this.videoSearch} />
        <VideoDetail video={this.props.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => sendEvent('selectVideo', selectedVideo)}
          videos={this.props.videos}
        />
      </div>
    )
  }
}

// When the state changes, re-render our app!
onUpdate((state) => {
  ReactDOM.render(
    <App videos={state.videos} selectedVideo={state.selectedVideo}/>,
    document.getElementById('root')
  );
});

// Trigger the initial update so our app will render for the first time.
forceUpdate();
