"use strict"

let players = [];
const who = (id)=>{
  for (let i=0; i<players.length; i++){
    if (players[i]===id)
      return i;
  }
};
let gameProgress = false;
let board = new Array(9);
let turn = 0;
const gameOver = ()=>{
  for (let i=0;i<=2;i++){
    if (board[i]===board[i+3] && board[i]===board[i+6] &&
      (board[i]!=undefined && board[i+3]!=undefined) && board[i+6]!=undefined){
        console.log(board[i]+" won");
        io.to(players[board[i]]).emit("win");
        players.splice(board[i],1);
        io.to(players[0]).emit("lose");
        return;
      }
    else if ((board[i*3]===board[(i*3)+1] && board[i*3]===board[(i*3)+2]) &&
      (board[i*3]!=undefined && board[(i*3)+1]!=undefined) && board[(i*3)+2]!=undefined){
        console.log(board[i*3]+" won");
        io.to(players[board[i*3]]).emit("win");
        players.splice(board[i*3],1);
        io.to(players[0]).emit("lose");
        return;
      }
  }
  if (board[0]===board[4] && board[0]===board[8] && board[0]!=undefined &&
    board[4]!=undefined && board[8]!=undefined){
    console.log(board[0]+" won");
    io.to(players[board[0]]).emit("win");
    players.splice(board[0],1);
    io.to(players[0]).emit("lose");
    return;
  }
  else if (board[2]===board[4] && board[2]===board[6] && board[2]!=undefined &&
    board[4]!=undefined && board[6]!=undefined){
      console.log(board[4]+ " won");
      io.to(players[board[4]]).emit("win");
      players.splice(board[4],1);
      io.to(players[0]).emit("lose");
      return;
  }
  for (let i=0; i<9; i++){
    if (board[i]===undefined){
      return;
    }
  }
  console.log("Draw.");
  io.sockets.emit("draw");
};
const io = require('socket.io').listen("8080");
io.on("connection", (socket)=>{
  if (players.length < 2){
    console.log("A new player connected to the game.");
    players.push(socket.id);
    io.emit("inQueue");
  }
  if (players.length===2 && !gameProgress){
    gameProgress = true;
    console.log("Game has started.");
    io.emit("gameStart");
  }
  socket.on("fieldPressed", (n)=>{
    let sender = who(socket.id);
    if (sender === turn){
      if (board[n-1]===undefined){
        board[n-1]=sender;
        console.log(board);
        turn = (turn+1)%2;
        io.emit("boardUpdate", board);
        gameOver();
      }
    }
  });
  socket.on("disc", ()=>{
    console.log(socket.id+ "Disconnected from server.");
    board = new Array(9);
    io.emit("boardUpdate", board);
    socket.disconnect();
    players = [];
    gameProgress = false;
  });
});
