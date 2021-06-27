const path = require('path');
const fs = require('fs');
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const { Chess } = require('chess.js');
const { createCanvas, loadImage } = require('canvas');
const generator = require('../generator');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



const db = new sqlite3.Database('./db/games.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        console.error(err.message);
    }

    console.log("connected to the database");
});

createTable = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS chess_games(
        ID text UNIQUE,
        Pgn text,
        WhiteColor text,
        BlackColor text,
        DarkMode integer,
        HighlightLastMove integer)`);
    }, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`Successfully created table!`);
        }
    });
}

insertEntry = (pgn,whiteColor,blackColor,darkMode,highlightLastMove, callback) => {
    let id = createRandomID(6);
    const params = {
        $id: id,
        $pgn: pgn,
        $whiteColor: whiteColor,
        $blackColor: blackColor,
        $darkMode: darkMode,
        $highlightLastMove: highlightLastMove
    };

    db.run(`INSERT INTO chess_games(ID,Pgn,WhiteColor,BlackColor,DarkMode,HighlightLastMove)
            VALUES ($id,$pgn,$whiteColor,$blackColor,$darkMode,$highlightLastMove)`,
            params, (err) => {
                if(err) {
                    if(err.errno == 19) {
                        console.warn(`Whoops, that's not unique! Trying that again:`);
                        insertEntry(pgn,whiteColor,blackColor,darkMode,highlightLastMove);
                    } else {
                        console.log(err);
                    }
                } else {
                    console.log(`Inserted ${id} into db!`);
                    callback(id);
                }
            });
}

createRandomID = (len) => {
    const dictionary = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`;
    
    let str = "";
    for(let i = 0; i < len; i++) {
        str+= dictionary[Math.floor(Math.random()*dictionary.length)]
    }
    return str;
}

// insertEntry('fasf','#eee','#fff',0,1,(id) => {console.log(id)});

// db.run(`DROP TABLE chess_games`, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("dropped table!");
//     }
// });

// db.each(`SELECT ID,pgn,whiteColor,blackColor,DarkMode,HighlightLastMove FROM chess_games`,(err,rows) => {
//     if(err){
//         console.log(err);
//     }

//     console.log(rows);
// });

const lookup = (id,callback,failure) => {

    const sql = `SELECT ID,Pgn,whiteColor,blackColor,DarkMode,HighlightLastMove FROM chess_games WHERE ID=$id`;
    db.get(sql,{$id: id},(err,row) => {
        if(err) {
            console.warn(err);
        } else {
            if(row === undefined) {
                failure();
            } else {
                let res = {};
                console.log(`Found game with ID ${id}`);
                res.id = row.ID;
                res.pgn = row.Pgn;
                res.whiteColor = row.WhiteColor;
                res.blackColor = row.BlackColor;
                res.darkMode = row.DarkMode;
                res.highlightLastMove = row.HighlightLastMove;
                callback(res);
            }
        }
    });
}

app.get('/game/:id',(req,res) => {
    let gameID = req.params.id;
    lookup(gameID, (row) => { //callback
        console.log('Sending game to client!');
        res.json(row);
    }, () => { //failure
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send({'err': 'Game not found!'});
    });
})

app.get('/image/:id/:size?', (req,res) => {
    let gameID = req.params.id;
    let size = req.params.size;
    lookup(gameID, (row) => { //callback
        try {
            const chess = new Chess();
            chess.load_pgn(row.pgn);

            const canvas = createCanvas((size ? parseInt(size) : 1500), (size ? parseInt(size) : 1500));
            const ctx = canvas.getContext('2d');

            generator.updateBoard(ctx,chess,canvas,row.whiteColor,row.blackColor,row.darkMode,row.highlightLastMove);

            res.setHeader('Content-Type', 'image/png');
            canvas.pngStream().pipe(res);
        } catch (e) {
            console.log(e);
        }

    }, () => { //failure
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send({'err': 'Game not found!'});
    });

});

app.post('/add', (req,res) => {
    let p = req.body;
    console.log("We got a request!");

    if(p.pgn && p.whiteColor && p.blackColor && p.darkMode !== undefined && p.highlightLastMove !== undefined ){
        try {
            insertEntry(p.pgn,p.whiteColor,p.blackColor,p.darkMode,p.highlightLastMove, (entryID) => {
                console.log(entryID);
                let responseBody = {id: entryID};
                res.status(200).json(responseBody); 
            });
        } catch (e) {
            console.log(e);
            res.status(520).send('An error occurred');
        }
    } else {
        console.log('not enough info!');
        res.status(520).send('An error occurred');
    }
});


app.get('/:gameID?', (req,res) => {

    console.log('well we tried');
    const gameID = req.params.gameID;
    let title = 'Nf6.io: Free chess art';
    let description = 'An artsy diagram based on a game of chess!';
    let image = 'https://nf6.io/image/2FuFNi/300';
    let url = 'https://nf6.io/';

    if(gameID) {
        lookup(gameID, (row) => { //callback
            
            const chess = new Chess();
            chess.load_pgn(row.pgn);

            let headers = chess.header();
            let white = headers.White;
            let black = headers.Black;

            if(white && black) {
                title = `${white} vs ${black}`;
                description = `An artsy chess diagram based on a game between ${white} and ${black}`;
            }

            image = 'https://nf6.io/image/' + gameID + '/300';
            url = 'https://nf6.io/' + gameID;
  
        }, () => { //failure
        });
    }
    
    const indexFile = path.resolve('../build/index.html');
    fs.readFile(indexFile,'utf8', (err,data) => {
        if(err) {
            console.log('Yikes! ',err);
            res.status(500).send('Yikes, that sucks!');
        }
        
        return res.send(
            data.replace(/__TITLE__/g, title)
            .replace(/__DESCRIPTION__/g,description)
            .replace(/__IMAGE__/g,image)
            .replace(/__URL__/g,url)
        );
    })

});


app.use(express.static('../build'));

createTable();
app.listen(2477);
console.log('listening on 2477');