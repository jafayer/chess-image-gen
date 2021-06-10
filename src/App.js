import React, { Component } from 'react';
import './App.css';
import Chess from 'chess.js';

class App extends Component {
  state = {
    darkMode: false,
    whiteColor: "#81ebfd",
    blackColor: "#d24b4b",
    highlightLastMove: true

  }

  render() { 
    return (
      
      <div className="wrapper">
        <h1></h1>
        <p id="date"></p>
        <canvas width="560" height="560"
          style={{
            transform: this.state.flipped ? "rotate(180deg)" : ""
          }}
        ></canvas>
        <p id="pgn"></p>
        <div className="controls">
          <textarea id="importGame" cols="30" rows="10" placeholder="Input PGN"
            onChange={(e) => {this.handlePGN(e.target.value)}}
          ></textarea>
          <div className="row">
            <label htmlFor="whiteColor">
              White Color
              <input value={this.state.whiteColor} type="color" onChange={(e) => {this.handleOtherChange(e.target.value,'whiteColor')}}></input>
            </label>
            <label htmlFor="blackColor">
              Black color
              <input value={this.state.blackColor} type="color" onChange={(e) => {this.handleOtherChange(e.target.value,'blackColor')}}></input>
            </label>
            <label className="full">
              Dark mode?
              <label className="switch">
                <input type="checkbox" defaultChecked={this.state.darkMode} onChange={(e) => {this.handleOtherChange(e.target.checked,'darkMode')}} />
                <span className="slider round"></span>
              </label>
            </label>
            <label className="full">
              Highlight Last move?
              <label className="switch">
                <input type="checkbox" defaultChecked={this.state.highlightLastMove} onChange={(e) => {this.handleOtherChange(e.target.checked,'highlightLastMove')}} />
                <span className="slider round"></span>
              </label>
            </label>
          </div>
        </div>
      </div>
    );
  }

  chess = new Chess();

  files = {
    a:0,
    b:1,
    c:2,
    d:3,
    e:4,
    f:5,
    g:6,
    h:7
}

squareColors = {
  normal: {
    darkSquare: "#888",
    lightSquare: "#eee"
  },
  dark: {
    darkSquare: "#000",
    lightSquare: "#4a4a4a"
  }
}

  componentDidMount = () => {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.square = this.canvas.width/8;
    this.ctx.lineWidth = this.square*0.065;
    this.ctx.lineCap = "round";

    this.fillBoard();

    document.chess = this.chess;

  }

  fillBoard = () => {
    let rank = 1;
    while(rank < 9) {
        let file = 0;
        while(file < 8) {
            if(rank % 2 !== 0) {
                if(file % 2 === 0) {
                    this.ctx.fillStyle = this.state.darkMode ? this.squareColors.dark.darkSquare : this.squareColors.normal.darkSquare;
                    this.ctx.fillRect(file*this.square,this.canvas.height-(this.square*rank),this.square,this.square);
                } else {
                    this.ctx.fillStyle = this.state.darkMode ? this.squareColors.dark.lightSquare : this.squareColors.normal.lightSquare;
                    this.ctx.fillRect(file*this.square,this.canvas.height-(this.square*rank),this.square,this.square);
                }
            } else {
                if(file % 2 !== 0) {
                    this.ctx.fillStyle = this.state.darkMode ? this.squareColors.dark.darkSquare : this.squareColors.normal.darkSquare;
                    this.ctx.fillRect(file*this.square,this.canvas.height-(this.square*rank),this.square,this.square);
                } else {
                    this.ctx.fillStyle = this.state.darkMode ? this.squareColors.dark.lightSquare : this.squareColors.normal.lightSquare;
                    this.ctx.fillRect(file*this.square,this.canvas.height-(this.square*rank),this.square,this.square);
                }
            }
            file++;
        }
        rank++;
    }
}

drawPath = (from,to,color) => {

  this.ctx.beginPath();

  this.ctx.strokeStyle = (color === 'w' ? this.state.whiteColor : this.state.blackColor);
  this.ctx.moveTo(from.x,from.y);
  this.ctx.lineTo(to.x,to.y);
  this.ctx.stroke();
}

updateBoard = () => {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  this.fillBoard();
  
  const history = this.chess.history({verbose:true});

  let moves = [];

  history.forEach(move => {
    let fromTo = {
        from: move.from,
        to: move.to,
        color: move.color
    }
    let addTo = [];
    addTo.push(fromTo);

    moves = moves.concat(addTo);

  });

  moves.forEach((move,i) => {
      let from = move.from;
      let to = move.to;
      
      let fromFile = from[0];
      let fromRank = parseInt(from[1])-1;
      let fromFileNum = this.files[fromFile];
      
      let fromCoords = {
          x: (this.square/2)+(this.square*fromFileNum),
          y: this.canvas.height-this.square/2 - (this.square*fromRank)
      }

      let toFile = to[0];
      let toRank = parseInt(to[1])-1;
      let toFileNum = this.files[toFile];

      let toCoords = {
          x: (this.square/2)+(this.square*toFileNum),
          y: this.canvas.height-(this.square/2) - (this.square*toRank)
      };
      
      this.drawPath(fromCoords,toCoords,move.color);

      if(i === moves.length-1 && this.state.highlightLastMove) {
        this.ctx.beginPath();
        this.ctx.arc(toCoords.x,toCoords.y,this.square/8,0,2*Math.PI);
        this.ctx.stroke();
      }
  });
  

  let h1 = document.querySelector('h1');
  let header = this.chess.header();

  let pgn = "";
  (this.chess.history()).forEach((t,i) => {
      if(i % 2 === 0) {
          pgn += ("<b>" + (Math.ceil(i/2)+1) + ".</b>&nbsp;");
      }
  
      pgn += t + " ";
  });
  pgn.trim();

  const pgnPlace = document.querySelector('#pgn');
  pgnPlace.innerHTML = pgn;

  if(header.White && header.Black) {
      h1.innerHTML = `${header.White} vs ${header.Black}${header.Result ? " <span class='score'>" + header.Result + "</span>": ""}`;

      if(header.Date) {
          let date = document.querySelector('#date');
          date.innerText = `${header.Date}`;
      }
  }
}

handlePGN = (value) => {
    const res = this.chess.load_pgn(value);

    if(res) {
      this.setState({
        pgn: value
      }, () => {
        this.updateBoard();
      });
    }
  }

  handleOtherChange = (value,target) => {
    this.setState({
      [target]: value
    }, () => {
      this.updateBoard();
    });
  }
}
 
export default App;

/** The Reacty Way
 * Accept PGN input and load it into this.chess, then this.state.pgn to value
 * In callback, call this.drawLines(), which should operate agnostic to input so you can call it whenever ANYTHING changes (colors or PGN).
 * 
 * Sample 
 */