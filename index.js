var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000, function(){
  console.log("Server is running.");
});

app.use(express.static('public'));

var io = socket(server);

var listusers = 0;
// if(socket.id not in listusers){
//   listusers.push(socket.id);
// }

io.on('connection', function(socket){
  console.log("Server Chat start.", socket.id);

  listusers += 1;
  socket.on('chat', function(data){
      console.log(data.message);

      io.sockets.emit('chat', data , listusers);
  });

  socket.on('typing', function(data){
      io.sockets.emit('typing', data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    listusers -= 1;
  });
});
