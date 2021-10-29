import React from 'react'
import './SearchResults.css'

import TrackList from '../TrackList/TrackList'
//prop comes from the state set in App.js
    //gets passed down to Tracklist, then track
 class SearchResults extends React.Component {
    render() {
       return (
        <div className="SearchResults">
            <h2>Results</h2>
           <TrackList tracks={this.props.searchResults}  
                onAdd={this.props.onAdd}
                isRemoval={false}
           />
        </div>
        )
    }
}

export default SearchResults;