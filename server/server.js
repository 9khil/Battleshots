var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var serverPort = 1234,
	players = {};

server.listen(serverPort);

console.log("Listening on port: " + serverPort);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("Client connected");

  socket.emit('event', { hello: 'world' });
  socket.on('identification', function (data) {
   	if(addPlayer(data, socket.conn.id)){
   		//succes
   		console.log("success");
   		io.sockets.connected[socket.conn.id].emit('event', {hello: 'world'}); //only sending to requester
   		
   	}
   	else{
   		//error. only emit to client
   	}
    
  });
});

function addPlayer(playerName, connectionID){
	
	if(io.eio.clients[connectionID]){
		return true;
	}
	else{
		return false;
	}	
}

