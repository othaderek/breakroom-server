const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { v4: uuidV4 } = require('uuid');
const expressVue = require("express-vue");

const port = 5000;

console.log(server.getMaxListeners());

const io = socketIO(server, {
    cors: {
      origin: "http://localhost:8080",
      credentials: true
    },
    allowEIO3: true 
});

app.get('/', (req, res) => {
    // res.redirect(`/${uuidV4()}`);
    // Checks connected clients to server.
});

// app.get('/:room', (req, res) => {
//     const roomId = req.params.room
//     res.send('room', roomId);
// })

io.on("connection", socket => {
    console.log("socket connecting..")

    socket.on('mounted', data => { 
        console.log('data: ', data);
        console.log('connected clients: ', io.sockets.adapter.rooms);
        io.emit('test');
    });

    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId);
    })

});

server.listen(port, () => {
    console.log("Server is listening on port 5000")
});