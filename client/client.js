var socket = require('socket.io-client')('http://localhost:1234');

console.log("Connecting to server..");

socket.on('connect', function(){
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