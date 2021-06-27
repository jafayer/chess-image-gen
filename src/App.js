import React, { Component } from 'react';
import './App.css';
import Chess from 'chess.js';
import Controls from './components/controls';
import Messages from './components/messages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import generator from './resources/generator' ;

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
        {this.state.fetchedGame && this.state.white && this.state.black &&
          <h1>
            {this.state.white} vs {this.state.black}
            {this.state.result && <span className='score'>{" " + this.state.result}</span>}
          </h1>
        }
        <p id="date"></p>
        <canvas width="560" height="560"
          style={{
            transform: this.state.flipped ? "rotate(180deg)" : ""
          }}
        ></canvas>
        
        {this.state.fetchedGame &&
        <p id="pgn">{this.chess.history().map((elem,i) => {
          if(i%2 === 0) {
            return <><b>{Math.ceil(i/2)+1 + ". "}</b><>{elem + " "}</></>;
          } else {
            return <>{elem + " "}</>;
          }
        })}</p>}


        {/* let pgn = "";
        (this.chess.history()).forEach((t,i) => {
            if(i % 2 === 0) {
                pgn += ("<b>" + (Math.ceil(i/2)+1) + ".</b>&nbsp;");
            }
        
            pgn += t + " ";
        });
        pgn.trim(); */}
        {!this.state.fetchedGame &&
        <Controls
          chess={this.chess}
          handlePGN={this.handlePGN}
          handleOtherChange={this.handleOtherChange}
          fetchedID={this.state.fetchedID}
          whiteColor={this.state.whiteColor}
          blackColor={this.state.blackColor}
          darkMode={this.state.darkMode}
          highlightLastMove={this.state.highlightLastMove}
        />}
        {(!this.state.fetchedGame && !this.state.fetchingGame) && (
          <Messages
            fetchedID={this.state.fetchedID}
          />
        )}
        <ToastContainer />
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

    generator.fillBoard(this.state.darkMode,this.ctx,this.canvas);

    document.chess = this.chess;

    const path = window.location.pathname.slice(1);
    if(path) {
      console.log('fetching');
      this.setState({
        fetchingGame: true
      },() => {
        this.fetchFromServer(path);
      });
    }

  }
//
  fetchFromServer = (path) => {
    fetch('https://nf6.io/game/'+path)
    .then(res => res.json())
    .then(json => {
        if(json.err) {
          return this.error("Couldn't find a game with that ID!");
        }
        console.log(json);
        this.chess.load_pgn(json.pgn);
        let headers = this.chess.header();
        this.setState({
        fetchedGame: json,
        blackColor: json.blackColor,
        whiteColor: json.whiteColor,
        pgn: json.pgn,
        white: headers.White,
        black: headers.Black,
        result: headers.Result,
        darkMode: json.darkMode,
        highlightLastMove: json.highlightLastMove,
        fetchingGame: false,
        }, () => {
          generator.updateBoard(this.ctx,this.chess,this.canvas,this.state.whiteColor,this.state.blackColor,this.state.darkMode,this.state.highlightLastMove);
          console.log('fetched');
        });
    })
    .catch(err => {
      this.error("Couldn't find a game with that ID!");
    });
  }

handlePGN = (value) => {
    const res = this.chess.load_pgn(value);

    if(res) {
      this.setState({
        pgn: value
      }, () => {
        generator.updateBoard(this.ctx,this.chess,this.canvas,this.state.whiteColor,this.state.blackColor,this.state.darkMode,this.state.highlightLastMove);
      });
    }
  }

  handleOtherChange = (value,target,callback=null) => {
    this.setState({
      [target]: value
    }, () => {
      if(callback) {
        callback();
      }
      generator.updateBoard(this.ctx,this.chess,this.canvas,this.state.whiteColor,this.state.blackColor,this.state.darkMode,this.state.highlightLastMove);
    });
  }

  error = (message) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
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