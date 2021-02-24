const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
const server = require('http').createServer(app);

const port = 5000;

const io = socketIO(server, {
    cors: {
      origin: "http://localhost:8080",
      credentials: true
    },
    allowEIO3: true 
});

app.get('/', (req, res) => {
    res.send('Connecting to chat room...')
});

io.on("connection", socket => {
    console.log("socket connected")
    socket.on('mounted', data => { 
        console.log('data: ', data)
        io.emit('test');
    });
});

server.listen(port, () => {
    console.log("Server is listening on port 5000")
});