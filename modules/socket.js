const express = require('express');
const app = express();
const http = require('http');
const { kill } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  //Allow cross origin communication as it would otherwise be blocked by the browser.
  cors: "*",
});
const tcpSocket = require('./tcpserver');

let socket;
var passedTime;

// Open a socket to keep a connection open.
io.on('connection', (s) => {
  console.log('a user connected');
  
  s.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Listen for messages from client
  s.on('wrapped', (read) => {
    var passedTime = read;
    console.log(passedTime);
  });

  s.on('new-song', id => {
    tcpSocket.setSong(id);
  });
  
  //Store this socket to be used in other functions.
  socket = s;

});

//Function used by input.js to send the data to the client.
function send(input){
  if(!socket) return;
  socket.emit("input", input);
}

function sendEar(earStatus) {
  if(!socket) return;
  socket.emit('ear', earStatus);
}

function sendPresent(present) {
  if(!socket) return;
  socket.emit('present', present);
}

function sendSound(input){
  if(!socket) return;
  socket.emit("calulation", input);
}

function sendSoundDose(dose, command) {
  if(!socket) return;
  socket.emit("dose", dose);
  tcpSocket.setColor(command);
}

server.listen(3010, () => {
  console.log('listening on *:3010');
});

module.exports = { send, sendEar, sendPresent, sendSound };