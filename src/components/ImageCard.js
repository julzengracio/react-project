import React, {Component} from 'react';

class ImageCard extends Component {
    render(){
        return(
            <div>
                <div className="showImage">
                    <img src={this.props.src} />
                </div>
            </div>
        )
    }
}

export default ImageCard;