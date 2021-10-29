import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    //hard coding data here for now
    this.state={
      SearchResults :[
      {name: 'Baltimore', album:'single', artist:"Nina Simone", id:1},
      {name: 'Hurricane', album:'Donda', artist:"Kanye West", id:2},
      {name: 'A Case Of You', album:'Blue', artist:"Joni Mitchell", id:3}
    ],
    playlistName: 'HardCoded Playlist Name',
    playlistTracks: [{name: 'Baltimore', album:'single', artist:"Nina Simone", id:1},
    {name: 'Hurricane', album:'Donda', artist:"Kanye West", id:2},
    {name: 'A Case Of You', album:'Blue', artist:"Joni Mitchell", id:3}]
    }
  }
  render(){
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
        <SearchResults searchResults={this.state.SearchResults}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
        </div>
      </div>
    </div>
  );

  }
}
export default App;
