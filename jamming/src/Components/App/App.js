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
    playlistTracks: [{name: 'track1', album:'album1', artist:"artist1", id:4},
    {name: 'track2', album:'album2', artist:"artist2", id:5},
    {name: 'track3', album:'album3', artist:"artist3", id:6}]
    }
    //binds current value of this to addTrack()
    this.addTrack=this.addTrack.bind(this)
  }
  addTrack(track){
    let playlistTracks=this.state.playlistTracks;
      if(playlistTracks.find(playlistTrack=>playlistTrack.id===track.id)){
       return;
      }
      playlistTracks.push(track)
      //set the state after adding a song
      this.setState({playlistTracks:playlistTracks})
  }
  render(){
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
        <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
        </div>
      </div>
    </div>
  );

  }
}
export default App;
