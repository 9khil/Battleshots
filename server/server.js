var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var serverPort = 1234,
	players = [];

server.listen(serverPort);

console.log("Listening on port: " + serverPort);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("Client connected");

  socket.emit('event', { hello: 'world' });
  socket.on('identification', function (data) {
    console.log(data);
  });
});

function addPlayer(){
	if(players.length === 0){

	}	
}

