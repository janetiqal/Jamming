import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify'
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
    this.removeTrack=this.removeTrack.bind(this)
    this.updatePlaylistName=this.updatePlaylistName.bind(this)
    this.savePlaylist= this.savePlaylist.bind(this)
    this.search= this.search.bind(this)

  }
  addTrack(track){
    let playlistTracks=this.state.playlistTracks;
      if(playlistTracks.find(playlistTrack=>playlistTrack.id===track.id)){
       return;
      }
      playlistTracks.push(track)
      //set the state after adding a song
      this.setState({playlistTracks: playlistTracks})
  }
  removeTrack(track){
    let tracks=this.state.playlistTracks;
    tracks = tracks.filter(playlisttrack=> playlisttrack.id !== track.id)
    
    this.setState({playlistTracks:tracks})
  }

  updatePlaylistName(newName){
    this.setState({playlistName:newName})
  }

  savePlaylist(){
    const trackURIs= this.state.playlistTracks.map(track=> track.uri)
  }
  search(term){
    //update search results from the spotify searchs' promise
    Spotify.search(term).then(searchResults=>{this.setState({searchResults: searchResults})})
  }
  
  render(){
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar  onSearch={this.search}/>
        <div className="App-playlist">
        <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
      </div>
    </div>
  );

  }
}
export default App;
