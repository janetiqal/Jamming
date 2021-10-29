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
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist Name',
      playlistTracks: []
    }
    //binds current value of this to addTrack()
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)

  }
  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      return;
    }
    playlistTracks.push(track)
    //set the state after adding a song
    this.setState({ playlistTracks: playlistTracks })
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(playlisttrack => playlisttrack.id !== track.id)

    this.setState({ playlistTracks: tracks })
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName })
  }

  savePlaylist() {
    //updating this to only allow a playlist w songs to be saved to Spotify
    if(this.state.playlistTracks.length){
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    //after this method has been called and fulfilled we then set the state back to being generic so we can then create another playlist and add tracks to it 
    Spotify.savePlaylist(this.state.playlistName, trackURIs);

      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        searchResults:[]
      })
    }else{
      document.querySelector('.Playlist-save').innerHTML="Add tracks to your playlist before saving."
      document.querySelector('.Playlist-save').style.backgroundColor="red";
    }
  }
  search(term) {
    //update search results from the spotify searchs' promise
    Spotify.search(term).then(searchResults => { this.setState({ searchResults: searchResults }) })

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
             onAdd={this.addTrack} 
             />
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} 
            onSave={this.savePlaylist} 
            />
          </div>
        </div>
      </div>
    );

  }
}
export default App;
