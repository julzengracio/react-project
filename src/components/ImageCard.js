import React, {Component} from 'react';

class ImageCard extends Component {
    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div>
                    <img alt={this.props.alt} src={this.props.src} />
                </div>
            </div>
        )
    }
}

export default ImageCard;