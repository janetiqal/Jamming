import React from "react";
import './Track.css'

class Track extends React.Component {
    //user sees the + or - sign
    renderAction() {
        if(this.props.isRemoval){
           return <button className="Track-action">-</button>
        }else{
           return <button className="Track-action">+</button>
        }
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>
                        {this.props.track.name}
                    </h3>
                    <p>
                    {this.props.track.artist}, {this.props.track.album}
                    </p>
                </div>
      {/* dynamic btn based on the value of isRemoval prop*/}
                {this.renderAction()}
             
            </div>
        )
    }
}

export default Track;