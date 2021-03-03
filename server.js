const express = require("express");
const socketIO = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { v4: uuidV4 } = require('uuid');
const expressVue = require("express-vue");

const port = 5000;

var roomNumber = 1;
// var roomId;

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
    socket.join(`room-1`);
    // console.log(`Joined room-${roomId}`);
    // console.log(io);
    // console.log('Adapter: ', io.sockets.adapter);
    // let rooms = Array.from(io.sockets.adapter.rooms.keys());
    // let firstRoom = rooms[0];
    // console.log('First room: ', firstRoom);
    // roomId = firstRoom;
    // if (roomId){
    //     socket.join(roomId)
    // }

    // // console.log('Rooms?', socket.rooms);
    // // console.log('Socket ID', socket.id)
    let roomsObj = Object.fromEntries(io.sockets.adapter.rooms.entries())
    let roomCount = Array.from(io.sockets.adapter.rooms.keys()).length;
    console.log('Rooms: ', roomsObj);
    console.log('Count:', roomCount);

});

server.listen(port, () => {
    console.log("Server is listening on port 5000")
});