import React from "react";
import './TrackList.css'


class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
            <ul>
                    <li>Nina Simone Baltimore</li>
                    <li>Nina Simone Feeling Good</li>
                    <li>Nina Simone I wish I knew</li>
            </ul>
            </div>
        )
    }
}

export default TrackList;