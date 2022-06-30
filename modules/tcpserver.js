const socketModule = require('./socket');

// Include Nodejs' net module.
const Net = require('net');
const EventEmitter = require('node:events')

// The port on which the server is listening.
const port = 8080;

// variables used for events
let ear = Boolean(false);
let magX = 0;
let magY = 0;
let present = false;

let sockets = []

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();
exports.emitter = new EventEmitter();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection', function(socket) {
    sockets.push(socket);
    console.log('A new connection has been established.');

    // TCP connection established, the server can send data to
    // the client by writing to its socket.
    //socket.write('Hello, client.');

    // The server receives data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        let incoming = chunk.toString().toLowerCase();
        console.log(`Data received from client: ${incoming}`);

        //ear boolean is set
        if (incoming.includes('e')){
            if (incoming.includes('0')){
                if (ear === true){
                    ear = false;
                    socketModule.sendEar(false);
                    this.emitter.emit('EarToFalse')
                }
            }else{
                if (ear === false) {
                    ear = true;
                    socketModule.sendEar(true);
                    this.emitter.emit('EarToTrue')
                }
            }
        }
        //magnet input is set
        if (incoming.includes('m')){
            incoming = incoming.replace('m', '').split(',')
            magX = incoming[0]
            magY = incoming[1]
            if(magX.includes("-1") || magY.includes("-1")) {
                if(present) {
                    socketModule.sendPresent(false);
                    present = false;
                }
            }else{
                socketModule.sendPresent(true);
                present = true;
            }
        }
        console.log('------------------')
        console.log('Ear touched: ' + ear)
        console.log('Mag X: ' + magX + '  Mag Y: ' + magY)
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    
    socket.on('end', function() {
        console.log('Closing connection with the client');
        sockets.splice(sockets.indexOf(socket), 1);
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});

exports.setSong = id => {
    for(let i = 0; i < sockets.length; i++) {
        sockets[i].write(`S${id}\r\n`);
    }
};

exports.setSoundDose = command => {
    for(let i = 0; i < sockets.length; i++) {
        sockets[i].write(`C${command}\r\n`);
    }
};

exports.getEar = () => {
    return ear;
}

exports.getXPos = () => {
    return magX;
}

exports.getYPos = () => {
    return magY;
}

exports.getPresentStatus = () => present;