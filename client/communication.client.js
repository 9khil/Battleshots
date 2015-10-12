
var socket = require('socket.io-client')('http://localhost:3000');
  socket.on('connect', function(){
    console.log("Connected to server!");
  });
  socket.on('event', function(data){
    console.log("event: ");
    console.log(data);
  });
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
