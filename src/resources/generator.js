const fillBoard = (darkMode,ctx,canvas) => {

    const square = canvas.width/8;
    ctx.lineWidth = square*0.065;
    ctx.lineCap = "round";

    let rank = 1;
    while(rank < 9) {
        let file = 0;
        while(file < 8) {
            if(rank % 2 !== 0) {
                if(file % 2 === 0) {
                    ctx.fillStyle = darkMode ? squareColors.dark.darkSquare : squareColors.normal.darkSquare;
                    ctx.fillRect(file*square,canvas.width-(square*rank),square,square);
                } else {
                    ctx.fillStyle = darkMode ? squareColors.dark.lightSquare : squareColors.normal.lightSquare;
                    ctx.fillRect(file*square,canvas.width-(square*rank),square,square);
                }
            } else {
                if(file % 2 !== 0) {
                    ctx.fillStyle = darkMode ? squareColors.dark.darkSquare : squareColors.normal.darkSquare;
                    ctx.fillRect(file*square,canvas.width-(square*rank),square,square);
                } else {
                    ctx.fillStyle = darkMode ? squareColors.dark.lightSquare : squareColors.normal.lightSquare;
                    ctx.fillRect(file*square,canvas.width-(square*rank),square,square);
                }
            }
            file++;
        }
        rank++;
    }
}

const updateBoard = (ctx,chess,canvas,whiteColor,blackColor,darkMode,highlightLastMove) => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fillBoard(darkMode,ctx,canvas);
    
    const history = chess.history({verbose:true});
  
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
    
    const square = canvas.width/8;

    moves.forEach((move,i) => {

        let from = move.from;
        let to = move.to;
        
        let fromFile = from[0];
        let fromRank = parseInt(from[1])-1;
        let fromFileNum = files[fromFile];
        
        let fromCoords = {
            x: (square/2)+(square*fromFileNum),
            y: canvas.width-square/2 - (square*fromRank)
        }
  
        let toFile = to[0];
        let toRank = parseInt(to[1])-1;
        let toFileNum = files[toFile];
  
        let toCoords = {
            x: (square/2)+(square*toFileNum),
            y: canvas.width-(square/2) - (square*toRank)
        };
        
        drawPath(ctx,whiteColor,blackColor,fromCoords,toCoords,move.color);
  
        if(i === moves.length-1 && highlightLastMove) {
          ctx.beginPath();
          ctx.arc(toCoords.x,toCoords.y,square/8,0,2*Math.PI);
          ctx.stroke();
        }
    });
    
}

const drawPath = (ctx,whiteColor,blackColor,from,to,color) => {

    ctx.beginPath();
    ctx.strokeStyle = (color === 'w' ? whiteColor : blackColor);
    ctx.moveTo(from.x,from.y);
    ctx.lineTo(to.x,to.y);
    ctx.stroke();

}


const files = {
    a:0,
    b:1,
    c:2,
    d:3,
    e:4,
    f:5,
    g:6,
    h:7
}

const squareColors = {
    normal: {
      darkSquare: "#888",
      lightSquare: "#eee"
    },
    dark: {
      darkSquare: "#000",
      lightSquare: "#4a4a4a"
    }
}

module.exports.updateBoard = updateBoard;
module.exports.fillBoard = fillBoard;