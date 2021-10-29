import React from "react";
import './TrackList.css'

import Track  from "../Track/Track";
//map over the tracks here, then pass it to tracks.js to display the information 
class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
            {this.props.tracks.map(track => <Track track={track}
                     key={track.id} />)}
            </div>
        )
    }
}

export default TrackList;