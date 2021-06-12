const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const allowedOrigins = ['https://nf6.io','http://nf6.io','https://www.nf6.io','http://www.nf6.io'];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET','POST']
}
const app = express();
app.use(cors(corsOptions));
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
            console.log("this is row:");
            console.log(row);
            console.log("this is typeof row:");
            console.log(typeof row);
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
        body = JSON.stringify(row);
        res.send(body);
    }, () => { //failure
        res.status(404).send();
    });
})

app.post('/', (req,res) => {
    let p = req.body;
    console.log("We got a request!");

    if(p.pgn && p.whiteColor && p.blackColor && p.darkMode !== undefined && p.highlightLastMove !== undefined ){
        try {
            insertEntry(p.pgn,p.whiteColor,p.blackColor,p.darkMode,p.highlightLastMove, (entryID) => {
                console.log(entryID);
                let responseBody = {id: entryID};
                res.status(200).send(JSON.stringify(responseBody)); 
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

createTable();
app.listen(2477);
console.log('listening on 2477');