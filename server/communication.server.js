var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var serverPort = 3000;

console.log("Listening on port: " + serverPort);

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('name', function(data){

    console.log("Player name: " + data);
    console.log("Player id: " + socket.id);
    
  });

});

http.listen(serverPort, function(){
  console.log('listening on *:' + serverPort);
});
