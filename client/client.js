var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io-client')('http://localhost:1234'); //This must be directed to the battleshot server
var io = require('socket.io')(server);
var bs = require('./battleshots');

/************
Setting up server
************/
var serverPort = 1235; //Tablet should access this port
server.listen(serverPort);

app.use( express.static(__dirname+'/') );

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
/************
Server setup END
*************/


/****************
Connection between tablet and client
*****************/
io.on('connection', function (socket) {
  console.log("Tablet connected.");


  socket.on('playerName', function(data){
    //playerName
    console.log("Player name: " + data); 
    initBoard();
  });

socket.on('boatDropped', function(data){
	//boat dropped
console.log("boat dropped: " + data.position);

bs.showBoat(data.position);
});


  /***************
    Messages to Tablet
  ****************/
  function initBoard(){
    //init when both ready
    socket.emit('board', 'init');
  };

});



/****************
Tablet and client connection END
****************/

/*socket.on('connect', function(){
  	console.log("Connected to server!");
  	console.log("Sending identification..");
    
    socket.emit('identification', { name: '9khil' });

    socket.on('event', function(data){
    	console.log(data);
    });
    socket.on('disconnect', function(){
    	console.log("Disconnected from server..");
    });
});
*/
