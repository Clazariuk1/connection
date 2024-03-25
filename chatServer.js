// LAZARIUK TESTING GROUNDS FOR LIVE CHAT FUNCTIONALITY.
// MUST GO THROUGH THE PACES OF NPM I CORS AND SOCKET.IO   // (and yes you do need to add the period when summoning package)
// there must be a clientServer folder, parallel to the serverfile.


// am I going to have to change 'username' to the actual user.id? How do I point toward user.name?
// you need to make sure that the chat server is complete and allows for external applications to touch it. (cors) you must ensure you're using cors.

const express = require("express")
const app = express()
const http = require("http")
const socketio = require("socket.io")
const path = require('path')
const cors = require("cors");
const httpserver = http.CreateServer(app) // is this correct or does this need to be .createServer?
const io = socketio(httpserver)

// must check if http.server has been updated since 2021 in node js docs.
// how do we populate the messages array correctly with received/sent messages? Am I correct in my interpretation?
// my server is not alive, what am I missing?


app.use(cors()); // Arthur did not ultimately need cors in his script. What's vital about this middleware?

httpserver.listen(3012, () => {
  console.log('Sock it to me!')
})

const rooms = []
const usernames = []

// below: original template code, must follow arthur example instead
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

io.on('connection', function(socket){
  console.log('Please work, please I am begging you.')
})

io.on('connection', function(socket){
  socket.on('join_room', function(room, username){
    if (username != ""){
      rooms[socket.id] = room
      usernames[socket.id] = username
      socket.leaveAll()
      socket.join(room)
      io.in(room).emit('receive', 'Server: ' + username + 'has entered the chat.')
      socket.emit('join_room', room)
    }
  })
  socket.on('send_message', function(message){
    io.in(rooms[socket.id]).emit('receive', usernames[socket.id] + ' : ' + message)
  })
  socket.on('receive_message', function(message){
    socket.emit('receive', message)
  })
})
