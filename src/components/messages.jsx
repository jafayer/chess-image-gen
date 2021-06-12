import React, { Component } from 'react';

class Messages extends Component {
    state = {  }
    render() { 
        return (
        <div className="messageContainer">
            {!this.props.fetchedID && (
                <div className="message warn">
                <span className="material-icons">warning</span>
                <p>
                    Once you press save, you'll be given a unique URL and won't be able to change your design. <strong>Copy your URL before closing the page!</strong>
                </p>
                </div>
            )}
            {this.props.fetchedID && (
                <div className="message success">
                    <p>
                    https://nf6.io/{this.props.fetchedID}
                    <button onClick={this.copyToClipboard}>
                        <span className="material-icons">content_copy</span>
                    </button>
                    </p>  
                </div>
            )}
        </div>
        );
    }

    copyToClipboard = () => {
        if(window.navigator.clipboard){
            const baseurl = "https://nf6.io/";
            const url = (baseurl+this.props.fetchedID);
            window.navigator.clipboard.writeText(url).then(() => {
                console.log(`Wrote to clipboard: ${url}`);
            });
        }
    }
}
 
export default Messages;