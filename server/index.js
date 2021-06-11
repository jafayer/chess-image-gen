const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');


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
        HighlightLastMove)`);
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
    db.run(`INSERT INTO chess_games
            VALUES ('${id}','${pgn}','${whiteColor}','${blackColor}','${darkMode}','${highlightLastMove}')`, (err) => {
                if(err) {
                    if(err.errno == 19) {
                        console.warn(`Whoops, that's not unique! Trying that again:`);
                        insertEntry(pgn,whiteColor,blackColor,darkMode,highlightLastMove);
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

createTable();
// insertEntry('fasf','#eee','#fff',0,1);

// db.run(`DROP TABLE chess_games`, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("dropped table!");
//     }
// });

db.each(`SELECT ID,pgn,whiteColor,blackColor,DarkMode,HighlightLastMove FROM chess_games`,(err,rows) => {
    if(err){
        console.log(err);
    }

    console.log(rows);
});

const app = express();

app.get('/', (req,res) => {
    let params = req.query;
    console.log(params);

    if(params.pgn && params.whiteColor && params.blackColor && params.darkMode && params.highlightLastMove ){
        try {
            insertEntry(params.pgn,params.whiteColor,params.blackColor,params.darkMode,params.highlightLastMove, (entryID) => {
                console.log(entryID);
                res.status(200).send({id: entryID});
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

app.listen(8000);
console.log('listening on 8000');