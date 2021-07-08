import React, { Component } from 'react';
import './App.css';
import Chess from 'chess.js';
import generator from './resources/generator';


class Recents extends Component {
    state = {  }
    render() { 
        return (
            <div className="recents">
                <h1>Recent Games</h1>
                <h2>Recently viewed</h2>
                <div className="cardContainer">
                    {this.state.viewed && JSON.parse(this.state.viewed).map(game => this.cardTemplate(game))}
                </div>
                <h2>Recently created</h2>
                <div className="cardContainer">
                    {this.state.created && JSON.parse(this.state.created).map(game => this.cardTemplate(game))}
                </div>
            </div>
        );
    }

    cardTemplate = (game) => {
        const chess = new Chess();
        chess.load_pgn(game.pgn);
        const headers = chess.header();
        let description = 'An artsy diagram based on a game of chess!';
        if(headers.White && headers.Black) {
            description = `An artsy chess diagram based on a game between ${headers.White} and ${headers.Black}`;
        }

        return (
            <div className="card" key={game.id}>
                <a href={"https://nf6.io/" + game.id}>
                <h3>{`${(headers.White && headers.Black ? `${headers.White} vs ${headers.Black}` : `No title`)}`}</h3>
                <img src={"https://nf6.io/image/" + game.id + "/300"} alt={description} />
                </a>
            </div>
        )
    }

    componentDidMount = () => {
        let localViewed = window.localStorage.getItem('viewed');
        let localCreated = window.localStorage.getItem('created');

        this.setState({
            viewed: localViewed,
            created: localCreated
        });
    }
}
 
export default Recents;