import React, { Component } from 'react';

class Controls extends Component {
    state = {  }
    render() { 
        return (
            <div className="controls">
                <textarea id="importGame" cols="30" rows="10" placeholder="Input PGN"
                            onChange={(e) => {this.props.handlePGN(e.target.value)}}
                        ></textarea>
                <div className="row">
                    <label htmlFor="whiteColor">
                    White Color
                    <input value={this.props.whiteColor} type="color" onChange={(e) => {this.props.handleOtherChange(e.target.value,'whiteColor')}}></input>
                    </label>
                    <label htmlFor="blackColor">
                    Black color
                    <input value={this.props.blackColor} type="color" onChange={(e) => {this.props.handleOtherChange(e.target.value,'blackColor')}}></input>
                    </label>
                    <label className="full">
                    Dark mode?
                    <label className="switch">
                        <input type="checkbox" defaultChecked={this.props.darkMode} onChange={(e) => {this.props.handleOtherChange(e.target.checked,'darkMode')}} />
                        <span className="slider round"></span>
                    </label>
                    </label>
                    <label className="full">
                    Highlight Last move?
                    <label className="switch">
                        <input type="checkbox" defaultChecked={this.props.highlightLastMove} onChange={(e) => {this.props.handleOtherChange(e.target.checked,'highlightLastMove')}} />
                        <span className="slider round"></span>
                    </label>
                    </label>
                </div>
                <div>
                    <button className="saveButton" onClick={this.saveToServer}>
                        Save design!
                    </button>
                </div>
            </div>
        );
    }


    saveToServer = () => {
        if(this.props.badInput || this.props.pgn === undefined) {
            return this.props.error("There was a problem with your PGN. Please try again.");
        }
        
        let saveButton = document.querySelector('.saveButton');
        saveButton.disabled = true;
        const pgn = this.props.chess.pgn();
        const whiteColor = this.props.whiteColor;
        const blackColor = this.props.blackColor;
        const darkMode = this.props.darkMode ? 1 : 0;
        const highlightLastMove = this.props.highlightLastMove ? 1 : 0;
    
        let body = {
          pgn: pgn,
          whiteColor: whiteColor,
          blackColor: blackColor,
          darkMode: darkMode,
          highlightLastMove: highlightLastMove
        }
        
        const url = 'https://nf6.io/add';
    
        const req = new XMLHttpRequest();
    
        req.open('POST',url,true);
        req.setRequestHeader('Content-Type', 'application/json');
    
        req.onload = () => {
          if(req.readyState === 4) {
            if(req.status === 200) {
              let response = JSON.parse(req.response)
              console.log(response);
              this.props.handleOtherChange(response.id,'fetchedID');
              this.props.localSetter(response,'created');
            } else {
              console.warn(`There be errors about here`);
            }
          }
        }

        req.send(JSON.stringify(body));
    }
}
 
export default Controls;