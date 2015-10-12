var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var serverPort = 3000;

console.log("Listening on port: " + serverPort);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(serverPort, function(){
  console.log('listening on *:' + serverPort);
});
